import React from "react";
import { Link } from "wouter";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { media } from "@/assets";
import { useCms } from "@/cms/CmsProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CONTAINER, FIELD_BORDER, SECTION_DARK, SECTION_PAD, ProgressiveImage,
  ProcessSection, SectionHeader, TEXT_LINK, coverStyle, heroAssets,
} from "@/components/site/Shared";
export default function ServicesPage() {
  const { services, text, image } = useCms();
  const [heroTitle, heroAccent] = text("services", "hero.title", "Diagnóstico y cuidado,\nmás cerca de ti.").split("\n");
  const [listTitle, listAccent] = text("services", "list.title", "Servicios pensados\npara la vida real.").split("\n");
  const [coverageTitle, coverageAccent] = text("services", "coverage.title", "Llegamos hasta\ndonde estás.").split("\n");
  const cards = [
    {
      eyebrow: text("services", "cards.1.eyebrow", "Diagnóstico / 01"),
      title: text("services", "cards.1.title", "Rayos X portátiles"),
      body: text("services", "cards.1.body", "Estudios radiológicos digitales realizados donde el paciente los necesita, con entrega digital e interpretación profesional."),
      image: services[0]?.image || heroAssets.xray,
      href: "/servicios/rayos-x",
      action: text("services", "cards.1.action", "Conocer Rayos X"),
    },
    {
      eyebrow: text("services", "cards.2.eyebrow", "Diagnóstico / 02"),
      title: text("services", "cards.2.title", "Electrocardiogramas"),
      body: text("services", "cards.2.body", "ECG de 12 derivaciones con equipo portátil, reporte detallado e interpretación médica."),
      image: services[1]?.image || heroAssets.ecg,
      href: "/servicios/electrocardiogramas",
      action: text("services", "cards.2.action", "Conocer ECG"),
    },
    {
      eyebrow: text("services", "cards.3.eyebrow", "Diagnóstico / 03"),
      title: text("services", "cards.3.title", "Poligrafía respiratoria"),
      body: text("services", "cards.3.body", "Estudio respiratorio nocturno realizado en casa con equipo portátil, reporte digital y acompañamiento para su correcta colocación."),
      image: services[2]?.image || heroAssets.respiratory,
      href: "/servicios/poligrafia-respiratoria",
      action: text("services", "cards.3.action", "Conocer poligrafía"),
    },
    {
      eyebrow: text("services", "cards.4.eyebrow", "Cuidado / 04"),
      title: text("services", "cards.4.title", "Renta de equipo médico"),
      body: text("services", "cards.4.body", "Camas hospitalarias, concentradores de oxígeno, sillas de ruedas y apoyos para recuperación en casa."),
      image: image("services", "cards.4.image", heroAssets.rental),
      href: "/renta",
      action: text("services", "cards.4.action", "Explorar equipo"),
    },
  ];

  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center py-[190px_120px]`}
          style={coverStyle(
            image("services", "hero.image", media.equipment),
            "linear-gradient(90deg,rgba(23,21,27,.98),rgba(23,21,27,.72) 55%,rgba(23,21,27,.3))"
          )}
        >
          <div className={`${CONTAINER} relative z-[1]`}>
            <h1 className="my-[28px_30px] max-w-[920px] font-display text-[clamp(58px,8vw,112px)] font-medium leading-[.88] tracking-[-.09em] [&_i]:not-italic [&_i]:text-lavender">
              {heroTitle}
              <br />
              <i>{heroAccent}</i>
            </h1>
            <p className="max-w-[520px] leading-[1.75] text-white/65">
              {text("services", "hero.body", "Una solución clara para estudios a domicilio y equipo médico en Puerto Vallarta y Bahía de Banderas.")}
            </p>
          </div>
        </section>
        <section className={SECTION_PAD}>
          <div className={CONTAINER}>
            <SectionHeader
              eyebrow={text("services", "list.eyebrow", "Todo en un solo lugar")}
              title={
                <>
                  {listTitle}
                  <br />
                  <i>{listAccent}</i>
                </>
              }
              body={text("services", "list.body", "Elige el servicio que necesitas y consulta disponibilidad directamente por WhatsApp.")}
            />
            <div className="mt-20 grid gap-6">
              {cards.map((card, index) => (
                <article
                  className="group grid min-h-[390px] grid-cols-[1fr_1.05fr] overflow-hidden bg-mist max-[760px]:grid-cols-1"
                  key={card.title}
                >
                  <div
                    className={`relative min-h-[340px] overflow-hidden ${index % 2 ? "min-[761px]:order-2" : ""}`}
                  >
                    <ProgressiveImage
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.025]"
                      src={card.image}
                      alt={card.title}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(23,21,27,.38),transparent_55%)]" />
                  </div>
                  <div className="flex flex-col justify-center p-[clamp(32px,6vw,76px)]">
                    <span className="text-[10px] font-semibold tracking-[.15em] text-rx-blue uppercase">
                      {card.eyebrow}
                    </span>
                    <h2 className="my-5 font-display text-[clamp(38px,4.5vw,64px)] font-medium leading-[.95] tracking-[-.07em]">
                      {card.title}
                    </h2>
                    <p className="mb-8 max-w-[470px] leading-[1.7] text-steel">
                      {card.body}
                    </p>
                    <Link className={TEXT_LINK} href={card.href}>
                      {card.action} <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ProcessSection />
        <section className={`${SECTION_PAD} bg-mist`}>
          <div className={`${CONTAINER} grid grid-cols-[1.08fr_.92fr] items-center gap-[80px] max-[900px]:grid-cols-1 max-[900px]:gap-12`}>
            <div className="relative min-h-[560px] overflow-hidden bg-steel/15 max-[680px]:min-h-[420px]">
              <ProgressiveImage
                className="absolute inset-0 size-full object-cover"
                src={image("services", "coverage.image", media.contactHero)}
                alt={text("services", "coverage.imageAlt", "Atención médica de Imagen del Puerto a domicilio")}
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(23,21,27,.88))] px-8 pt-28 pb-7 text-[10px] uppercase tracking-[.14em] text-white">
                {text("services", "coverage.caption", "Puerto Vallarta · Bahía de Banderas")}
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow={text("services", "coverage.eyebrow", "Atención coordinada")}
                title={<>{coverageTitle}<br /><i>{coverageAccent}</i></>}
                body={text("services", "coverage.body", "Coordinamos cada estudio de acuerdo con la ubicación, las necesidades del paciente y la disponibilidad del equipo.")}
              />
              <div className={`mt-12 border-t ${FIELD_BORDER}`}>
                {text("services", "coverage.items", "Atención en hogares, consultorios y clínicas\nCobertura en Puerto Vallarta y Bahía de Banderas\nEquipo portátil y reportes digitales\nOrientación clara antes de cada servicio").split("\n").map(item => (
                  <div className={`flex items-center gap-3 border-b py-5 text-sm text-steel ${FIELD_BORDER}`} key={item}>
                    <ShieldCheck className="text-rx-blue" size={19} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
