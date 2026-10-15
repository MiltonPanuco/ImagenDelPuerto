import { defineField, defineType } from "sanity";

const requiredLanguages = (value: unknown) => {
  const localized = value as { es?: string; en?: string } | undefined;
  if (!localized) return true;
  return localized?.es?.trim() && localized?.en?.trim()
    ? true
    : "Completa las versiones en español e inglés.";
};

export const localizedTypes = [
  defineType({
    name: "localizedString",
    title: "Texto bilingüe",
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({ name: "es", title: "Español", type: "string" }),
      defineField({ name: "en", title: "English", type: "string" }),
    ],
    validation: (Rule) => Rule.custom(requiredLanguages),
  }),
  defineType({
    name: "localizedText",
    title: "Texto largo bilingüe",
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({ name: "es", title: "Español", type: "text", rows: 4 }),
      defineField({ name: "en", title: "English", type: "text", rows: 4 }),
    ],
    validation: (Rule) => Rule.custom(requiredLanguages),
  }),
  defineType({
    name: "localizedImage",
    title: "Imagen por idioma",
    type: "object",
    options: { columns: 2 },
    fields: [
      defineField({
        name: "es",
        title: "Imagen en español",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Texto alternativo",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "en",
        title: "Image in English",
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Alternative text",
            type: "string",
          }),
        ],
      }),
    ],
    description: "Puedes reutilizar el mismo asset en ambos idiomas.",
  }),
];
