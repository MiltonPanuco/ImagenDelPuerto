import { defineArrayMember, defineField, defineType } from "sanity";

export const PAGE_CONTENT = [
  ["global", "Contenido global"],
  ["home", "Inicio"],
  ["about", "Nosotros"],
  ["services", "Servicios"],
  ["serviceDetail", "Detalle de servicios"],
  ["rental", "Renta"],
  ["gallery", "Galería"],
  ["contact", "Contacto"],
  ["legal", "Legal"],
  ["notFound", "Página 404"],
  ["seo", "SEO y metadatos"],
] as const;

export const pageContentType = defineType({
  name: "pageContent",
  title: "Contenido de página",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Página",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
      options: {
        list: PAGE_CONTENT.map(([value, title]) => ({ title, value })),
      },
    }),
    defineField({
      name: "entries",
      title: "Campos editables",
      type: "array",
      options: { sortable: false },
      of: [
        defineArrayMember({
          name: "contentEntry",
          title: "Campo editable",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Clave",
              type: "string",
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Nombre del campo",
              type: "string",
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "kind",
              title: "Tipo",
              type: "string",
              readOnly: true,
              initialValue: "text",
              options: {
                list: [
                  { title: "Texto", value: "text" },
                  { title: "Texto largo", value: "longText" },
                  { title: "Enlace", value: "url" },
                  { title: "Imagen", value: "image" },
                  { title: "Markdown", value: "markdown" },
                ],
              },
            }),
            defineField({
              name: "value",
              title: "Contenido",
              type: "localizedText",
              hidden: ({ parent }) => parent?.kind === "image",
            }),
            defineField({
              name: "image",
              title: "Imagen",
              type: "localizedImage",
              hidden: ({ parent }) => parent?.kind !== "image",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value.es", media: "image.es" },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle: subtitle?.slice(0, 90),
              media,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { page: "page" },
    prepare: ({ page }) => ({
      title:
        PAGE_CONTENT.find(([value]) => value === page)?.[1] ||
        "Contenido de página",
      subtitle: "Página única · ES / EN",
    }),
  },
});
