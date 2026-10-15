import { useState } from "react";
import { Link } from "wouter";
import { HeartPulse, ScanLine, ShieldCheck, Wind } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { galleryImages, media, serviceImages } from "@/assets";
import { useCms } from "@/cms/CmsProvider";
import {
  CONTAINER, FIELD_BORDER, ImageLightbox, ProgressiveImage,
  SECTION_DARK, SECTION_PAD, SectionHeader, coverStyle,
  heroAssets,
} from "@/components/site/Shared";

const serviceExperience = {
  "rayos-x": {
    eyebrow: "Radiología móvil",
    title: "Precisión desde la primera visita.",
    note: "Nuestro equipo portátil permite realizar distintas proyecciones sin trasladar al paciente.",
    steps: [
      ["01", "Coordinación", "Confirmamos el tipo de estudio, ubicación y condiciones del paciente."],
      ["02", "Toma del estudio", "Realizamos las proyecciones necesarias con equipo digital portátil."],
      ["03", "Resultados", "Entregamos imágenes digitales e interpretación radiológica en aproximadamente 24 horas."],
    ],
    images: serviceImages.xray.slice(0, 3),
  },
  electrocardiogramas: {
    eyebrow: "Evaluación cardiaca",
    title: "Un registro cómodo y confiable.",
    note: "El ECG de 12 derivaciones se realiza con el paciente en reposo y sin procedimientos invasivos.",
    steps: [
      ["01", "Preparación", "Explicamos el procedimiento y preparamos al paciente para obtener un registro claro."],
      ["02", "Registro", "Colocamos los electrodos y realizamos el electrocardiograma con equipo portátil."],
      ["03", "Reporte", "Compartimos el reporte digital con interpretación cardiológica para su seguimiento."],
    ],
    images: serviceImages.ecg.slice(0, 3),
  },
  "poligrafia-respiratoria": {
    eyebrow: "Estudio respiratorio nocturno",
    title: "Tu descanso también cuenta una historia.",
    note: "La poligrafía registra variables respiratorias durante el sueño sin necesidad de pasar la noche en una clínica.",
    steps: [
      ["01", "Orientación", "Explicamos el uso del equipo y resolvemos dudas antes del registro."],
      ["02", "Noche de estudio", "El paciente duerme en casa mientras el equipo registra las variables respiratorias."],
      ["03", "Procesamiento", "Recuperamos la información y coordinamos la entrega del reporte digital."],
    ],
    images: [media.contactHero, galleryImages[0], media.equipment],
  },
} as const;

