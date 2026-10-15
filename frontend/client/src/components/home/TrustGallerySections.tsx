import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Crosshair, MoveRight, Stethoscope } from "lucide-react";
import { useCms } from "@/cms/CmsProvider";
import { galleryImages, serviceImages } from "@/assets";
import {
  CONTAINER, FIELD_BORDER, ImageLightbox, SECTION_PAD,
  SectionHeader, TEXT_LINK, coverStyle, heroImage,
} from "@/components/site/Shared";

function AudiencesSection() {
  const { audiences, text } = useCms();
  const [title, accent] = text("home", "audiences.title", "Cuidado que entiende\ndistintos caminos.").split("\n");
  return (
    <section className={`${SECTION_PAD} bg-mist`}>
      <div className={CONTAINER}>
        <div className="mb-16 max-[680px]:mb-[43px]">
          <SectionHeader
            eyebrow={text("home", "audiences.eyebrow", "Para quiénes trabajamos")}
            title={
              <>
                {title}
                <br />
                <i>{accent}</i>
              </>
            }
          />
        </div>
        <div className={`border-t ${FIELD_BORDER}`}>
          {audiences.map(([number, title, description]) => (
            <div
              className={`grid min-h-[126px] grid-cols-[100px_1fr_2fr_28px] items-center gap-[25px] border-b transition-[padding] duration-200 hover:px-3.5 ${FIELD_BORDER} max-[900px]:grid-cols-[62px_1fr_1.3fr_24px] max-[900px]:gap-4 max-[680px]:grid-cols-[38px_1fr_24px] max-[680px]:gap-2.5 max-[680px]:py-5`}
              key={number}
            >
              <span className="font-display text-[11px] text-rx-blue">
                {number}
              </span>
              <h3 className="m-0 font-display text-2xl font-medium tracking-[-.05em] max-[680px]:text-[21px]">
                {title}
              </h3>
              <p className="m-0 max-w-[360px] text-xs leading-[1.55] text-steel max-[680px]:col-[2/3] max-[680px]:text-[11px]">
                {description}
              </p>
              <ArrowUpRight className="text-rx-blue" size={19} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { text, image } = useCms();
  const [title, accent] = text("home", "gallery.title", "Precisión en cada\ndetalle.").split("\n");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <section className={SECTION_PAD}>
      <div className={CONTAINER}>
        <div className="flex items-end justify-between max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-5">
          <SectionHeader
            eyebrow={text("home", "gallery.eyebrow", "Una mirada al servicio")}
            title={
              <>
                {title}
                <br />
                <i>{accent}</i>
              </>
            }
          />
          <Link href="/galeria" className={TEXT_LINK}>
            {text("home", "gallery.button", "Ver galería")} <MoveRight size={17} />
          </Link>
        </div>
        <div className="mt-[68px] grid min-h-[420px] grid-cols-[2.1fr_1fr_1fr] gap-[13px] max-[900px]:min-h-[350px] max-[680px]:grid-cols-2 max-[680px]:min-h-[370px]">
          <button
            className="relative flex cursor-pointer items-end overflow-hidden border-0 bg-charcoal bg-cover bg-center p-[18px] text-left text-white transition-transform duration-500 hover:scale-[1.015] after:absolute after:inset-0 after:bg-[linear-gradient(0deg,rgba(23,21,27,.68),transparent_60%)] max-[680px]:col-span-2 max-[680px]:min-h-[280px]"
            style={coverStyle(image("home", "gallery.primaryImage", heroImage))}
            type="button"
            onClick={() => setSelectedImage(image("home", "gallery.primaryImage", heroImage))}
            aria-label={text("home", "gallery.primaryAria", "Ampliar imagen de atención a domicilio")}
          >
            <span className="relative z-[1] text-[10px] uppercase tracking-[.09em]">
              {text("home", "gallery.primaryLabel", "Atención a domicilio")}
            </span>
          </button>
          <button
            className="flex cursor-pointer flex-col items-center justify-center gap-[18px] overflow-hidden border-0 bg-cover bg-center p-[18px] text-left text-white transition-transform duration-500 hover:scale-[1.02] max-[680px]:min-h-[150px]"
            style={coverStyle(
              image("home", "gallery.secondaryImage", galleryImages[0]),
              "linear-gradient(rgba(23,21,27,.25),rgba(23,21,27,.75))"
            )}
            type="button"
            onClick={() => setSelectedImage(image("home", "gallery.secondaryImage", galleryImages[0]))}
            aria-label={text("home", "gallery.secondaryAria", "Ampliar imagen del equipo de diagnóstico")}
          >
            <Crosshair size={27} />
            <span className="self-stretch text-[10px] uppercase tracking-[.09em]">
              {text("home", "gallery.secondaryLabel", "Equipo de diagnóstico")}
            </span>
          </button>
          <button
            className="flex cursor-pointer flex-col items-center justify-center gap-[18px] overflow-hidden border-0 bg-cover bg-center p-[18px] text-left text-white transition-transform duration-500 hover:scale-[1.02] max-[680px]:min-h-[150px]"
            style={coverStyle(
              image("home", "gallery.tertiaryImage", serviceImages.ecg[2]),
              "linear-gradient(rgba(23,21,27,.2),rgba(23,21,27,.72))"
            )}
            type="button"
            onClick={() => setSelectedImage(image("home", "gallery.tertiaryImage", serviceImages.ecg[2]))}
            aria-label={text("home", "gallery.tertiaryAria", "Ampliar imagen de atención profesional")}
          >
            <Stethoscope size={27} />
            <span className="self-stretch text-[10px] uppercase tracking-[.09em]">
              {text("home", "gallery.tertiaryLabel", "Atención profesional")}
            </span>
          </button>
        </div>
      </div>
      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          alt={text("home", "gallery.lightboxAlt", "Imagen ampliada de Imagen del Puerto")}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
export default function TrustGallerySections() {
  return <><AudiencesSection /><GallerySection /></>;
}
