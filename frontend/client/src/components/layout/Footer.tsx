import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { media } from "@/assets";
import { useCms } from "@/cms/CmsProvider";
import { whatsappHref } from "@/data";
import { CONTAINER } from "./constants";

export default function Footer() {
  const { site, text, image } = useCms();
  const headingClass =
    "mb-5 text-[10px] font-semibold uppercase tracking-[.16em] text-lavender";
  const linkClass =
    "w-fit text-sm text-white/60 transition-colors duration-300 hover:text-white max-[1050px]:mx-auto";
  const socialClass =
    "grid size-10 place-items-center rounded-full border border-white/20 text-lavender transition-[background-color,color,border-color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:border-white/60 hover:bg-white hover:text-ink";

  return (
    <footer
      id="site-footer"
      className="relative z-10 overflow-hidden bg-ink pb-[27px] pt-16 text-white"
    >
      <div className="pointer-events-none absolute -right-36 -bottom-64 size-[520px] rounded-full border border-lavender/10" />
      <div className={CONTAINER}>
        <div className="grid grid-cols-[1.35fr_.85fr_.7fr_1.15fr] items-start gap-12 border-t border-white/20 py-[58px_64px] max-[1050px]:grid-cols-2 max-[1050px]:gap-x-16 max-[1050px]:gap-y-12 max-[1050px]:text-center max-[680px]:grid-cols-1 max-[680px]:gap-10 max-[680px]:py-[42px_48px]">
          <div className="flex min-h-[220px] items-center justify-center max-[680px]:min-h-0">
            <Link
              href="/"
              aria-label={text(
                "global",
                "brand.homeLabel",
                "Imagen del Puerto, inicio"
              )}
            >
              <img
                className="h-52 w-[330px] object-contain object-center max-[680px]:h-44 max-[680px]:w-[280px]"
                src={image("global", "footer.logo", media.logoFooter)}
                alt={text("global", "brand.name", "Imagen del Puerto")}
              />
            </Link>
          </div>

          <div>
            <p className={headingClass}>
              {text("global", "footer.services", "Servicios")}
            </p>
            <nav
              className="flex flex-col gap-3.5 max-[1050px]:items-center"
              aria-label={text(
                "global",
                "footer.servicesAria",
                "Servicios en el pie de página"
              )}
            >
              <Link className={linkClass} href="/servicios/rayos-x">
                {text("global", "footer.xray", "Rayos X portátiles")}
              </Link>
              <Link className={linkClass} href="/servicios/electrocardiogramas">
                {text("global", "footer.ecg", "Electrocardiogramas")}
              </Link>
              <Link
                className={linkClass}
                href="/servicios/poligrafia-respiratoria"
              >
                {text(
                  "global",
                  "footer.respiratory",
                  "Poligrafía respiratoria"
                )}
              </Link>
              <Link className={linkClass} href="/renta">
                {text("global", "footer.rental", "Renta de equipo")}
              </Link>
            </nav>
          </div>

          <div>
            <p className={headingClass}>
              {text("global", "footer.about", "Conócenos")}
            </p>
            <nav
              className="flex flex-col gap-3.5 max-[1050px]:items-center"
              aria-label={text(
                "global",
                "footer.secondaryAria",
                "Navegación secundaria del pie de página"
              )}
            >
              <Link className={linkClass} href="/">
                {text("global", "nav.home", "Inicio")}
              </Link>
              <Link className={linkClass} href="/nosotros">
                {text("global", "nav.about", "Nosotros")}
              </Link>
              <Link className={linkClass} href="/galeria">
                {text("global", "nav.gallery", "Galería")}
              </Link>
              <Link className={linkClass} href="/contacto">
                {text("global", "nav.contact", "Contacto")}
              </Link>
            </nav>
          </div>

          <div>
            <p className={headingClass}>
              {text("global", "footer.contact", "Contacto")}
            </p>
            <div className="flex flex-col gap-4 text-sm text-white/60 max-[1050px]:items-center">
              <div className="flex items-start gap-3 max-[1050px]:justify-center">
                <MapPin
                  className="mt-0.5 shrink-0 text-lavender"
                  size={16}
                  aria-hidden="true"
                />
                <span>{site.location}</span>
              </div>
              <a
                className="flex items-center gap-3 transition-colors hover:text-white max-[1050px]:justify-center"
                href={site.phoneHref}
              >
                <Phone
                  className="shrink-0 text-lavender"
                  size={16}
                  aria-hidden="true"
                />
                {site.phone}
              </a>
              <a
                className="flex items-start gap-3 break-all transition-colors hover:text-white max-[1050px]:justify-center"
                href={`mailto:${site.email}`}
              >
                <Mail
                  className="mt-0.5 shrink-0 text-lavender"
                  size={16}
                  aria-hidden="true"
                />
                {site.email}
              </a>
            </div>
            <div className="mt-7 flex gap-2.5 max-[1050px]:justify-center">
              <a
                className={socialClass}
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={text("global", "social.instagram", "Instagram")}
              >
                <FaInstagram size={19} aria-hidden="true" />
              </a>
              <a
                className={socialClass}
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label={text("global", "social.facebook", "Facebook")}
              >
                <FaFacebookF size={17} aria-hidden="true" />
              </a>
              <a
                className={socialClass}
                href={whatsappHref(site.whatsapp)}
                target="_blank"
                rel="noreferrer"
                aria-label={text("global", "social.whatsapp", "WhatsApp")}
              >
                <FaWhatsapp size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-[18px] border-t border-white/10 pt-[17px] text-[10px] text-white/40 max-[1050px]:flex-col max-[1050px]:items-center max-[1050px]:text-center">
          <span>
            {text("global", "footer.copyright", "© 2026 Imagen del Puerto")}
          </span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              className="transition-colors hover:text-white"
              href="/aviso-de-privacidad"
            >
              {text("global", "footer.privacy", "Aviso de privacidad")}
            </Link>
            <Link
              className="transition-colors hover:text-white"
              href="/terminos"
            >
              {text("global", "footer.terms", "Términos y condiciones")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
