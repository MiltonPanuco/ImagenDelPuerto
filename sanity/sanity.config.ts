import { buildTheme } from "@sanity/themer";
import { esESLocale } from "@sanity/locale-es-es";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { BrandIcon } from "./components/BrandIcon";
import { schemaTypes } from "./schemaTypes";
import { SINGLETON_TYPES, structure } from "./structure";

export default defineConfig({
  name: "imagen-del-puerto",
  title: "Imagen del Puerto · Contenido",
  icon: BrandIcon,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "configure-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  theme: buildTheme({
    accent: "#acb4d3",
    text: "#28262d",
    background: { light: "#ffffff", dark: "#17151b" },
    contrast: 90,
  }),
  plugins: [structureTool({ structure }), esESLocale({ title: "Español" })],
  schema: { types: schemaTypes },
  document: {
    actions: (previous, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? previous.filter(({ action }) => action !== "delete" && action !== "duplicate")
        : previous,
    newDocumentOptions: (previous) =>
      previous.filter(({ templateId }) => !SINGLETON_TYPES.includes(templateId)),
  },
});
