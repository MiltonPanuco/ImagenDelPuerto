import express from "express";
import compression from "compression";
import { createServer } from "http";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { site } from "../client/src/data";
import { DEFAULT_SOCIAL_IMAGE, pageMetadata, SITE_URL, type PageMetadata } from "../shared/seo";
import { sanityContentUrl } from "../shared/cms";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notFoundMetadata: PageMetadata = {
  title: "Imagen del Puerto | Página no encontrada",
  description: "La página solicitada no existe o cambió de ubicación.",
};

const legacyRedirects: Record<string, string> = {
  "/service": "/servicios",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

function replaceMeta(html: string, attribute: "name" | "property", key: string, content: string) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("<head>", `<head>\n    ${tag}`);
}

function renderPage(template: string, page: PageMetadata, canonical: string, indexable: boolean) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceMeta(html, "name", "description", page.description);
  html = replaceMeta(html, "name", "robots", indexable ? "index,follow,max-image-preview:large" : "noindex,nofollow");
  html = replaceMeta(html, "property", "og:title", page.title);
  html = replaceMeta(html, "property", "og:description", page.description);
  html = replaceMeta(html, "property", "og:url", canonical);
  html = replaceMeta(html, "property", "og:image", DEFAULT_SOCIAL_IMAGE);
  html = replaceMeta(html, "name", "twitter:title", page.title);
  html = replaceMeta(html, "name", "twitter:description", page.description);
  html = replaceMeta(html, "name", "twitter:image", DEFAULT_SOCIAL_IMAGE);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(
    /<link\s+id="page-hero-preload"[^>]*>/i,
    page.hero
      ? `<link id="page-hero-preload" rel="preload" as="image" href="${page.hero}" type="image/webp" fetchpriority="high" />`
      : ""
  );

  const organizationId = `${SITE_URL}/#organization`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Imagen del Puerto",
      url: SITE_URL,
      logo: `${SITE_URL}/storage/icons/apple-touch-icon.png`,
      image: DEFAULT_SOCIAL_IMAGE,
      telephone: site.phone,
      email: site.email,
      areaServed: ["Puerto Vallarta", "Bahía de Banderas"],
      sameAs: [site.facebook, site.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Imagen del Puerto",
      publisher: { "@id": organizationId },
      inLanguage: "es-MX",
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": organizationId },
      inLanguage: "es-MX",
    },
  ];
  if (page.service) {
    graph.push({
      "@type": "Service",
      name: page.service,
      url: canonical,
      description: page.description,
      provider: { "@id": organizationId },
      areaServed: ["Puerto Vallarta", "Bahía de Banderas"],
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return html.replace("</head>", `    <script id="site-structured-data" type="application/ld+json">${json}</script>\n  </head>`);
}

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
    const host = (forwardedHost || req.get("host") || "").toLowerCase().replace(/:\d+$/, "");
    const canonicalHost = new URL(SITE_URL).host;
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "::1";
    const legacyPath = legacyRedirects[req.path.toLowerCase()];
    const normalizedPath = legacyPath ?? (req.path.length > 1 ? req.path.replace(/\/+$/, "") : req.path);
    const needsCanonicalOrigin = process.env.NODE_ENV === "production" &&
      Boolean(host) &&
      !isLocalHost &&
      (host !== canonicalHost || req.protocol !== "https");
    const needsCanonicalPath = normalizedPath !== req.path;

    if (needsCanonicalOrigin || needsCanonicalPath) {
      const query = req.originalUrl.includes("?") ? req.originalUrl.slice(req.originalUrl.indexOf("?")) : "";
      return res.redirect(308, `${needsCanonicalOrigin ? SITE_URL : ""}${normalizedPath}${query}`);
    }
    next();
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexTemplate = readFileSync(path.join(staticPath, "index.html"), "utf8");
  app.get("/healthz", (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).type("text").send("ok");
  });
  app.get("/api/content", async (_req, res) => {
    try {
      const response = await fetch(sanityContentUrl(), { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Sanity respondió ${response.status}`);
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      res.type("json").send(await response.text());
    } catch (error) {
      console.error("No se pudo consultar el contenido de Sanity.", error);
      res.status(502).json({ error: "Contenido temporalmente no disponible." });
    }
  });
  app.use(express.static(staticPath, {
    index: false,
    etag: true,
    lastModified: true,
    setHeaders(res, filePath) {
      const normalized = filePath.replace(/\\/g, "/");
      if (normalized.includes("/assets/")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (/\.(?:avif|gif|ico|jpe?g|png|webp|woff2?)$/i.test(normalized)) {
        res.setHeader("Cache-Control", "public, max-age=2592000, stale-while-revalidate=86400");
      } else {
        res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
      }
    },
  }));

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
      .send(renderPage(indexTemplate, page ?? notFoundMetadata, canonical, indexable));
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
