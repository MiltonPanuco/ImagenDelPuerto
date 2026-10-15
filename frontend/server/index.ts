import express from "express";
import compression from "compression";
import { createServer } from "http";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pageMetadata, SITE_URL } from "../shared/seo";
import { sanityContentUrl } from "../shared/cms";
import { notFoundMetadata, renderPage } from "../shared/render-page";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const legacyRedirects: Record<string, string> = {
  "/service": "/servicios",
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(compression({ threshold: 1024 }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path === "/healthz") return next();
    const forwardedHost = req.get("x-forwarded-host")?.split(",")[0].trim();
    const host = (forwardedHost || req.get("host") || "")
      .toLowerCase()
      .replace(/:\d+$/, "");
    const canonicalHost = new URL(SITE_URL).host;
    const isLocalHost =
      host === "localhost" || host === "127.0.0.1" || host === "::1";
    const legacyPath = legacyRedirects[req.path.toLowerCase()];
    const normalizedPath =
      legacyPath ??
      (req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path);
    const needsCanonicalOrigin =
      process.env.NODE_ENV === "production" &&
      Boolean(host) &&
      !isLocalHost &&
      (host !== canonicalHost || req.protocol !== "https");
    const needsCanonicalPath = normalizedPath !== req.path;

    if (needsCanonicalOrigin || needsCanonicalPath) {
      const query = req.originalUrl.includes("?")
        ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
        : "";
      return res.redirect(
        308,
        `${needsCanonicalOrigin ? SITE_URL : ""}${normalizedPath}${query}`
      );
    }
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexTemplate = readFileSync(
    path.join(staticPath, "index.html"),
    "utf8"
  );
  app.get("/healthz", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).type("text").send("ok");
  });
  app.get("/api/content", async (req, res) => {
    try {
      const response = await fetch(
        sanityContentUrl(undefined, undefined, req.query.lang),
        { headers: { Accept: "application/json" } }
      );
      if (!response.ok) throw new Error(`Sanity respondió ${response.status}`);
      res.setHeader(
        "Cache-Control",
        "public, max-age=60, stale-while-revalidate=300"
      );
      res.type("json").send(await response.text());
    } catch (error) {
      console.error("No se pudo consultar el contenido de Sanity.", error);
      res.status(502).json({ error: "Contenido temporalmente no disponible." });
    }
  });
  app.use(
    express.static(staticPath, {
      index: false,
      etag: true,
      lastModified: true,
      setHeaders(res, filePath) {
        const normalized = filePath.replace(/\\/g, "/");
        if (normalized.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (
          /\.(?:avif|gif|ico|jpe?g|png|webp|woff2?)$/i.test(normalized)
        ) {
          res.setHeader(
            "Cache-Control",
            "public, max-age=2592000, stale-while-revalidate=86400"
          );
        } else {
          res.setHeader(
            "Cache-Control",
            "public, max-age=3600, stale-while-revalidate=86400"
          );
        }
      },
    })
  );

  // Serve route-specific metadata while keeping client-side routing.
  app.get("*", (req, res) => {
    const routePath = req.path.length > 1 ? req.path.replace(/\/+$/, "") : "/";
    const page = pageMetadata[routePath];
    const indexable = Boolean(page);
    const canonical = `${SITE_URL}${indexable ? routePath : "/404"}`;
    res.setHeader("Cache-Control", "no-cache");
    res
      .status(indexable ? 200 : 404)
      .type("html")
      .send(
        renderPage(
          indexTemplate,
          page ?? notFoundMetadata,
          canonical,
          indexable
        )
      );
  });

  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT debe ser un entero entre 1 y 65535.");
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
