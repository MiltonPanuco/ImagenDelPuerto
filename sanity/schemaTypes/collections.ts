import { defineField, defineType } from "sanity";

const orderField = defineField({
  name: "order",
  title: "Orden",
  type: "number",
  initialValue: 0,
  validation: (Rule) => Rule.required().integer().min(0),
});

const publishedField = defineField({
  name: "published",
  title: "Mostrar públicamente",
  type: "boolean",
  initialValue: false,
});

const ordered = [{
  title: "Orden editorial",
  name: "editorial",
  by: [{ field: "order", direction: "asc" as const }],
}];

export const collectionTypes = [
  defineType({
    name: "service",
    title: "Servicio",
    type: "document",
    groups: [
      { name: "content", title: "Contenido", default: true },
      { name: "media", title: "Imagen" },
      { name: "publication", title: "Publicación" },
    ],
    fields: [
      defineField({ name: "name", title: "Nombre", type: "string", group: "content", validation: (Rule) => Rule.required() }),
      defineField({ name: "number", title: "Número", type: "string", group: "content", validation: (Rule) => Rule.required() }),
      defineField({ name: "title", title: "Título mostrado", type: "text", rows: 2, group: "content", description: "Conserva los saltos de línea del título.", validation: (Rule) => Rule.required() }),
      defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
      defineField({ name: "summary", title: "Resumen", type: "text", rows: 3, group: "content" }),
      defineField({ name: "description", title: "Descripción", type: "text", rows: 5, group: "content" }),
      defineField({ name: "characteristics", title: "Características", type: "array", group: "content", of: [{ type: "string" }] }),
      defineField({ name: "whatsappMessage", title: "Mensaje de WhatsApp", type: "text", rows: 3, group: "content" }),
      defineField({ name: "icon", title: "Icono", type: "string", group: "media", options: { list: [
        { title: "Rayos X", value: "scan" },
        { title: "Cardiología", value: "activity" },
        { title: "Respiratorio", value: "respiratory" },
      ] }, validation: (Rule) => Rule.required() }),
      defineField({ name: "image", title: "Imagen", type: "image", group: "media", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (Rule) => Rule.required() })] }),
      defineField({ name: "gallery", title: "Galería del servicio", type: "array", group: "media", of: [{ type: "image", options: { hotspot: true } }] }),
      defineField({ name: "accent", title: "Color de acento", type: "string", group: "media", description: "Color hexadecimal, por ejemplo #ACB4D3.", validation: (Rule) => Rule.regex(/^#[0-9a-f]{6}$/i, { name: "hexadecimal" }) }),
      defineField({ name: "experienceEyebrow", title: "Etiqueta de experiencia", type: "string", group: "content" }),
      defineField({ name: "experienceTitle", title: "Título de experiencia", type: "string", group: "content" }),
      defineField({ name: "experienceNote", title: "Nota de experiencia", type: "text", rows: 3, group: "content" }),
      defineField({ name: "steps", title: "Pasos del servicio", type: "array", group: "content", of: [{ type: "object", fields: [
        defineField({ name: "number", title: "Número", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "body", title: "Descripción", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
      ], preview: { select: { title: "title", subtitle: "number" } } }] }),
      { ...orderField, group: "publication" },
      { ...publishedField, group: "publication" },
    ],
    orderings: ordered,
    preview: { select: { title: "name", media: "image", published: "published" }, prepare: ({ title, media, published }) => ({ title: title || "Servicio sin nombre", subtitle: published ? "Visible" : "Oculto", media }) },
  }),
  defineType({
    name: "rentalProduct",
    title: "Equipo en renta",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Nombre", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
      defineField({ name: "category", title: "Categoría", type: "string" }),
      defineField({ name: "description", title: "Descripción", type: "text", rows: 4 }),
      defineField({ name: "images", title: "Imágenes", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      defineField({ name: "imageKey", title: "Clave de imágenes", type: "string", readOnly: true }),
      defineField({ name: "available", title: "Disponible", type: "boolean", initialValue: true }),
      defineField({ name: "featured", title: "Destacado", type: "boolean", initialValue: false }),
      orderField,
    ],
    orderings: ordered,
  }),
  defineType({
    name: "audience",
    title: "Audiencia",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Nombre", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "number", title: "Número", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "description", title: "Descripción", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
      orderField,
    ],
    orderings: ordered,
  }),
  defineType({
    name: "processStep",
    title: "Paso del proceso",
    type: "document",
    fields: [
      defineField({ name: "number", title: "Número", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "description", title: "Descripción", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
      orderField,
    ],
    orderings: ordered,
    preview: { select: { title: "title", subtitle: "number" } },
  }),
  defineType({
    name: "faq",
    title: "Pregunta frecuente",
    type: "document",
    fields: [
      defineField({ name: "question", title: "Pregunta", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "answer", title: "Respuesta", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
      defineField({ name: "category", title: "Categoría", type: "string" }),
      orderField,
      publishedField,
    ],
    orderings: ordered,
    preview: { select: { title: "question", subtitle: "category" } },
  }),
  defineType({
    name: "galleryItem",
    title: "Elemento de galería",
    type: "document",
    fields: [
      defineField({ name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "category", title: "Categoría", type: "string" }),
      defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
      defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required(), fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string", validation: (Rule) => Rule.required() })] }),
      orderField,
      publishedField,
    ],
    orderings: ordered,
    preview: { select: { title: "title", subtitle: "category", media: "image" } },
  }),
];
