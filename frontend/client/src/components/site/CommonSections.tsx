import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCms } from "@/cms/CmsProvider";
import {
  CONTAINER, Eyebrow, FIELD_BORDER, SECTION_DARK, SECTION_PAD, SectionHeader,
  WhatsAppButton,
} from "./SitePrimitives";
export function ProcessSection() {
  const { process, text } = useCms();
  const [title, accent] = text("global", "process.title", "Tres pasos.\nCero complicaciones.").split("\n");
  return (
    <section id="proceso" className={SECTION_PAD}>
      <div
        className={`${CONTAINER} grid grid-cols-2 gap-[90px] max-[900px]:grid-cols-1 max-[900px]:gap-12`}
      >
        <SectionHeader
          eyebrow={text("global", "process.eyebrow", "Cómo funciona")}
          title={
            <>
              {title}
              <br />
              <i>{accent}</i>
            </>
          }
          body={text("global", "process.body", "Escríbenos y coordinamos contigo la atención que necesitas.")}
        />
        <div className={`border-t ${FIELD_BORDER}`}>
          {process.map(([number, title, description]) => (
            <div
              className={`grid grid-cols-[68px_1fr] gap-5 border-b py-[26px_31px] ${FIELD_BORDER} max-[680px]:grid-cols-[45px_1fr]`}
              key={number}
            >
              <span className="font-display text-[11px] text-rx-blue">
                {number}
              </span>
              <div>
                <h3 className="mt-[-5px] mb-[7px] font-display text-[28px] font-medium tracking-[-.06em]">
                  {title}
                </h3>
                <p className="m-0 max-w-[330px] text-xs text-steel">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteSection() {
  const { text } = useCms();
  const [quote, accent] = text("global", "quote.text", "Lo profesional también puede sentirse\ncercano.").split("\n");
  const [caption, location] = text("global", "quote.caption", "Atención médica móvil\nPuerto Vallarta y Bahía de Banderas").split("\n");
  return (
    <section className={`${SECTION_DARK} relative overflow-hidden py-[135px] max-[680px]:py-[88px]`}>
      <div className={`${CONTAINER} relative z-[1]`}>
        <div className="h-[38px] font-display text-[100px] leading-[.6] text-lavender">“</div>
        <blockquote className="my-[42px] font-display text-[clamp(38px,5.4vw,75px)] font-medium leading-[.98] tracking-[-.08em] max-[680px]:text-[clamp(40px,11vw,61px)] [&_i]:not-italic [&_i]:text-lavender">
          {quote}<br /><i>{accent}</i>
        </blockquote>
        <div className="flex items-center gap-[11px] text-[11px] leading-[1.6] text-white/50">
          <span className="inline-block size-[7px] rounded-full bg-[#9ca8d7] shadow-[0_0_0_5px_rgba(172,180,211,.12)]" />
          {caption}<br />{location}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const { faqs, text } = useCms();
  const [title, accent] = text("global", "faq.title", "Lo que quieras\nsaber antes.").split("\n");
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className={`${SECTION_PAD} bg-mist`}>
      <div className={`${CONTAINER} grid grid-cols-[1fr_1.05fr] gap-[90px] max-[900px]:grid-cols-1 max-[900px]:gap-12 max-[680px]:gap-[35px]`}>
        <SectionHeader eyebrow={text("global", "faq.eyebrow", "Preguntas frecuentes")} title={<>{title}<br /><i>{accent}</i></>} />
        <div className={`border-t ${FIELD_BORDER}`}>
          {faqs.map(([question, answer], index) => (
            <div className={`border-b ${FIELD_BORDER}`} key={question}>
              <button
                className="flex w-full items-center justify-between border-0 bg-transparent py-[23px] text-left font-display text-[17px] font-medium tracking-[-.03em] text-charcoal max-[680px]:gap-[17px] max-[680px]:text-[15px] [&_svg]:text-rx-blue [&_svg]:transition-transform"
                onClick={() => setActive(active === index ? null : index)}
                aria-expanded={active === index}
              >
                <span>{question}</span>
                <ChevronDown className={active === index ? "rotate-180" : ""} size={18} />
              </button>
              <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-brand ${active === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} aria-hidden={active !== index}>
                <div className="overflow-hidden">
                  <p className="mt-[-5px] mb-6 max-w-[500px] text-xs leading-[1.7] text-steel">{answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { text } = useCms();
  const [title, accent] = text("global", "cta.title", "Hablemos de lo\nque necesitas.").split("\n");
  return (
    <section className={`${SECTION_DARK} relative overflow-hidden py-[135px] max-[680px]:py-[88px]`}>
      <div className={`${CONTAINER} relative z-[1]`}>
        <Eyebrow light>{text("global", "cta.eyebrow", "Estamos para ayudarte")}</Eyebrow>
        <h2 className="my-6 font-display text-[clamp(48px,7vw,100px)] font-medium leading-[.88] tracking-[-.09em] [&_i]:not-italic [&_i]:text-lavender">
          {title}<br /><i>{accent}</i>
        </h2>
        <p className="mt-0 mb-[30px] text-white/60">{text("global", "cta.body", "Atención profesional en Puerto Vallarta y Bahía de Banderas.")}</p>
        <div className="[&_a]:bg-white [&_a]:text-ink [&_a:hover]:bg-lavender">
          <WhatsAppButton label={text("global", "cta.button", "Escribir por WhatsApp")} />
        </div>
      </div>
      <div className="pointer-events-none absolute right-[-230px] top-[-160px] size-[720px] rounded-full border border-lavender/20" />
      <div className="pointer-events-none absolute right-[-75px] top-[-70px] size-[540px] rounded-full border border-lavender/20" />
    </section>
  );
}
