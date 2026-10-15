import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappHref } from "@/data";
import { useCms } from "@/cms/CmsProvider";
import { media } from "@/assets";
import { CONTAINER } from "@/components/layout/constants";

export { CONTAINER };

export const heroImage = media.hero;
export const heroAssets = {
  xray: media.xrayHero,
  ecg: media.ecgHero,
  rental: media.rentalHero,
  contact: media.contactHero,
  respiratory: media.contactHero,
};

export const SECTION_PAD =
  "py-[126px] max-[900px]:py-[88px] max-[680px]:py-[72px]";
export const SECTION_DARK = "bg-ink text-white";
export const BUTTON =
  "inline-flex min-h-[47px] items-center justify-center gap-2.5 rounded-full px-[19px] text-xs font-semibold transition-[transform,background,color,border-color] duration-200 ease-brand active:scale-[.97]";
export const TEXT_LINK =
  "inline-flex items-center gap-2 border-b border-charcoal/30 pb-[5px] text-xs font-semibold text-charcoal transition-[gap,border-color] duration-200 hover:gap-[13px] hover:border-charcoal";
export const FIELD_BORDER = "border-[rgb(66_62_73_/_18%)]";

export function coverStyle(
  image?: string,
  gradient?: string
): React.CSSProperties {
  return {
    backgroundImage:
      [gradient, image && `url(${image})`].filter(Boolean).join(", ") ||
      undefined,
  };
}
function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);
  return value;
}

export function AnimatedStat({
  value,
  label,
  suffix = "",
  className = "",
}: {
  value: number;
  label: React.ReactNode;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`border-l border-[rgb(66_62_73_/_17%)] pb-[25px] pl-[17px] max-[680px]:pl-2.5 ${className}`}
      ref={ref}
    >
      <strong className="block font-display text-[47px] font-medium tracking-[-.08em] text-rx-blue max-[680px]:text-4xl">
        {String(count).padStart(2, "0")}
        {suffix}
      </strong>
      <span className="block text-xs leading-[1.35] text-steel max-[680px]:text-[10px]">
        {label}
      </span>
    </div>
  );
}

export function RentalImageCarousel({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const { text } = useCms();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (
      images.length < 2 ||
      paused ||
      lightbox !== null ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const interval = window.setInterval(
      () => setActive(current => (current + 1) % images.length),
      3800
    );
    return () => window.clearInterval(interval);
  }, [images.length, lightbox, paused]);

  const navigateLightbox = (direction: -1 | 1) => {
    const next =
      ((lightbox ?? active) + direction + images.length) % images.length;
    setLightbox(next);
    setActive(next);
  };

  return (
    <div
      className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <button
        className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
        type="button"
        onClick={() => setLightbox(active)}
        aria-label={text(
          "global",
          "rentalGallery.open",
          "Ampliar fotografías de {producto}"
        ).replace("{producto}", name)}
      >
        {images.map((image, index) => (
          <img
            className={`absolute inset-0 size-full object-contain p-5 transition-[opacity,transform] duration-700 ease-brand ${index === active ? "scale-100 opacity-100" : "pointer-events-none scale-[.985] opacity-0"}`}
            src={image}
            alt={text(
              "global",
              "rentalGallery.imageAlt",
              "{producto}, vista {numero}"
            )
              .replace("{producto}", name)
              .replace("{numero}", String(index + 1))}
            loading="lazy"
            aria-hidden={index !== active}
            key={image}
          />
        ))}
      </button>
      <span className="pointer-events-none absolute top-[18px] left-5 z-[1] rounded-full bg-ink/80 px-2.5 py-1 text-[9px] font-semibold tracking-[.15em] text-white uppercase backdrop-blur-sm">
        {text("global", "rentalGallery.badge", "EQUIPO / RENTA")}
      </span>
      {images.length > 1 && (
        <div className="absolute bottom-4 z-[2] flex gap-2 rounded-full bg-white/85 px-3 py-2 shadow-sm backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              className={`size-2 rounded-full border-0 transition-[background-color,transform] duration-300 ${index === active ? "scale-125 bg-charcoal" : "bg-steel/35 hover:bg-steel"}`}
              type="button"
              aria-label={text(
                "global",
                "rentalGallery.showView",
                "Mostrar vista {numero} de {producto}"
              )
                .replace("{numero}", String(index + 1))
                .replace("{producto}", name)}
              onClick={() => setActive(index)}
              key={image}
            />
          ))}
        </div>
      )}
      {lightbox !== null && (
        <ImageLightbox
          image={images[lightbox]}
          alt={text(
            "global",
            "rentalGallery.expandedAlt",
            "{producto}, vista ampliada {numero}"
          )
            .replace("{producto}", name)
            .replace("{numero}", String(lightbox + 1))}
          onClose={() => setLightbox(null)}
          onPrevious={
            images.length > 1 ? () => navigateLightbox(-1) : undefined
          }
          onNext={images.length > 1 ? () => navigateLightbox(1) : undefined}
          position={`${lightbox + 1} / ${images.length}`}
        />
      )}
    </div>
  );
}

