export const SANITY_API_VERSION = "2026-09-01";
export const SANITY_CONTENT_QUERY = `{
  "pages": *[_type == "pageContent"]{page, entries[]{key, kind, "value": coalesce(value.es, value), "imageUrl": coalesce(image.es.asset->url, image.asset->url)}},
  "site": *[_id == "site-settings"][0]{phone, phoneHref, whatsapp, email, instagram, facebook, "location": coalesce(location.es, location)},
  "services": *[_type == "service" && published == true] | order(order asc){number, "slug": slug.current, "title": coalesce(title.es, title), "short": coalesce(summary.es, summary), "detail": coalesce(description.es, description), icon, accent, "bullets": characteristics[]{"value": coalesce(es, @)}.value, "message": coalesce(whatsappMessage.es, whatsappMessage), "image": image.asset->url, "gallery": gallery[].asset->url, "experienceEyebrow": coalesce(experienceEyebrow.es, experienceEyebrow), "experienceTitle": coalesce(experienceTitle.es, experienceTitle), "experienceNote": coalesce(experienceNote.es, experienceNote), steps[]{number,"title":coalesce(title.es,title),"body":coalesce(body.es,body)}},
  "rentals": *[_type == "rentalProduct" && available == true] | order(order asc){"name":coalesce(name.es,name),"category":coalesce(category.es,category),"note":coalesce(description.es,description),"image":imageKey,"images":images[].asset->url},
  "audiences": *[_type == "audience"] | order(order asc){number,"name":coalesce(name.es,name),"description":coalesce(description.es,description)},
  "process": *[_type == "processStep"] | order(order asc){number,"title":coalesce(title.es,title),"description":coalesce(description.es,description)},
  "faqs": *[_type == "faq" && published == true] | order(order asc){"question":coalesce(question.es,question),"answer":coalesce(answer.es,answer)},
  "gallery": *[_type == "galleryItem" && published == true] | order(order asc){"title":coalesce(title.es,title),"imageUrl":image.asset->url}
}`;

export function sanityContentUrl(
  projectId = process.env.SANITY_PROJECT_ID || "xkjqp0l8",
  dataset = process.env.SANITY_DATASET || "production"
) {
  const params = new URLSearchParams({ query: SANITY_CONTENT_QUERY });
  return `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?${params}`;
}
