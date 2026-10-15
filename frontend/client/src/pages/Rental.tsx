import React, { useState } from "react";
import { ArrowUpRight, Crosshair, ScanLine } from "lucide-react";
import { useCms } from "@/cms/CmsProvider";
import { whatsappHref } from "@/data";
import { equipmentImages } from "@/assets";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CONTAINER,
  FIELD_BORDER,
  SECTION_DARK,
  SECTION_PAD,
  FinalCTA,
  RentalImageCarousel,
  coverStyle,
  heroAssets,
} from "@/components/site/Shared";
export default function RentalPage() {
  const { rentals, site, text, image } = useCms();
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const categories = text(
    "rental",
    "filters.categories",
    "Todos\nMovilidad\nRespiratorio\nMovilidad y cuidado"
  ).split("\n");
  const allCategory = categories[0] || "Todos";
  const [heroTitle, heroAccent] = text(
    "rental",
    "hero.title",
    "Equipo para\ncuidar mejor."
  ).split("\n");
  const filtered = rentals.filter(rental => {
    const matchesCategory =
      filter === "Todos" ||
      filter === allCategory ||
      rental.category === filter;
    const needle = query.trim().toLowerCase();
    return (
      matchesCategory &&
      (!needle ||
        `${rental.name} ${rental.category} ${rental.note}`
          .toLowerCase()
          .includes(needle))
    );
  });
  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat py-[180px_110px] after:absolute after:right-[-210px] after:top-[-200px] after:size-[640px] after:rounded-full after:border after:border-lavender/15 after:shadow-[0_0_0_100px_rgba(172,180,211,.025),0_0_0_200px_rgba(172,180,211,.02)] max-[900px]:pt-[150px] max-[680px]:py-[130px_76px]`}
          style={coverStyle(
            image("rental", "hero.image", heroAssets.rental),
            "linear-gradient(90deg, rgba(23,21,27,.96), rgba(23,21,27,.73) 50%, rgba(23,21,27,.3))"
          )}
        >
          <div className={`${CONTAINER} relative z-[1]`}>
            <h1 className="my-[25px_26px] font-display text-[clamp(58px,8vw,110px)] font-medium leading-[.88] tracking-[-.09em] max-[680px]:text-[clamp(58px,15vw,82px)] [&_i]:not-italic [&_i]:text-lavender">
              {heroTitle}
              <br />
              <i>{heroAccent}</i>
            </h1>
            <p className="mt-0 mb-[29px] max-w-[425px] leading-[1.7] text-white/60">
              {text(
                "rental",
                "hero.body",
                "Consulta disponibilidad y encuentra el apoyo que necesitas para tu recuperación o cuidado en casa."
              )}
            </p>
          </div>
        </section>
        <section className={SECTION_PAD}>
          <div className={CONTAINER}>
            <div className="mb-[30px] flex flex-col gap-[22px]">
              <label className="flex max-w-[520px] items-center gap-[11px] border-b border-[rgb(66_62_73_/_25%)] py-[7px_12px] text-rx-blue max-[680px]:max-w-none">
                <ScanLine size={17} />
                <span className="sr-only">
                  {text("rental", "search.label", "Buscar en el catálogo")}
                </span>
                <input
                  className="w-full border-0 bg-transparent text-[13px] text-charcoal outline-0 placeholder:text-steel"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder={text(
                    "rental",
                    "search.placeholder",
                    "Buscar equipo médico..."
                  )}
                />
              </label>
              <div
                className={`flex items-center justify-between gap-[25px] border-b pb-[18px] text-[11px] text-steel ${FIELD_BORDER} max-[680px]:flex-col max-[680px]:items-start`}
              >
                <span>
                  {text("rental", "filters.label", "Filtrar por categoría")}
                </span>
                <div className="flex flex-wrap gap-[5px]">
                  {categories.map(category => (
                    <button
                      className={`rounded-full border px-3 py-2 text-[11px] ${filter === category ? "border-charcoal bg-charcoal text-white" : "border-[rgb(66_62_73_/_20%)] bg-transparent text-steel hover:border-charcoal hover:bg-charcoal hover:text-white"}`}
                      key={category}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-[30px] grid grid-cols-2 gap-5 max-[680px]:grid-cols-1">
              {filtered.length ? (
                filtered.map(rental => (
                  <article className="bg-mist" key={rental.name}>
                    <RentalImageCarousel
                      images={
                        rental.images?.length
                          ? rental.images
                          : equipmentImages[
                              rental.image as keyof typeof equipmentImages
                            ]
                      }
                      name={rental.name}
                    />
                    <div className="p-[25px]">
                      <span className="text-[10px] uppercase tracking-[.12em] text-rx-blue">
                        {rental.category}
                      </span>
                      <h2 className="my-[9px_8px] font-display text-[28px] font-medium tracking-[-.06em]">
                        {rental.name}
                      </h2>
                      <p className="mt-0 mb-[19px] text-xs text-steel">
                        {rental.note}
                      </p>
                      <a
                        className="inline-flex items-center gap-2 text-[11px] font-semibold text-charcoal hover:text-rx-blue"
                        href={whatsappHref(
                          site.whatsapp,
                          text(
                            "rental",
                            "card.message",
                            "Hola, deseo consultar disponibilidad de {producto}."
                          ).replace("{producto}", rental.name)
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {text(
                          "rental",
                          "card.button",
                          "Consultar disponibilidad"
                        )}{" "}
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full grid min-h-[230px] place-items-center content-center gap-2.5 border border-dashed border-[rgb(66_62_73_/_28%)] text-center text-steel [&_svg]:text-rx-blue">
                  <Crosshair size={24} />
                  <p className="m-0 text-[13px]">
                    {text(
                      "rental",
                      "empty.message",
                      "No encontramos equipo con esa búsqueda."
                    )}
                  </p>
                  <button
                    className="border-0 border-b border-charcoal bg-transparent pb-[3px] text-[11px] font-semibold text-charcoal"
                    onClick={() => {
                      setQuery("");
                      setFilter(allCategory);
                    }}
                  >
                    {text("rental", "empty.button", "Limpiar filtros")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
