import {
  CONTAINER, coverStyle, heroImage,
} from "@/components/site/Shared";
import { useCms } from "@/cms/CmsProvider";
function Hero() {
  const { text, image } = useCms();
  const [title, accent, ending] = text("home", "hero.title", "Diagnóstico\ny equipo médico\nhasta tu hogar.").split("\n");
  const [latitude, longitude] = text("home", "hero.coordinates", "20°39' N\n105°13' W").split("\n");
  const [sideTitle, sideEnding] = text("home", "hero.side", "PRECISIÓN\nA TU PUERTA").split("\n");
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink text-white">
      <div
        className="absolute inset-y-0 right-0 left-[38%] bg-[#35333d] bg-cover bg-center opacity-[.84] max-[900px]:inset-0 max-[900px]:bg-[position:68%_center] max-[900px]:opacity-[.52] max-[680px]:bg-[position:72%_center]"
        style={coverStyle(image("home", "hero.image", heroImage))}
      >
        <div className="absolute inset-y-0 left-[22%] w-px bg-[linear-gradient(transparent,rgba(255,255,255,.55),transparent)] opacity-[.42]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#17151b_0%,rgba(23,21,27,.92)_15%,rgba(23,21,27,.2)_57%,rgba(23,21,27,.42)_100%),linear-gradient(0deg,rgba(23,21,27,.65),transparent_42%)] max-[900px]:bg-[linear-gradient(90deg,rgba(23,21,27,.95),rgba(23,21,27,.43)_75%),linear-gradient(0deg,rgba(23,21,27,.7),transparent_65%)]" />
        <div className="absolute right-8 top-[130px] z-[2] text-right font-display text-[10px] leading-[1.5] tracking-[.13em] text-white/50 max-[680px]:hidden">
          {latitude}<br />
          {longitude}
        </div>
        <div className="absolute bottom-8 right-8 left-[43%] z-[2] flex justify-between text-[9px] tracking-[.15em] text-white/55 max-[900px]:left-[22px] max-[900px]:right-[22px]">
          <span>{text("home", "hero.brand", "IMAGEN DEL PUERTO")}</span>
          <span>{text("home", "hero.code", "MEDICAL IMAGING / 01")}</span>
        </div>
      </div>
      <div
        className={`${CONTAINER} relative z-[2] flex min-h-screen flex-col justify-center pt-[104px] max-[680px]:pt-[88px]`}
      >
        <h1 className="my-[29px_31px] max-w-[790px] font-display text-[clamp(55px,7vw,103px)] font-medium leading-[.9] tracking-[-.085em] motion-safe:animate-rise max-[900px]:text-[clamp(57px,10vw,85px)] max-[680px]:mt-[21px] max-[680px]:text-[clamp(50px,14vw,74px)] [&_i]:not-italic [&_i]:text-lavender">
          {title}
          <br />
          <i>{accent}</i>
          <br />
          {ending}
        </h1>
        <p className="m-0 mb-7 max-w-[420px] leading-[1.7] text-white/65 motion-safe:animate-[rise_.7s_.08s_var(--ease-brand)_both] max-[680px]:max-w-[310px] max-[680px]:text-[13px]">
          {text("home", "hero.body", "Rayos X, electrocardiogramas, poligrafía respiratoria y renta de equipo médico con atención profesional, rápida y personalizada.")}
        </p>
      </div>
      <div className="absolute right-[13px] top-[41%] text-[9px] leading-[1.6] tracking-[.17em] text-white/30 [writing-mode:vertical-rl] max-[900px]:hidden">
        {sideTitle}
        <br />{sideEnding}
      </div>
    </section>
  );
}

export default function HeroIntroSections() {
  return <Hero />;
}
