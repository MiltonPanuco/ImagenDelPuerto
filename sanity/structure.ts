import { CogIcon } from "@sanity/icons/Cog";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { ProjectsIcon } from "@sanity/icons/Projects";
import type { StructureResolver } from "sanity/structure";
import { PAGE_CONTENT } from "./schemaTypes/pageContent";

export const SINGLETON_TYPES = ["siteSettings", "pageContent"];

const page = (name: (typeof PAGE_CONTENT)[number][0]) =>
  PAGE_CONTENT.find(([value]) => value === name)!;

const pageItem = (
  S: Parameters<StructureResolver>[0],
  page: (typeof PAGE_CONTENT)[number],
) =>
  S.listItem()
    .title(page[1])
    .child(
      S.document()
        .schemaType("pageContent")
        .documentId(`page-${page[0]}`)
        .title(page[1]),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Imagen del Puerto · Contenido")
    .items([
      pageItem(S, page("home")).icon(HomeIcon),
      S.listItem()
        .title("Páginas")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Páginas")
            .items([
              ...[
                "about",
                "services",
                "serviceDetail",
                "rental",
                "gallery",
                "contact",
                "notFound",
              ].map((name) =>
                pageItem(S, page(name as (typeof PAGE_CONTENT)[number][0])),
              ),
            ]),
        ),
      S.listItem()
        .title("Contenido")
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title("Contenido")
            .items([
              S.documentTypeListItem("service").title("Servicios"),
              S.documentTypeListItem("rentalProduct").title("Equipo en renta"),
              S.documentTypeListItem("audience").title("Audiencias"),
              S.documentTypeListItem("processStep").title("Pasos del proceso"),
              S.documentTypeListItem("faq")
                .title("Preguntas frecuentes")
                .icon(HelpCircleIcon),
              S.documentTypeListItem("galleryItem")
                .title("Galería")
                .icon(ImagesIcon),
            ]),
        ),
      S.listItem()
        .title("Legal")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Legal")
            .items([pageItem(S, page("legal"))]),
        ),
      pageItem(S, page("seo")).icon(EarthGlobeIcon),
      S.listItem()
        .title("Configuración")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Configuración")
            .items([
              pageItem(S, page("global")),
              S.listItem()
                .title("Datos generales y contacto")
                .icon(InfoOutlineIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("site-settings")
                    .title("Datos generales y contacto"),
                ),
            ]),
        ),
    ]);
