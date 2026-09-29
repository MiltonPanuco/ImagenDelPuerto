import { site } from "../client/src/data";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL, type PageMetadata } from "./seo";

export const notFoundMetadata: PageMetadata = {
  title: "Imagen del Puerto | Página no encontrada",
  description: "La página solicitada no existe o cambió de ubicación.",
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

export function renderPage(template: string, page: PageMetadata, canonical: string, indexable: boolean) {
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
