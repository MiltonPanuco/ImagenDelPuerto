function image(name: string) {
  return `/storage/images/${name}`;
}

export const media = {
  hero: image("imagen-del-puerto-hero-optimized.webp"),
  equipment: image("imagen-del-puerto-equipment-optimized.webp"),
  xrayHero: image("traslado-equipo-rayos-x.webp"),
  ecgHero: image("electrocardiografo.webp"),
  rentalHero: image("imagen-del-puerto-rental-hero-optimized.webp"),
  contactHero: image("imagen-del-puerto-contact-hero-optimized.webp"),
  notFound: image("imagen-del-puerto-404.webp"),
  founder: image("especialista.webp"),
  logoWhite: image("logo-white.webp"),
  logoBlack: image("logo-black.webp"),
  logoFooter: image("logo-footer.webp"),
};

export const serviceImages = {
  xray: ["rx1.webp", "rx2.webp", "rx3.webp", "rx4.webp", "rx5.webp"].map(image),
  ecg: [
    "electro1.webp",
    "electro2.webp",
    "electro3.webp",
    "electro4.webp",
    "electro5.webp",
  ].map(image),
};

export const equipmentImages = {
  bed: [
    "camilla-1.webp",
    "camilla-2.webp",
    "camilla-3.webp",
    "camilla-4.webp",
  ].map(image),
  oxygen: [
    "concentrador-1.webp",
    "concentrador-2.webp",
    "concentrador-3.webp",
  ].map(image),
  wheelchair: [
    "sillaestandar-1.webp",
    "sillaestandar-2.webp",
    "sillaestandar-3.webp",
  ].map(image),
  bariatric: ["sillabariatrica-1.webp"].map(image),
  elevated: [
    "sillaelevapiernas-1.webp",
    "sillaelevapiernas-2.webp",
    "sillaelevapiernas-3.webp",
  ].map(image),
  crutches: [
    "muleta-1.webp",
    "muleta-2.webp",
    "muleta-3.webp",
    "muleta-4.webp",
  ].map(image),
};

export const galleryImages = [
  "promocion-estudios-domicilio.webp",
  "promocion-estudio-sueno.webp",
  "recuerdos-1.webp",
  "recuerdos-2.webp",
  "recuerdos-3.webp",
  "recuerdos-4.webp",
  "recuerdos-5.webp",
  "recuerdos-6.webp",
  "recuerdos-7.webp",
  "recuerdos-8.webp",
  "recuerdos-9.webp",
].map(image);
