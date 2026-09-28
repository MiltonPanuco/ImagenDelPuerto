import { Link } from "wouter";
import {
  ArrowUpRight, HeartPulse, MoveRight, ScanLine, Wind,
} from "lucide-react";
import { useCms } from "@/cms/CmsProvider";
import { media } from "@/assets";
import {
  BUTTON, CONTAINER, FIELD_BORDER, SECTION_DARK, SECTION_PAD,
  SectionHeader, TEXT_LINK, coverStyle,
} from "@/components/site/Shared";

const equipmentImage = media.equipment;
function ServicesSection() {
  const { services, text } = useCms();
  return (
    <section id="servicios" className={`${SECTION_PAD} bg-mist`}>
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={text("home", "services.eyebrow", "Servicios de diagnóstico")}
          title={
            <>
              {text("home", "services.titlePrefix", "Tecnología que ")}<i>{text("home", "services.titleAccent", "se mueve contigo.")}</i>
            </>
          }
          body={text("home", "services.body", "Estudios portátiles para llevar información clara a donde más la necesitas.")}
        />
        <div
          className={`mt-[72px] border-t ${FIELD_BORDER} max-[680px]:mt-[43px]`}
        >
          {services.map(service => (
            <article
              className={`group grid min-h-[190px] grid-cols-[72px_88px_1fr_46px] items-center gap-7 border-b px-6 transition-colors duration-500 ease-brand hover:bg-white/35 ${FIELD_BORDER} max-[680px]:min-h-[175px] max-[680px]:grid-cols-[40px_66px_1fr_36px] max-[680px]:gap-[13px] max-[680px]:px-2 max-[680px]:hover:bg-transparent`}
              key={service.slug}
            >
              <div className="self-start pt-11 font-display text-xs font-medium text-rx-blue">
                {service.number}
              </div>
              <div
                className="flex min-h-[190px] self-stretch items-center justify-center text-charcoal [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-brand group-hover:[&_svg]:scale-105 max-[680px]:min-h-[175px]"
                style={{ backgroundColor: service.accent }}
                aria-hidden="true"
              >
                {service.icon === "scan" ? (
                  <ScanLine size={28} strokeWidth={1.4} />
                ) : service.icon === "respiratory" ? (
                  <Wind size={29} strokeWidth={1.4} />
                ) : (
                  <HeartPulse size={29} strokeWidth={1.4} />
                )}
              </div>
              <div className="transition-transform duration-500 ease-brand group-hover:translate-x-1 max-[680px]:group-hover:translate-x-0">
                <h3 className="mt-0 mb-[13px] font-display text-[clamp(28px,3vw,42px)] font-medium leading-[.95] tracking-[-.07em] max-[680px]:text-[26px]">
                  {service.title.split("\n").map((line, i) => (
                    <span key={line}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="m-0 max-w-[440px] leading-[1.6] text-steel max-[680px]:text-[11px] max-[680px]:leading-[1.5]">
                  {service.short}
                </p>
              </div>
              <Link
                href={`/servicios/${service.slug}`}
                className="grid size-11 place-items-center rounded-full border border-charcoal/30 transition-[background-color,color,transform,border-color] duration-500 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-white max-[680px]:size-[35px] max-[680px]:group-hover:translate-x-0 max-[680px]:group-hover:translate-y-0"
                aria-label={text("home", "services.linkAria", "Ver {servicio}").replace("{servicio}", service.title.replace("\n", " "))}
              >
                <ArrowUpRight size={20} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RentalSection() {
  const { rentals, text, image } = useCms();
  const [title, accent] = text("home", "rental.title", "Apoyo para\ncada etapa.").split("\n");
  const [imageTitle, imageAccent] = text("home", "rental.imageTitle", "Lo que necesitas\ncuando lo necesitas.").split("\n");
  return (
    <section
      id="renta"
      className={`${SECTION_PAD} ${SECTION_DARK} relative overflow-hidden`}
    >
      <div className={CONTAINER}>
        <div className="flex items-end justify-between gap-[30px] max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-5">
          <SectionHeader
            light
            eyebrow={text("home", "rental.eyebrow", "Equipo médico en renta")}
            title={
              <>
                {title}
                <br />
                <i>{accent}</i>
              </>
            }
            body={text("home", "rental.body", "Equipo confiable para acompañar la recuperación, el cuidado y la movilidad.")}
          />
          <Link
            href="/renta"
            className={`${BUTTON} border border-white/30 text-white hover:border-white/60 hover:bg-white/10`}
          >
            {text("home", "rental.button", "Ver catálogo completo")} <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-[74px] grid grid-cols-[1.35fr_.85fr] gap-5 max-[900px]:grid-cols-1 max-[680px]:mt-[42px]">
          <div
            className="relative flex min-h-[500px] items-end overflow-hidden bg-charcoal bg-cover bg-center max-[900px]:min-h-[430px] max-[680px]:min-h-[365px]"
            style={coverStyle(image("home", "rental.image", equipmentImage))}
          >
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(23,21,27,.88),transparent_66%)]" />
            <div className="relative z-[1] p-[37px] max-[680px]:p-[25px]">
              <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-white/60">
                {text("home", "rental.imageEyebrow", "EQUIPO MÉDICO / 02")}
              </span>
              <h3 className="my-[16px_28px] font-display text-[clamp(34px,4.4vw,62px)] font-medium leading-[.94] tracking-[-.08em] [&_i]:not-italic [&_i]:text-lavender">
                {imageTitle}
                <br />
                <i>{imageAccent}</i>
              </h3>
              <Link
                href="/renta"
                className={`${TEXT_LINK} border-white/45 text-white`}
              >
                {text("home", "rental.imageButton", "Explorar catálogo")} <MoveRight size={17} />
              </Link>
            </div>
          </div>
          <div className="border-t border-white/20">
            {rentals.slice(0, 3).map((rental, i) => (
              <Link
                href="/renta"
                className="grid min-h-[132px] grid-cols-[42px_1fr_auto] items-center gap-[13px] border-b border-white/20 transition-[padding,background] duration-200 hover:bg-white/5 hover:px-[13px] max-[680px]:min-h-[116px]"
                key={rental.name}
              >
                <span className="self-start pt-7 font-display text-[11px] text-lavender">
                  0{i + 1}
                </span>
                <span>
                  <strong className="block font-display text-[21px] font-medium tracking-[-.045em] text-white max-[680px]:text-lg">
                    {rental.name}
                  </strong>
                  <small className="mt-[5px] block max-w-[220px] text-[11px] leading-[1.5] text-white/50">
                    {rental.note}
                  </small>
                </span>
                <ArrowUpRight className="text-lavender" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default function OfferSections() {
  return <><ServicesSection /><RentalSection /></>;
}
