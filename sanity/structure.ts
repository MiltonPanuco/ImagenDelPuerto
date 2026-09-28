import { CogIcon } from "@sanity/icons/Cog";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { ImagesIcon } from "@sanity/icons/Images";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { ProjectsIcon } from "@sanity/icons/Projects";
import type { StructureResolver } from "sanity/structure";
import { PAGE_CONTENT } from "./schemaTypes/pageContent";

export const SINGLETON_TYPES = ["siteSettings", "pageContent"];

const pageItem = (S: Parameters<StructureResolver>[0], page: typeof PAGE_CONTENT[number]) =>
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
      S.listItem()
        .title("Configuración del sitio")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Configuración del sitio")
            .items([
              S.listItem()
                .title("Datos generales y contacto")
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("site-settings")
                    .title("Datos generales y contacto"),
                ),
            ]),
        ),
      S.listItem()
        .title("Páginas del sitio")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Páginas del sitio")
            .items(PAGE_CONTENT.map((page) => pageItem(S, page))),
        ),
      S.listItem()
        .title("Servicios y renta")
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title("Servicios y renta")
            .items([
              S.documentTypeListItem("service").title("Servicios"),
              S.documentTypeListItem("rentalProduct").title("Equipo en renta"),
            ]),
        ),
      S.listItem()
        .title("Contenido informativo")
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .title("Contenido informativo")
            .items([
              S.documentTypeListItem("audience").title("Audiencias"),
              S.documentTypeListItem("processStep").title("Pasos del proceso"),
              S.documentTypeListItem("faq")
                .title("Preguntas frecuentes")
                .icon(HelpCircleIcon),
            ]),
        ),
      S.listItem()
        .title("Multimedia")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Multimedia")
            .items([
              S.documentTypeListItem("galleryItem")
                .title("Galería")
                .icon(ImagesIcon),
            ]),
        ),
    ]);