export function ImageLightbox({
  image,
  alt,
  onClose,
  onPrevious,
  onNext,
  position,
}: {
  image: string;
  alt: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  position?: string;
}) {
  const { text } = useCms();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const actionsRef = useRef({ onClose, onPrevious, onNext });
  actionsRef.current = { onClose, onPrevious, onNext };

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const app = document.getElementById("root");
    const previousInert = app?.inert ?? false;
    const frame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus()
    );
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") actionsRef.current.onClose();
      if (event.key === "ArrowLeft") actionsRef.current.onPrevious?.();
      if (event.key === "ArrowRight") actionsRef.current.onNext?.();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]"
        )
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
    const previousOverflow = document.body.style.overflow;
    if (app) app.inert = true;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      if (app) app.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, []);

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[1000] grid cursor-default place-items-center overflow-hidden bg-ink/95 p-[clamp(14px,4vw,48px)] backdrop-blur-md motion-safe:animate-[lightbox-in_.25s_ease-out_both]"
      role="dialog"
      aria-modal="true"
      aria-label={text(
        "global",
        "lightbox.dialog",
        "Vista ampliada de la imagen"
      )}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        className="absolute top-5 right-5 z-[2] grid size-11 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/50 text-white transition-transform hover:rotate-90 hover:bg-white hover:text-ink"
        type="button"
        aria-label={text("global", "lightbox.close", "Cerrar imagen")}
        onClick={event => {
          event.stopPropagation();
          onClose();
        }}
      >
        <X size={21} />
      </button>
      {onPrevious && (
        <button
          className="absolute left-4 z-[1] grid size-12 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/55 text-white shadow-[0_8px_24px_rgba(0,0,0,.18)] transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-brand hover:scale-[1.06] hover:border-white/70 hover:bg-white hover:text-ink hover:shadow-[0_12px_30px_rgba(0,0,0,.28)] active:scale-[.96] max-[680px]:left-2 max-[680px]:size-10"
          type="button"
          aria-label={text("global", "lightbox.previous", "Imagen anterior")}
          onClick={event => {
            event.stopPropagation();
            onPrevious();
          }}
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <div
        className="flex h-[min(82vh,820px)] w-[min(88vw,1180px)] cursor-default items-center justify-center overflow-hidden rounded-sm bg-white p-4 shadow-[0_28px_90px_rgba(0,0,0,.5)] max-[680px]:h-[76vh] max-[680px]:w-[82vw] max-[680px]:p-2"
        onClick={event => event.stopPropagation()}
      >
        <img
          key={image}
          className="block size-full object-contain motion-safe:animate-[lightbox-in_.22s_ease-out_both]"
          src={image}
          alt={alt}
        />
      </div>
      {onNext && (
        <button
          className="absolute right-4 z-[1] grid size-12 cursor-pointer place-items-center rounded-full border border-white/30 bg-ink/55 text-white shadow-[0_8px_24px_rgba(0,0,0,.18)] transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-brand hover:scale-[1.06] hover:border-white/70 hover:bg-white hover:text-ink hover:shadow-[0_12px_30px_rgba(0,0,0,.28)] active:scale-[.96] max-[680px]:right-2 max-[680px]:size-10"
          type="button"
          aria-label={text("global", "lightbox.next", "Imagen siguiente")}
          onClick={event => {
            event.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight size={24} />
        </button>
      )}
      {position && (
        <span className="absolute bottom-5 rounded-full bg-ink/60 px-3 py-1.5 text-[10px] tracking-[.12em] text-white/70">
          {position}
        </span>
      )}
    </div>,
    document.body
  );
}

export function ProgressiveImage({
  className = "",
  onLoad,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <span
          className="absolute inset-0 overflow-hidden bg-steel/15 after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.62),transparent)] motion-reduce:after:animate-none"
          aria-hidden="true"
        />
      )}
      <img
        {...props}
        className={`${className} transition-[opacity,transform] duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={event => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-[9px] font-sans text-[10px] font-semibold uppercase leading-[1.2] tracking-[.16em] ${light ? "text-lavender" : "text-rx-blue"}`}
    >
      <span className="inline-block size-1.5 rounded-full bg-current [box-shadow:0_0_0_4px_color-mix(in_srgb,currentColor_18%,transparent)]" />
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-[630px]">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`my-[22px_24px] font-display text-[clamp(42px,5.3vw,78px)] font-medium leading-[.97] tracking-[-.07em] max-[680px]:text-[clamp(39px,11vw,58px)] [&_i]:not-italic ${light ? "text-white [&_i]:text-lavender" : "text-charcoal [&_i]:text-rx-blue"}`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`m-0 max-w-[420px] leading-[1.7] ${light ? "text-white/60" : "text-steel"}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

export function WhatsAppButton({
  label,
  message,
}: {
  label?: string;
  message?: string;
}) {
  const { site, text } = useCms();
  const href = whatsappHref(site.whatsapp, message);
  return (
    <a
      className={`${BUTTON} bg-charcoal text-white hover:-translate-y-0.5 hover:bg-violet`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <FaWhatsapp size={18} aria-hidden="true" />
      {label ?? text("global", "whatsapp.button", "Hablar por WhatsApp")}
      <ArrowUpRight size={16} />
    </a>
  );
}
