import { createReadStream } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { galleryImages, serviceImages } from "../../frontend/client/src/assets";

type Document = Record<string, unknown> & {
  _id: string;
  _rev: string;
  _type: string;
};

const client = getCliClient({ apiVersion: "2026-09-01" });
const write = process.argv.includes("--write");
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const argument = (name: string) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const localized = (value: unknown) =>
  typeof value === "string" ? { es: value } : value;
const localizedImage = (value: unknown) => {
  if (!value || typeof value !== "object" || "es" in value || "en" in value)
    return value;
  return { es: value };
};
const localizedAlt = (value: unknown) => {
  if (!value || typeof value !== "object") return value;
  const image = value as Record<string, unknown>;
  return typeof image.alt === "string"
    ? { ...image, alt: localized(image.alt) }
    : value;
};
const same = (left: unknown, right: unknown) =>
  JSON.stringify(left) === JSON.stringify(right);
const fixedHomeEntries = new Set([
  "hero.coordinates",
  "hero.brand",
  "hero.code",
  "hero.side",
]);

const localizedFields: Record<string, string[]> = {
  siteSettings: ["businessName", "location", "copyright"],
  service: [
    "name",
    "title",
    "summary",
    "description",
    "whatsappMessage",
    "experienceEyebrow",
    "experienceTitle",
    "experienceNote",
  ],
  rentalProduct: ["name", "category", "description"],
  audience: ["name", "description"],
  processStep: ["title", "description"],
  faq: ["question", "answer", "category"],
  galleryItem: ["title", "category", "description"],
};

function changesFor(document: Document) {
  const set: Record<string, unknown> = {};
  const assign = (field: string, next: unknown) => {
    if (!same(document[field], next)) set[field] = next;
  };

  if (document._type === "pageContent" && Array.isArray(document.entries)) {
    const entries =
      document.page === "home"
        ? document.entries.filter(
            (entry) =>
              !entry ||
              typeof entry !== "object" ||
              !fixedHomeEntries.has(
                String((entry as Record<string, unknown>).key),
              ),
          )
        : document.entries;
    assign(
      "entries",
      entries.map((entry) => {
        if (!entry || typeof entry !== "object") return entry;
        const item = entry as Record<string, unknown>;
        return {
          ...item,
          ...(item.value === undefined ? {} : { value: localized(item.value) }),
          ...(item.image === undefined
            ? {}
            : { image: localizedImage(item.image) }),
        };
      }),
    );
  }

  for (const field of localizedFields[document._type] || []) {
    if (document[field] !== undefined)
      assign(field, localized(document[field]));
  }

  if (document._type === "siteSettings" && document.footerLogo) {
    assign("footerLogo", localizedAlt(document.footerLogo));
  }

  if (document._type === "service") {
    if (Array.isArray(document.characteristics)) {
      assign("characteristics", document.characteristics.map(localized));
    }
    if (Array.isArray(document.steps)) {
      assign(
        "steps",
        document.steps.map((step) => {
          if (!step || typeof step !== "object") return step;
          const item = step as Record<string, unknown>;
          return {
            ...item,
            title: localized(item.title),
            body: localized(item.body),
          };
        }),
      );
    }
    if (document.image) assign("image", localizedAlt(document.image));
  }

  if (document._type === "galleryItem" && document.image) {
    assign("image", localizedAlt(document.image));
  }

  return set;
}

async function imageAsset(source: string) {
  const filename = basename(source);
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  if (existing) return existing;
  return (
    await client.assets.upload(
      "image",
      createReadStream(
        join(root, "frontend", "client", "public", source.replace(/^\//, "")),
      ),
      { filename },
    )
  )._id;
}

async function main() {
  if (
    !projectId ||
    argument("--confirm-project") !== projectId ||
    argument("--confirm-dataset") !== dataset
  ) {
    throw new Error(
      `Confirma el destino con --confirm-project ${projectId} --confirm-dataset ${dataset}.`,
    );
  }

  const types = [
    "pageContent",
    "siteSettings",
    "service",
    "rentalProduct",
    "audience",
    "processStep",
    "faq",
    "galleryItem",
  ];
  const documents = await client.fetch<Document[]>(
    `*[_type in $types && !(_id in path("drafts.**"))]`,
    { types },
  );
  const patches = documents
    .map((document) => ({ document, set: changesFor(document) }))
    .filter(({ set }) => Object.keys(set).length > 0);

  const gallerySources = [
    ...galleryImages,
    ...serviceImages.xray,
    ...serviceImages.ecg,
  ];
  const existingIds = new Set(documents.map(({ _id }) => _id));
  const missingGallery = gallerySources
    .map((source, index) => ({ source, index, id: `gallery-${index + 1}` }))
    .filter(({ id }) => !existingIds.has(id));

  console.log(
    JSON.stringify(
      {
        mode: write ? "write" : "dry-run",
        documentsInspected: documents.length,
        documentsToPatch: patches.length,
        missingGallery: missingGallery.map(({ id, source }) => ({
          id,
          source,
        })),
      },
      null,
      2,
    ),
  );
  if (!write) return;

  let transaction = client.transaction();
  for (const { document, set } of patches) {
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).set(set),
    );
  }
  for (const { id, index, source } of missingGallery) {
    const title = `Galería Imagen del Puerto ${index + 1}`;
    transaction = transaction.createIfNotExists({
      _id: id,
      _type: "galleryItem",
      title: localized(title),
      category: localized("Electrocardiogramas"),
      description: localized(
        "Imagen del Puerto · Puerto Vallarta y Bahía de Banderas",
      ),
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: await imageAsset(source) },
        alt: localized(title),
      },
      order: index,
      published: true,
    });
  }
  await transaction.commit({ tag: "imagen-del-puerto.localized-content" });
  console.log(
    `Migración selectiva completa: ${patches.length} documentos actualizados y ${missingGallery.length} creados.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
