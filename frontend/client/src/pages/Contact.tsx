import React from "react";
import { Link } from "wouter";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCms } from "@/cms/CmsProvider";
import { whatsappHref } from "@/data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  BUTTON,
  CONTAINER,
  FIELD_BORDER,
  SECTION_DARK,
  SECTION_PAD,
  FAQSection,
  SectionHeader,
  coverStyle,
  heroAssets,
} from "@/components/site/Shared";
export default function ContactPage() {
  const { site, services, text, image } = useCms();
  const [heroTitle, heroAccent] = text(
    "contact",
    "hero.title",
    "Cuéntanos\nqué necesitas."
  ).split("\n");
  const [channelsTitle, channelsAccent] = text(
    "contact",
    "channels.title",
    "Hablemos\nsin rodeos."
  ).split("\n");
  const contactRow = `grid grid-cols-[25px_1fr_auto] items-center gap-[15px] border-b py-[21px] ${FIELD_BORDER} [&>svg]:text-rx-blue [&>svg:last-child]:text-steel`;
  const fieldClass =
    "w-full resize-y rounded-none border-0 border-b border-[rgb(66_62_73_/_24%)] bg-transparent px-0 py-2 text-charcoal outline-none focus:border-rx-blue";
  const sendToWhatsApp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = text(
      "contact",
      "form.template",
      "Hola, soy {nombre}.\nServicio de interés: {servicio}\nMi contacto: {contacto}\n\n{mensaje}"
    )
      .replace("{nombre}", String(data.get("name")).trim())
      .replace("{servicio}", String(data.get("service")).trim())
      .replace("{contacto}", String(data.get("contact")).trim())
      .replace("{mensaje}", String(data.get("message")).trim());
    window.open(
      whatsappHref(site.whatsapp, message),
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat py-[180px_110px] after:absolute after:right-[-210px] after:top-[-200px] after:size-[640px] after:rounded-full after:border after:border-lavender/15 after:shadow-[0_0_0_100px_rgba(172,180,211,.025),0_0_0_200px_rgba(172,180,211,.02)] max-[900px]:pt-[150px] max-[680px]:py-[130px_76px]`}
          style={coverStyle(
            image("contact", "hero.image", heroAssets.contact),
            "linear-gradient(90deg, rgba(23,21,27,.97), rgba(23,21,27,.72) 50%, rgba(23,21,27,.28))"
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
                "contact",
                "hero.body",
                "Atendemos Puerto Vallarta y Bahía de Banderas para orientarte sobre servicios de diagnóstico y equipo médico."
              )}
            </p>
          </div>
        </section>
        <section className={SECTION_PAD}>
          <div
            className={`${CONTAINER} grid grid-cols-2 gap-[110px] max-[900px]:grid-cols-1 max-[900px]:gap-12`}
          >
            <div>
              <SectionHeader
                eyebrow={text(
                  "contact",
                  "channels.eyebrow",
                  "Canales directos"
                )}
                title={
                  <>
                    {channelsTitle}
                    <br />
                    <i>{channelsAccent}</i>
                  </>
                }
              />
              <div className={`mt-[55px] border-t ${FIELD_BORDER}`}>
                <a
                  className={contactRow}
                  href={whatsappHref(site.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={22} aria-hidden="true" />
                  <span className="text-[13px]">
                    <small className="mb-1 block text-[10px] uppercase tracking-[.12em] text-steel">
                      {text("contact", "channels.whatsapp", "WhatsApp")}
                    </small>
                    {site.phone}
                  </span>
                  <ArrowUpRight size={17} />
                </a>
                <a className={contactRow} href={site.phoneHref}>
                  <Phone size={21} />
                  <span className="text-[13px]">
                    <small className="mb-1 block text-[10px] uppercase tracking-[.12em] text-steel">
                      {text("contact", "channels.phone", "Teléfono")}
                    </small>
                    {site.phone}
                  </span>
                  <ArrowUpRight size={17} />
                </a>
                <a className={contactRow} href={`mailto:${site.email}`}>
                  <Mail size={21} />
                  <span className="text-[13px]">
                    <small className="mb-1 block text-[10px] uppercase tracking-[.12em] text-steel">
                      {text("contact", "channels.email", "Correo")}
                    </small>
                    {site.email}
                  </span>
                  <ArrowUpRight size={17} />
                </a>
                <div className={contactRow}>
                  <MapPin size={21} />
                  <span className="text-[13px]">
                    <small className="mb-1 block text-[10px] uppercase tracking-[.12em] text-steel">
                      {text("contact", "channels.location", "Ubicación")}
                    </small>
                    {site.location}
                  </span>
                </div>
              </div>
            </div>
            <form
              className="flex w-full max-w-[640px] flex-col gap-[18px] justify-self-start border border-charcoal/10 bg-mist p-[clamp(24px,4vw,40px)] shadow-[0_18px_55px_rgba(66,62,73,.08)] max-[900px]:justify-self-center"
              onSubmit={sendToWhatsApp}
              aria-label={text(
                "contact",
                "form.aria",
                "Solicitar información por WhatsApp"
              )}
            >
              <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-rx-blue">
                {text("contact", "form.eyebrow", "FORMULARIO GENERAL")}
              </span>
              <label className="flex flex-col gap-[7px] text-[11px] text-steel">
                {text("contact", "form.name", "Nombre")}
                <input
                  id="contact-name"
                  className={fieldClass}
                  name="name"
                  type="text"
                  placeholder={text(
                    "contact",
                    "form.namePlaceholder",
                    "Tu nombre"
                  )}
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </label>
              <label className="flex flex-col gap-[7px] text-[11px] text-steel">
                {text("contact", "form.contact", "Teléfono o correo")}
                <input
                  id="contact-channel"
                  className={fieldClass}
                  name="contact"
                  type="text"
                  placeholder={text(
                    "contact",
                    "form.contactPlaceholder",
                    "¿Cómo te contactamos?"
                  )}
                  autoComplete="tel"
                  maxLength={120}
                  aria-describedby="contact-help"
                  required
                />
              </label>
              <label className="flex flex-col gap-[7px] text-[11px] text-steel">
                {text("contact", "form.service", "Servicio de interés")}
                <select
                  id="contact-service"
                  className={fieldClass}
                  name="service"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    {text(
                      "contact",
                      "form.servicePlaceholder",
                      "Selecciona una opción"
                    )}
                  </option>
                  {services.map(service => (
                    <option key={service.slug}>
                      {service.title.replace("\n", " ")}
                    </option>
                  ))}
                  <option>
                    {text("global", "nav.rental", "Renta de equipo médico")}
                  </option>
                </select>
              </label>
              <label className="flex flex-col gap-[7px] text-[11px] text-steel">
                {text("contact", "form.message", "Mensaje general")}
                <textarea
                  id="contact-message"
                  className={fieldClass}
                  name="message"
                  placeholder={text(
                    "contact",
                    "form.messagePlaceholder",
                    "Cuéntanos brevemente cómo podemos ayudarte."
                  )}
                  rows={4}
                  minLength={10}
                  maxLength={700}
                  required
                />
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-[11px] leading-[1.55] text-steel">
                <input
                  className="mt-0.5 size-4 shrink-0 accent-rx-blue"
                  name="privacy"
                  type="checkbox"
                  required
                />
                <span>
                  {text("contact", "form.privacyPrefix", "He leído el ")}
                  <Link
                    className="underline hover:text-charcoal"
                    href="/aviso-de-privacidad"
                  >
                    {text("contact", "form.privacyLink", "aviso de privacidad")}
                  </Link>
                  {text(
                    "contact",
                    "form.privacySuffix",
                    " y entiendo que este formulario es únicamente para contacto general."
                  )}
                </span>
              </label>
              <button
                className={`${BUTTON} self-start border-0 bg-charcoal text-white hover:-translate-y-0.5 hover:bg-violet max-[680px]:w-full`}
                type="submit"
              >
                {text("contact", "form.submit", "Enviar por WhatsApp")}{" "}
                <FaWhatsapp size={17} aria-hidden="true" />
              </button>
              <p
                id="contact-help"
                className="mt-[-2px] mb-0 text-[10px] leading-[1.5] text-steel"
              >
                {text(
                  "contact",
                  "form.help",
                  "Este formulario no sustituye servicios de emergencia. No compartas datos médicos sensibles."
                )}
              </p>
            </form>
          </div>
        </section>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
