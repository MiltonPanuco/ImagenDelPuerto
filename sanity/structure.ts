import { CogIcon } from "@sanity/icons/Cog";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { LockIcon } from "@sanity/icons/Lock";
import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { PinIcon } from "@sanity/icons/Pin";
import { ProjectsIcon } from "@sanity/icons/Projects";
import type {
  ListItemBuilder,
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";
import { PAGE_CONTENT } from "./schemaTypes/pageContent";

type PageName = (typeof PAGE_CONTENT)[number][0];

const PAGE_ICONS: Record<PageName, typeof HomeIcon> = {
  global: CogIcon,
  home: HomeIcon,
  about: InfoOutlineIcon,
  services: ProjectsIcon,
  serviceDetail: MasterDetailIcon,
  rental: ProjectsIcon,
  gallery: ImagesIcon,
  contact: PinIcon,
  legal: LockIcon,
  notFound: InfoOutlineIcon,
  seo: EarthGlobeIcon,
};

export const SINGLETON_TYPES = ["siteSettings", "pageContent"];

function pageItem(
  S: StructureBuilder,
  name: PageName,
  title?: string,
): ListItemBuilder {
  const page = PAGE_CONTENT.find(([value]) => value === name)!;
  return S.listItem()
    .title(title || page[1])
    .icon(PAGE_ICONS[name])
    .child(
      S.document()
        .schemaType("pageContent")
        .documentId(`page-${name}`)
        .title(title || page[1]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Imagen del Puerto · Contenido")
    .items([
      pageItem(S, "home"),
      S.listItem()
        .title("Páginas")
        .icon(MasterDetailIcon)
        .child(
          S.list()
            .title("Páginas")
            .items([
              pageItem(S, "about"),
              pageItem(S, "services", "Página de servicios"),
              pageItem(S, "serviceDetail", "Detalle de servicios"),
              pageItem(S, "rental", "Página de renta"),
              pageItem(S, "gallery"),
              pageItem(S, "contact"),
            ]),
        ),
      S.documentTypeListItem("service")
        .title("Servicios médicos")
        .icon(ProjectsIcon),
      S.documentTypeListItem("rentalProduct")
        .title("Equipo en renta")
        .icon(ProjectsIcon),
      S.listItem()
        .title("Contenido complementario")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Contenido complementario")
            .items([
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
            .items([pageItem(S, "legal")]),
        ),
      S.listItem()
        .title("Configuración")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Configuración")
            .items([
              S.listItem()
                .title("Datos generales y contacto")
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("site-settings")
                    .title("Ajustes generales"),
                ),
              pageItem(S, "global", "Navegación y contenido global"),
              pageItem(S, "seo", "SEO y metadatos"),
              pageItem(S, "notFound", "Página no encontrada"),
            ]),
        ),
    ]);
