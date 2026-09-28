import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { media } from "@/assets";
import { useCms } from "@/cms/CmsProvider";
import { CONTAINER } from "./constants";
export function BrandMark({
  inverse = false,
  imageClassName = "h-14 w-[94px] max-[680px]:h-12 max-[680px]:w-20",
  imagePosition = "object-left",
}: {
  inverse?: boolean;
  imageClassName?: string;
  imagePosition?: string;
}) {
  const { text, image } = useCms();
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label={text("global", "brand.homeLabel", "Imagen del Puerto, inicio")}
    >
      <img
        className={`${imageClassName} ${imagePosition} object-contain transition-[width,height] duration-300 ease-brand`}
        src={inverse ? image("global", "brand.logoWhite", media.logoWhite) : image("global", "brand.logoBlack", media.logoBlack)}
        alt={text("global", "brand.name", "Imagen del Puerto")}
      />
    </Link>
  );
}

export function Header() {
  const { site, text } = useCms();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const handleNavClick = () => {
    setOpen(false);
    setServicesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleMenu = () => {
    setOpen(current => {
      if (current) setServicesOpen(false);
      return !current;
    });
  };
  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const frame = window.requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        setServicesOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !navRef.current) return;
      const focusable = [
        menuButtonRef.current,
        ...Array.from(navRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ].filter((element): element is HTMLElement =>
        Boolean(element && window.getComputedStyle(element).visibility !== "hidden")
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-ink/95 shadow-[0_8px_30px_rgba(0,0,0,.14)]" : "bg-ink/25"}`}
    >
      <div
        className={`${CONTAINER} flex items-center justify-between transition-[min-height] duration-300 ${scrolled ? "min-h-[72px] max-[680px]:min-h-[66px]" : "min-h-[104px] max-[680px]:min-h-[86px]"}`}
      >
        <div className="relative z-[2]">
          <BrandMark
            inverse
            imageClassName={
              scrolled
                ? "h-12 w-[82px] max-[680px]:h-11 max-[680px]:w-[74px]"
                : "h-[70px] w-[118px] max-[680px]:h-[58px] max-[680px]:w-[98px]"
            }
          />
        </div>
        <nav
          id="primary-navigation"
          ref={navRef}
          className={`${open ? "max-[680px]:flex max-[680px]:animate-[lightbox-in_.25s_ease-out_both]" : "max-[680px]:hidden"} flex items-center gap-8 font-display text-[11px] font-medium uppercase tracking-[.08em] max-[900px]:gap-[19px] max-[680px]:fixed max-[680px]:inset-0 max-[680px]:z-[1] max-[680px]:h-[100dvh] max-[680px]:flex-col max-[680px]:items-center max-[680px]:justify-center max-[680px]:gap-0 max-[680px]:overflow-y-auto max-[680px]:overscroll-contain max-[680px]:bg-ink max-[680px]:px-7 max-[680px]:pt-[105px] max-[680px]:pb-[120px] max-[680px]:text-center max-[680px]:text-[15px] max-[680px]:tracking-[.12em]`}
          aria-label={text("global", "nav.aria", "Navegación principal")}
        >
          <Link
            className="opacity-[.74] transition-opacity hover:opacity-100 max-[680px]:p-[13px_8px]"
            href="/"
            onClick={handleNavClick}
          >
            {text("global", "nav.home", "Inicio")}
          </Link>
          <Link
            className="opacity-[.74] transition-opacity hover:opacity-100 max-[680px]:p-[13px_8px]"
            href="/nosotros"
            onClick={handleNavClick}
          >
            {text("global", "nav.about", "Nosotros")}
          </Link>
          <div className="group relative max-[680px]:flex max-[680px]:w-full max-[680px]:flex-col max-[680px]:items-center">
            <Link
              className="flex items-center gap-1.5 opacity-[.74] transition-opacity hover:opacity-100 max-[680px]:hidden"
              href="/servicios"
              onClick={handleNavClick}
            >
              {text("global", "nav.services", "Servicios")}
              <ChevronDown
                className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180 max-[680px]:hidden"
                size={13}
              />
            </Link>
            <button
              className="hidden cursor-pointer items-center gap-2 border-0 bg-transparent p-[13px_8px] font-display text-[15px] font-medium uppercase tracking-[.12em] text-white/75 max-[680px]:flex"
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="mobile-services-menu"
              onClick={() => setServicesOpen(current => !current)}
            >
              {text("global", "nav.services", "Servicios")}
              <ChevronDown
                className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                size={16}
              />
            </button>
            <div
              id="mobile-services-menu"
              className={`invisible absolute top-full left-1/2 w-60 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-[grid-template-rows,opacity,transform,visibility] duration-300 min-[681px]:group-hover:visible min-[681px]:group-hover:translate-y-0 min-[681px]:group-hover:opacity-100 min-[681px]:group-focus-within:visible min-[681px]:group-focus-within:translate-y-0 min-[681px]:group-focus-within:opacity-100 max-[680px]:static max-[680px]:grid max-[680px]:w-full max-[680px]:translate-x-0 max-[680px]:translate-y-0 max-[680px]:pt-0 ${servicesOpen ? "max-[680px]:visible max-[680px]:grid-rows-[1fr] max-[680px]:opacity-100" : "max-[680px]:invisible max-[680px]:grid-rows-[0fr] max-[680px]:opacity-0"}`}
            >
              <div className={`flex flex-col border-x border-b border-white/10 p-2 shadow-[0_18px_40px_rgba(0,0,0,.22)] backdrop-blur-xl transition-colors duration-300 ${scrolled ? "bg-ink/95" : "bg-ink/30"} max-[680px]:items-center max-[680px]:overflow-hidden max-[680px]:border-0 max-[680px]:bg-white/5 max-[680px]:px-5 max-[680px]:py-1 max-[680px]:shadow-none`}>
                <Link className="px-4 py-3 text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white" href="/servicios" onClick={handleNavClick}>
                  {text("global", "nav.allServices", "Todos los servicios")}
                </Link>
                <Link className="px-4 py-3 text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white" href="/servicios/rayos-x" onClick={handleNavClick}>
                  {text("global", "footer.xray", "Rayos X portátiles")}
                </Link>
                <Link className="px-4 py-3 text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white" href="/servicios/electrocardiogramas" onClick={handleNavClick}>
                  {text("global", "footer.ecg", "Electrocardiogramas")}
                </Link>
                <Link className="px-4 py-3 text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white" href="/servicios/poligrafia-respiratoria" onClick={handleNavClick}>
                  {text("global", "footer.respiratory", "Poligrafía respiratoria")}
                </Link>
                <Link className="px-4 py-3 text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white" href="/renta" onClick={handleNavClick}>
                  {text("global", "nav.rental", "Renta de equipo médico")}
                </Link>
              </div>
            </div>
          </div>
          <Link
            className="opacity-[.74] transition-opacity hover:opacity-100 max-[680px]:p-[13px_8px]"
            href="/galeria"
            onClick={handleNavClick}
          >
            {text("global", "nav.gallery", "Galería")}
          </Link>
          <Link
            className="opacity-[.74] transition-opacity hover:opacity-100 max-[680px]:p-[13px_8px]"
            href="/contacto"
            onClick={handleNavClick}
          >
            {text("global", "nav.contact", "Contacto")}
          </Link>
          <div className="absolute inset-x-0 bottom-9 hidden items-center justify-center gap-4 max-[680px]:flex">
            <a className="grid size-11 place-items-center rounded-full border border-white/25 text-lavender transition-colors hover:bg-white hover:text-ink" href={site.instagram} target="_blank" rel="noreferrer" aria-label={text("global", "social.instagram", "Instagram")}>
              <FaInstagram size={20} aria-hidden="true" />
            </a>
            <a className="grid size-11 place-items-center rounded-full border border-white/25 text-lavender transition-colors hover:bg-white hover:text-ink" href={site.facebook} target="_blank" rel="noreferrer" aria-label={text("global", "social.facebook", "Facebook")}>
              <FaFacebookF size={18} aria-hidden="true" />
            </a>
            <a className="grid size-11 place-items-center rounded-full border border-white/25 text-lavender transition-colors hover:bg-white hover:text-ink" href={site.whatsapp} target="_blank" rel="noreferrer" aria-label={text("global", "social.whatsapp", "WhatsApp")}>
              <FaWhatsapp size={21} aria-hidden="true" />
            </a>
          </div>
        </nav>
        <button
          ref={menuButtonRef}
          className="relative z-[2] hidden cursor-pointer border-0 bg-transparent p-[9px] text-white max-[680px]:block"
          aria-label={open ? text("global", "nav.closeMenu", "Cerrar menú") : text("global", "nav.openMenu", "Abrir menú")}
          aria-expanded={open}
          aria-controls="primary-navigation"
          type="button"
          onClick={toggleMenu}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
