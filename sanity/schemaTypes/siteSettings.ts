import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Ajustes generales",
  type: "document",
  groups: [
    { name: "contact", title: "Contacto", default: true },
    { name: "social", title: "Redes sociales" },
    { name: "footer", title: "Pie de página" },
  ],
  fields: [
    defineField({ name: "businessName", title: "Nombre comercial", type: "string", group: "contact", validation: (Rule) => Rule.required() }),
    defineField({ name: "phone", title: "Teléfono visible", type: "string", group: "contact", validation: (Rule) => Rule.required() }),
    defineField({ name: "phoneHref", title: "Enlace telefónico", type: "url", group: "contact", validation: (Rule) => Rule.required().uri({ scheme: ["tel"] }) }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "url", group: "contact", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "email", title: "Correo", type: "email", group: "contact", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Ubicación", type: "string", group: "contact", validation: (Rule) => Rule.required() }),
    defineField({ name: "instagram", title: "Instagram", type: "url", group: "social", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "facebook", title: "Facebook", type: "url", group: "social", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }) }),
    defineField({ name: "footerLogo", title: "Logo del pie de página", type: "image", group: "footer", options: { hotspot: true } }),
    defineField({ name: "copyright", title: "Copyright", type: "string", group: "footer", validation: (Rule) => Rule.required() }),
  ],
  preview: { prepare: () => ({ title: "Ajustes generales", subtitle: "Sitio completo" }) },
});
