import { sanityContentUrl } from "../shared/cms";
import { notFoundMetadata, renderPage } from "../shared/render-page";
import { pageMetadata, SITE_URL } from "../shared/seo";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SANITY_PROJECT_ID?: string;
  SANITY_DATASET?: string;
}

const legacyRedirects: Record<string, string> = { "/service": "/servicios" };

function withSecurityHeaders(response: Response) {
  const secured = new Response(response.body, response);
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("X-Frame-Options", "SAMEORIGIN");
  return secured;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
    const redirectedPath = legacyRedirects[path.toLowerCase()] ?? path;

    if (redirectedPath !== url.pathname) {
      url.pathname = redirectedPath;
      return Response.redirect(url, 308);
    }

    if (path === "/healthz") {
      return withSecurityHeaders(new Response("ok", {
        headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
      }));
    }

    if (path === "/api/content") {
      try {
        const response = await fetch(sanityContentUrl(env.SANITY_PROJECT_ID, env.SANITY_DATASET), {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Sanity respondió ${response.status}`);
        return withSecurityHeaders(new Response(response.body, {
          headers: {
            "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
            "Content-Type": "application/json; charset=utf-8",
          },
        }));
      } catch (error) {
        console.error("No se pudo consultar el contenido de Sanity.", error);
        return withSecurityHeaders(Response.json(
          { error: "Contenido temporalmente no disponible." },
          { status: 502 },
        ));
      }
    }

    const page = pageMetadata[path];
    const wantsHtml = request.headers.get("Accept")?.includes("text/html") ||
      request.headers.get("Sec-Fetch-Mode") === "navigate";
    if (request.method === "GET" && (page || wantsHtml)) {
      const templateResponse = await env.ASSETS.fetch(new Request(new URL("/", request.url)));
      const canonical = `${SITE_URL}${page ? path : "/404"}`;
      return withSecurityHeaders(new Response(
        renderPage(await templateResponse.text(), page ?? notFoundMetadata, canonical, Boolean(page)),
        {
          status: page ? 200 : 404,
          headers: { "Cache-Control": "no-cache", "Content-Type": "text/html; charset=utf-8" },
        },
      ));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};
