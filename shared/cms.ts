export const SANITY_API_VERSION = "2026-09-01";
export const SANITY_CONTENT_QUERY = `{
  "pages": *[_type == "pageContent"]{page, entries[]{key, kind, value, "imageUrl": image.asset->url}},
  "site": *[_id == "site-settings"][0]{phone, phoneHref, whatsapp, email, instagram, facebook, location},
  "services": *[_type == "service" && published == true] | order(order asc){number, "slug": slug.current, title, "short": summary, "detail": description, icon, accent, "bullets": characteristics, "message": whatsappMessage, "image": image.asset->url, "gallery": gallery[].asset->url, experienceEyebrow, experienceTitle, experienceNote, steps[]{number,title,body}},
  "rentals": *[_type == "rentalProduct" && available == true] | order(order asc){name,category,"note":description,"image":imageKey,"images":images[].asset->url},
  "audiences": *[_type == "audience"] | order(order asc){number,name,description},
  "process": *[_type == "processStep"] | order(order asc){number,title,description},
  "faqs": *[_type == "faq" && published == true] | order(order asc){question,answer},
  "gallery": *[_type == "galleryItem" && published == true] | order(order asc){title,"imageUrl":image.asset->url}
}`;

export function sanityContentUrl(
  projectId = process.env.SANITY_PROJECT_ID || "xkjqp0l8",
  dataset = process.env.SANITY_DATASET || "production",
) {
  return `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?query=${encodeURIComponent(SANITY_CONTENT_QUERY)}`;
}
