export const SITE_URL = "https://imagendelpuerto.com";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/storage/icons/web-app-manifest-512x512.png`;

export type PageMetadata = {
  title: string;
  description: string;
  service?: string;
  hero?: string;
};

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "Imagen del Puerto | Inicio",
    description: "Rayos X portátiles, electrocardiogramas, poligrafía respiratoria y renta de equipo médico en Puerto Vallarta y Bahía de Banderas.",
    hero: "/storage/images/imagen-del-puerto-hero-optimized.webp",
  },
  "/servicios": {
    title: "Imagen del Puerto | Servicios",
    description: "Conoce nuestros estudios de diagnóstico a domicilio en Puerto Vallarta y Bahía de Banderas.",
  },
  "/servicios/rayos-x": {
    title: "Imagen del Puerto | Radiógrafias",
    description: "Radiografías digitales con equipo portátil, interpretación profesional y entrega digital de resultados.",
    service: "Rayos X portátiles a domicilio",
    hero: "/storage/images/traslado-equipo-rayos-x.webp",
  },
  "/servicios/electrocardiogramas": {
    title: "Imagen del Puerto | Electrocardiogramas",
    description: "Electrocardiograma de 12 derivaciones a domicilio con equipo portátil y reporte digital.",
    service: "Electrocardiogramas a domicilio",
    hero: "/storage/images/electrocardiografo.webp",
  },
  "/servicios/poligrafia-respiratoria": {
    title: "Imagen del Puerto | Poligrafía respiratoria",
    description: "Estudio respiratorio nocturno en casa con orientación para el uso del equipo y reporte digital.",
    service: "Poligrafía respiratoria a domicilio",
    hero: "/storage/images/imagen-del-puerto-contact-hero-optimized.webp",
  },
  "/renta": {
    title: "Imagen del Puerto | Renta",
    description: "Consulta disponibilidad de equipo médico para recuperación, movilidad y cuidado en casa.",
    service: "Renta de equipo médico",
    hero: "/storage/images/imagen-del-puerto-rental-hero-optimized.webp",
  },
  "/nosotros": {
    title: "Imagen del Puerto | Nosotros",
    description: "Conoce el enfoque humano y profesional de Imagen del Puerto para brindar diagnóstico médico a domicilio.",
  },
  "/galeria": {
    title: "Imagen del Puerto | Galeria",
    description: "Conoce nuestro equipo portátil y parte de la atención que llevamos hasta cada paciente.",
  },
  "/contacto": {
    title: "Imagen del Puerto | Contacto",
    description: "Solicita información sobre diagnóstico a domicilio y renta de equipo médico en Puerto Vallarta y Bahía de Banderas.",
    hero: "/storage/images/imagen-del-puerto-contact-hero-optimized.webp",
  },
  "/aviso-de-privacidad": {
    title: "Imagen del Puerto | Aviso de privacidad",
    description: "Consulta el aviso de privacidad de Imagen del Puerto.",
  },
  "/terminos": {
    title: "Imagen del Puerto | Términos y condiciones",
    description: "Consulta los términos y condiciones de uso de Imagen del Puerto.",
  },
};
