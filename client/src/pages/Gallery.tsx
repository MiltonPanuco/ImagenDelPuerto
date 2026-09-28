import React, { useState } from "react";
import { galleryImages } from "@/assets";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCms } from "@/cms/CmsProvider";
import {
  CONTAINER, SECTION_DARK, SECTION_PAD, FinalCTA, ImageLightbox,
  ProgressiveImage, SectionHeader, coverStyle,
} from "@/components/site/Shared";
export default function GalleryPage() {
  const { gallery, text, image } = useCms();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const photos = gallery.map(({ src }) => src);
  const [heroTitle, heroAccent] = text("gallery", "hero.title", "Historias reales.\nTrabajo preciso.").split("\n");
  const [contentTitle, contentAccent] = text("gallery", "content.title", "Cada imagen guarda\nuna historia.").split("\n");
  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center py-[185px_105px]`}
          style={coverStyle(
            image("gallery", "hero.image", galleryImages[6]),
            "linear-gradient(90deg,rgba(23,21,27,.97),rgba(23,21,27,.65) 55%,rgba(23,21,27,.28))"
          )}
        >
          <div className={`${CONTAINER} relative z-[1]`}>
            <h1 className="my-[28px_30px] font-display text-[clamp(58px,8vw,110px)] font-medium leading-[.88] tracking-[-.09em] [&_i]:not-italic [&_i]:text-lavender">
              {heroTitle}
              <br />
              <i>{heroAccent}</i>
            </h1>
            <p className="max-w-[470px] leading-[1.75] text-white/65">
              {text("gallery", "hero.body", "Una mirada al equipo, los estudios y la atención que llevamos a distintos espacios de Puerto Vallarta y Bahía de Banderas.")}
            </p>
          </div>
        </section>
        <section className={SECTION_PAD}>
          <div className={CONTAINER}>
            <SectionHeader
              eyebrow={text("gallery", "content.eyebrow", "Nuestro trabajo")}
              title={
                <>
                  {contentTitle}
                  <br />
                  <i>{contentAccent}</i>
                </>
              }
              body={text("gallery", "content.body", "Fotografías de servicios, equipo y experiencias compartidas por Imagen del Puerto.")}
            />
            <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {photos.map((photo, index) => (
                <figure
                  className="group relative mb-4 break-inside-avoid overflow-hidden bg-mist"
                  key={photo}
                >
                  <button
                    className="block w-full cursor-pointer border-0 bg-transparent p-0"
                    type="button"
                    onClick={() => setSelectedPhoto(index)}
                    aria-label={text("gallery", "image.openAria", "Ampliar imagen {numero} de la galería").replace("{numero}", String(index + 1))}
                  >
                    <ProgressiveImage
                      className={`w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04] ${index % 4 === 0 ? "aspect-[4/5]" : index % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
                      src={photo}
                      alt={gallery[index]?.alt || `${text("gallery", "image.alt", "Galería Imagen del Puerto")} ${index + 1}`}
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                  </button>
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-4 py-3 text-[10px] tracking-[.12em] text-white uppercase backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                    {text("gallery", "image.caption", "Imagen del Puerto · Puerto Vallarta y Bahía de Banderas")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
      {selectedPhoto !== null && (
        <ImageLightbox
          image={photos[selectedPhoto]}
          alt={text("gallery", "lightbox.alt", "Fotografía ampliada de Imagen del Puerto")}
          onClose={() => setSelectedPhoto(null)}
          onPrevious={() =>
            setSelectedPhoto(current =>
              current === null ? 0 : (current - 1 + photos.length) % photos.length
            )
          }
          onNext={() =>
            setSelectedPhoto(current =>
              current === null ? 0 : (current + 1) % photos.length
            )
          }
          position={`${selectedPhoto + 1} / ${photos.length}`}
        />
      )}
    </div>
  );
}
