import { defineField, defineType } from "sanity";

const requiredSpanish = (value: unknown) => {
  const localized = value as { es?: string; en?: string } | undefined;
  if (!localized) return true;
  return localized.es?.trim() ? true : "Completa el contenido en español.";
};

export const localizedTypes = [
  defineType({
    name: "localizedString",
    title: "Texto",
    type: "object",
    fields: [
      defineField({ name: "es", title: "Contenido", type: "string" }),
      defineField({
        name: "en",
        title: "Contenido anterior",
        type: "string",
        hidden: true,
      }),
    ],
    validation: (Rule) => Rule.custom(requiredSpanish),
  }),
  defineType({
    name: "localizedText",
    title: "Texto largo",
    type: "object",
    fields: [
      defineField({ name: "es", title: "Contenido", type: "text", rows: 4 }),
      defineField({
        name: "en",
        title: "Contenido anterior",
        type: "text",
        rows: 4,
        hidden: true,
      }),
    ],
    validation: (Rule) => Rule.custom(requiredSpanish),
  }),
  defineType({
    name: "localizedImage",
    title: "Imagen",
    type: "object",
    fields: [
      defineField({
        name: "es",
        title: "Imagen",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Texto alternativo",
            type: "string",
            description:
              "Describe la imagen para personas que usan lectores de pantalla.",
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
      defineField({
        name: "en",
        title: "Imagen anterior",
        type: "image",
        hidden: true,
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Texto alternativo",
            type: "string",
            description: "Describe la imagen para lectores de pantalla.",
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
    ],
    description: "Imagen y texto alternativo utilizados en la web.",
  }),
];