export default function DetailPage({ serviceSlug }: { serviceSlug?: string }) {
  const { services, text } = useCms();
  const service = services.find(item => item.slug === serviceSlug) ?? services[0];
  const fallbackExperience = serviceExperience[service.slug as keyof typeof serviceExperience] ?? serviceExperience["rayos-x"];
  const experience = {
    eyebrow: service.experienceEyebrow || fallbackExperience.eyebrow,
    title: service.experienceTitle || fallbackExperience.title,
    note: service.experienceNote || fallbackExperience.note,
    steps: service.steps || fallbackExperience.steps,
    images: service.gallery?.length ? service.gallery : fallbackExperience.images,
  };
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const hero = service.slug === "rayos-x"
    ? heroAssets.xray
    : service.slug === "poligrafia-respiratoria"
      ? heroAssets.respiratory
      : heroAssets.ecg;
  const image = service.image || hero;
  const [includesTitle, includesAccent] = text("serviceDetail", "includes.title", "Información\nclara.").split("\n");
  const [processTitle, processAccent] = text("serviceDetail", "process.title", "Un proceso sencillo.\nBien acompañado.").split("\n");
  const [galleryTitle, galleryAccent] = text("serviceDetail", "gallery.title", "Tecnología portátil.\nAtención humana.").split("\n");

  const ServiceIcon = service.icon === "scan" ? ScanLine : service.icon === "respiratory" ? Wind : HeartPulse;

  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat py-[180px_110px] after:absolute after:right-[-210px] after:top-[-200px] after:size-[640px] after:rounded-full after:border after:border-lavender/15 after:shadow-[0_0_0_100px_rgba(172,180,211,.025),0_0_0_200px_rgba(172,180,211,.02)] max-[900px]:pt-[150px] max-[680px]:py-[130px_76px]`}
          style={coverStyle(image, "linear-gradient(90deg, rgba(23,21,27,.97), rgba(23,21,27,.76) 46%, rgba(23,21,27,.28))")}
        >
          <div className={`${CONTAINER} relative z-[1]`}>
            <Link href="/servicios" className="mb-[74px] inline-block text-[11px] text-white/55 transition-colors hover:text-white max-[680px]:mb-[53px]">{text("serviceDetail", "back", "← Volver a servicios")}</Link>
            <h1 className="my-[25px_26px] font-display text-[clamp(58px,8vw,110px)] font-medium leading-[.88] tracking-[-.09em] max-[680px]:text-[clamp(58px,15vw,82px)] [&_i]:not-italic [&_i]:text-lavender">
              {service.title.split("\n").map(line => <span key={line}>{line}<br /></span>)}
            </h1>
            <p className="mt-0 mb-[29px] max-w-[470px] leading-[1.7] text-white/60">{service.detail}</p>
          </div>
        </section>

        <section className={`${SECTION_PAD} bg-mist`}>
          <div className={`${CONTAINER} grid grid-cols-2 gap-[110px] max-[900px]:grid-cols-1 max-[900px]:gap-12`}>
            <>
              <div>
                <SectionHeader eyebrow={text("serviceDetail", "includes.eyebrow", "Qué incluye")} title={<>{includesTitle}<br /><i>{includesAccent}</i></>} />
                <ul className={`mt-[65px] mb-0 list-none border-t p-0 ${FIELD_BORDER}`}>
                  {service.bullets.map(bullet => (
                    <li className={`flex items-center gap-3 border-b py-4 text-xs text-steel ${FIELD_BORDER} [&_svg]:text-rx-blue`} key={bullet}>
                      <ShieldCheck size={18} />{bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[330px] self-center border-l-4 border-lavender bg-white p-[38px] shadow-[0_19px_50px_rgba(66,62,73,.08)] max-[680px]:p-[26px]">
                <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-rx-blue">{experience.eyebrow}</span>
                <p className="mt-7 mb-5 max-w-[400px] font-display text-[28px] font-medium leading-[1.1] tracking-[-.055em] max-[680px]:text-[23px]">{experience.title}</p>
                <p className="m-0 max-w-[380px] text-sm leading-[1.7] text-steel">{experience.note}</p>
                <ServiceIcon className="absolute right-[30px] bottom-[25px] text-lavender" size={48} strokeWidth={1.2} />
              </div>
            </>
          </div>
        </section>

        <section className={SECTION_PAD}>
          <div className={CONTAINER}>
            <SectionHeader eyebrow={text("serviceDetail", "process.eyebrow", "Así funciona")} title={<>{processTitle}<br /><i>{processAccent}</i></>} body={text("serviceDetail", "process.body", "Te explicamos qué esperar antes, durante y después del estudio.")} />
            <div className="mt-16 grid grid-cols-3 gap-5 max-[800px]:grid-cols-1">
              {experience.steps.map(([number, title, body]) => (
                <article className="border-t-2 border-rx-blue bg-mist p-8" key={number}>
                  <span className="font-display text-xs text-rx-blue">{number}</span>
                  <h2 className="my-5 font-display text-[30px] font-medium tracking-[-.055em]">{title}</h2>
                  <p className="m-0 text-sm leading-[1.75] text-steel">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${SECTION_PAD} ${SECTION_DARK}`}>
          <div className={CONTAINER}>
            <SectionHeader light eyebrow={text("serviceDetail", "gallery.eyebrow", "El servicio de cerca")} title={<>{galleryTitle}<br /><i>{galleryAccent}</i></>} body={text("serviceDetail", "gallery.body", "Conoce parte del equipo y del trabajo que llevamos hasta cada paciente.")} />
            <div className="mt-16 grid grid-cols-[1.4fr_1fr_1fr] gap-4 max-[760px]:grid-cols-1">
              {experience.images.map((photo, index) => (
                <button
                  className={`group relative min-h-[360px] cursor-pointer overflow-hidden border-0 bg-charcoal p-0 ${index === 0 ? "max-[760px]:min-h-[420px]" : "max-[760px]:min-h-[280px]"}`}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={text("serviceDetail", "gallery.openAria", "Ampliar fotografía {numero} de {servicio}").replace("{numero}", String(index + 1)).replace("{servicio}", service.title.replace("\n", " "))}
                  key={photo}
                >
                  <ProgressiveImage className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" src={photo} alt={text("serviceDetail", "gallery.imageAlt", "{servicio}, imagen {numero}").replace("{servicio}", service.title.replace("\n", " ")).replace("{numero}", String(index + 1))} loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(23,21,27,.8))] px-5 pt-16 pb-5 text-left text-[10px] uppercase tracking-[.13em] text-white/75">{text("serviceDetail", "gallery.caption", "Imagen del Puerto")} · {String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedImage !== null && (
        <ImageLightbox image={experience.images[selectedImage]} alt={text("serviceDetail", "gallery.expandedAlt", "Vista ampliada de {servicio}").replace("{servicio}", service.title.replace("\n", " "))} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
