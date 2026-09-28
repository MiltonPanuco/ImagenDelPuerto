#!/usr/bin/env node
/**
 * Reusable Sanity migration helper.
 *
 * Usage:
 *   SANITY_PROJECT_ID=... SANITY_DATASET=production SANITY_TOKEN=... \
 *   node scripts/migrate-to-sanity.mjs ./migration-source.json
 *
 * The script is intentionally conservative: it only maps fields present in the
 * source export, uses deterministic document IDs, reports incomplete records,
 * and upserts with createOrReplace so repeated runs do not duplicate content.
 */
import fs from "node:fs/promises";
import process from "node:process";

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Falta la ruta del archivo de origen JSON.");
  process.exit(1);
}

const source = JSON.parse(await fs.readFile(sourcePath, "utf8"));
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;
const dryRun = process.env.DRY_RUN !== "false";

const normalize = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const corrections = [
  [/\bQuirofanos\b/gi, "Quirófanos"],
  [/\bdetu\b/gi, "de tu"],
  [/\bdiagnostico\b/gi, "diagnóstico"],
  [/\brecive\b/gi, "recibe"],
];
const correctText = value =>
  corrections.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    value || ""
  );
const slug = value => ({
  _type: "slug",
  current: normalize(correctText(value)),
});
const stableId = (type, item, index) =>
  `import-${type}-${normalize(item.slug?.current || item.slug || item.name || item.title || `${index}`)}`;

const collections = [
  [
    "service",
    source.services || [],
    (item, index) => ({
      _id: stableId("service", item, index),
      _type: "service",
      name: correctText(item.name || item.title),
      slug: slug(item.slug || item.name || item.title),
      summary: correctText(item.summary || item.description),
      description: correctText(item.description),
      characteristics: (item.characteristics || item.bullets || []).map(
        correctText
      ),
      published: Boolean(item.published),
    }),
  ],
  [
    "rentalProduct",
    source.rentalProducts || source.rentals || [],
    (item, index) => ({
      _id: stableId("rentalProduct", item, index),
      _type: "rentalProduct",
      name: correctText(item.name || item.title),
      slug: slug(item.slug || item.name || item.title),
      category: correctText(item.category),
      description: correctText(item.description || item.note),
      available: item.available === undefined ? false : Boolean(item.available),
      featured: Boolean(item.featured),
      order: Number(item.order || index),
    }),
  ],
  [
    "audience",
    source.audiences || [],
    (item, index) => ({
      _id: stableId("audience", item, index),
      _type: "audience",
      name: correctText(item.name || item.title),
      description: correctText(item.description),
      order: Number(item.order || index),
    }),
  ],
  [
    "faq",
    source.faqs || [],
    (item, index) => ({
      _id: stableId("faq", item, index),
      _type: "faq",
      question: correctText(item.question),
      answer: correctText(item.answer),
      category: correctText(item.category),
      order: Number(item.order || index),
    }),
  ],
  [
    "galleryItem",
    source.gallery || source.galleryItems || [],
    (item, index) => ({
      _id: stableId("galleryItem", item, index),
      _type: "galleryItem",
      title: correctText(item.title || item.name),
      category: correctText(item.category),
      description: correctText(item.description),
      alt: correctText(item.alt || item.title || item.name),
      order: Number(item.order || index),
    }),
  ],
  [
    "testimonial",
    source.testimonials || [],
    (item, index) => ({
      _id: stableId("testimonial", item, index),
      _type: "testimonial",
      name: correctText(item.name),
      text: correctText(item.text),
      rating: Number(item.rating || 0),
      verified: Boolean(item.verified),
      published: Boolean(item.published),
    }),
  ],
  [
    "teamMember",
    source.team || source.teamMembers || [],
    (item, index) => ({
      _id: stableId("teamMember", item, index),
      _type: "teamMember",
      name: correctText(item.name),
      role: correctText(item.role || item.title),
      bio: correctText(item.bio),
      verifiedCredentials: Boolean(item.verifiedCredentials),
    }),
  ],
];

const docs = collections.flatMap(([, items, map]) => items.map(map));
const requiredByType = {
  service: ["name", "slug"],
  rentalProduct: ["name", "slug"],
  faq: ["question", "answer"],
  galleryItem: ["title", "alt"],
};
const incomplete = docs.flatMap(doc =>
  (requiredByType[doc._type] || [])
    .filter(field => !doc[field]?.current && !doc[field])
    .map(field => ({ id: doc._id, type: doc._type, field }))
);

console.log(
  JSON.stringify(
    { mode: dryRun ? "dry-run" : "write", documents: docs.length, incomplete },
    null,
    2
  )
);
if (dryRun) {
  console.log(
    "No se escribieron documentos. Usa DRY_RUN=false para ejecutar la importación."
  );
  process.exit(0);
}
if (!projectId || !token)
  throw new Error(
    "SANITY_PROJECT_ID y SANITY_TOKEN son obligatorios cuando DRY_RUN=false."
  );

const endpoint = `https://${projectId}.api.sanity.io/v2023-10-01/data/mutate/${dataset}`;
for (let i = 0; i < docs.length; i += 100) {
  const batch = docs.slice(i, i + 100);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: batch.map(doc => ({ createOrReplace: doc })),
    }),
  });
  if (!response.ok)
    throw new Error(
      `Sanity respondió ${response.status}: ${await response.text()}`
    );
  console.log(
    `Importados ${Math.min(i + batch.length, docs.length)} / ${docs.length}`
  );
}
