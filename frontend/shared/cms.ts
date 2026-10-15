export const SANITY_API_VERSION = "2026-09-01";
export const SANITY_CONTENT_QUERY = `{
  "pages": *[_type == "pageContent"]{page, entries[]{key, kind, "value": coalesce(value[$language], value.es, value), "imageUrl": coalesce(image[$language].asset->url, image.es.asset->url, image.asset->url)}},
  "site": *[_id == "site-settings"][0]{phone, phoneHref, whatsapp, email, instagram, facebook, "location": coalesce(location[$language], location.es, location)},
  "services": *[_type == "service" && published == true] | order(order asc){number, "slug": slug.current, "title": coalesce(title[$language], title.es, title), "short": coalesce(summary[$language], summary.es, summary), "detail": coalesce(description[$language], description.es, description), icon, accent, "bullets": characteristics[]{"value": coalesce(@[$language], es, @)}.value, "message": coalesce(whatsappMessage[$language], whatsappMessage.es, whatsappMessage), "image": image.asset->url, "gallery": gallery[].asset->url, "experienceEyebrow": coalesce(experienceEyebrow[$language], experienceEyebrow.es, experienceEyebrow), "experienceTitle": coalesce(experienceTitle[$language], experienceTitle.es, experienceTitle), "experienceNote": coalesce(experienceNote[$language], experienceNote.es, experienceNote), steps[]{number,"title":coalesce(title[$language],title.es,title),"body":coalesce(body[$language],body.es,body)}},
  "rentals": *[_type == "rentalProduct" && available == true] | order(order asc){"name":coalesce(name[$language],name.es,name),"category":coalesce(category[$language],category.es,category),"note":coalesce(description[$language],description.es,description),"image":imageKey,"images":images[].asset->url},
  "audiences": *[_type == "audience"] | order(order asc){number,"name":coalesce(name[$language],name.es,name),"description":coalesce(description[$language],description.es,description)},
  "process": *[_type == "processStep"] | order(order asc){number,"title":coalesce(title[$language],title.es,title),"description":coalesce(description[$language],description.es,description)},
  "faqs": *[_type == "faq" && published == true] | order(order asc){"question":coalesce(question[$language],question.es,question),"answer":coalesce(answer[$language],answer.es,answer)},
  "gallery": *[_type == "galleryItem" && published == true] | order(order asc){"title":coalesce(title[$language],title.es,title),"imageUrl":image.asset->url}
}`;

export type ContentLanguage = "es" | "en";

export const normalizeContentLanguage = (language: unknown): ContentLanguage =>
  language === "en" ? "en" : "es";

export function sanityContentUrl(
  projectId = process.env.SANITY_PROJECT_ID || "xkjqp0l8",
  dataset = process.env.SANITY_DATASET || "production",
  language: unknown = "es"
) {
  const params = new URLSearchParams({
    query: SANITY_CONTENT_QUERY,
    $language: JSON.stringify(normalizeContentLanguage(language)),
  });
  return `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?${params}`;
}
