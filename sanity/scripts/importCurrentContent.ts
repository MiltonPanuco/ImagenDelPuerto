import { createReadStream, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";
import { audiences, faqs, process as processSteps, rentals, services, site } from "../../client/src/data";
import { equipmentImages, galleryImages, media, serviceImages } from "../../client/src/assets";

type Entry = {
  _key: string;
  _type: "contentEntry";
  key: string;
  label: string;
  kind: "text" | "longText" | "url" | "image" | "markdown";
  value?: string;
  source?: string;
  alt?: string;
  image?: { _type: "image"; asset: { _type: "reference"; _ref: string }; alt?: string };
};

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const client = getCliClient({ apiVersion: "2026-09-01" });
const dryRun = process.argv.includes("--dry-run");
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const argument = (name: string) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const keyFor = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 96);
const text = (key: string, label: string, value: string, kind: Entry["kind"] = "text"): Entry => ({
  _key: keyFor(key), _type: "contentEntry", key, label, kind, value,
});
const image = (key: string, label: string, source: string, alt: string): Entry => ({
  _key: keyFor(key), _type: "contentEntry", key, label, kind: "image", source, alt,
});
const page = (name: string, entries: Entry[]) => ({
  _id: `page-${name}`,
  _type: "pageContent",
  page: name,
  entries,
});

const privacy = readFileSync(join(root, "client", "src", "content", "privacy.md"), "utf8");
const terms = readFileSync(join(root, "client", "src", "content", "terms.md"), "utf8");

const pages = [
  page("global", [
    text("brand.name", "Marca · Nombre", "Imagen del Puerto"),
    text("brand.areaServed", "Marca · Áreas de servicio", "Puerto Vallarta\nBahía de Banderas"),
    text("brand.homeLabel", "Marca · Enlace de inicio", "Imagen del Puerto, inicio"),
    image("brand.logoWhite", "Marca · Logo claro", media.logoWhite, "Imagen del Puerto"),
    image("brand.logoBlack", "Marca · Logo oscuro", media.logoBlack, "Imagen del Puerto"),
    text("nav.home", "Navegación · Inicio", "Inicio"),
    text("nav.about", "Navegación · Nosotros", "Nosotros"),
    text("nav.services", "Navegación · Servicios", "Servicios"),
    text("nav.allServices", "Navegación · Todos los servicios", "Todos los servicios"),
    text("nav.rental", "Navegación · Renta", "Renta de equipo médico"),
    text("nav.gallery", "Navegación · Galería", "Galería"),
    text("nav.contact", "Navegación · Contacto", "Contacto"),
    text("nav.openMenu", "Accesibilidad · Abrir menú", "Abrir menú"),
    text("nav.closeMenu", "Accesibilidad · Cerrar menú", "Cerrar menú"),
    text("nav.aria", "Accesibilidad · Navegación principal", "Navegación principal"),
    text("footer.services", "Footer · Título servicios", "Servicios"),
    text("footer.about", "Footer · Título conócenos", "Conócenos"),
    text("footer.contact", "Footer · Título contacto", "Contacto"),
    text("footer.rental", "Footer · Renta", "Renta de equipo"),
    text("footer.xray", "Footer · Rayos X", "Rayos X portátiles"),
    text("footer.ecg", "Footer · Electrocardiogramas", "Electrocardiogramas"),
    text("footer.respiratory", "Footer · Poligrafía", "Poligrafía respiratoria"),
    text("footer.privacy", "Footer · Aviso de privacidad", "Aviso de privacidad"),
    text("footer.terms", "Footer · Términos", "Términos y condiciones"),
    text("footer.copyright", "Footer · Copyright", "© 2026 Imagen del Puerto"),
    image("footer.logo", "Footer · Logo", "/storage/images/logo-footer.webp", "Imagen del Puerto"),
    text("process.eyebrow", "Proceso · Etiqueta", "Cómo funciona"),
    text("process.title", "Proceso · Título", "Tres pasos.\nCero complicaciones."),
    text("process.body", "Proceso · Descripción", "Escríbenos y coordinamos contigo la atención que necesitas.", "longText"),
    text("quote.text", "Cita · Texto", "Lo profesional también puede sentirse\ncercano."),
    text("quote.caption", "Cita · Descripción", "Atención médica móvil\nPuerto Vallarta y Bahía de Banderas"),
    text("faq.eyebrow", "FAQ · Etiqueta", "Preguntas frecuentes"),
    text("faq.title", "FAQ · Título", "Lo que quieras\nsaber antes."),
    text("cta.eyebrow", "CTA final · Etiqueta", "Estamos para ayudarte"),
    text("cta.title", "CTA final · Título", "Hablemos de lo\nque necesitas."),
    text("cta.body", "CTA final · Descripción", "Atención profesional en Puerto Vallarta y Bahía de Banderas."),
    text("cta.button", "CTA final · Botón", "Escribir por WhatsApp"),
    text("whatsapp.floatingLabel", "WhatsApp flotante · Accesibilidad", "Contactar por WhatsApp"),
    text("whatsapp.button", "WhatsApp · Botón genérico", "Hablar por WhatsApp"),
    text("rentalGallery.open", "Renta · Abrir galería", "Ampliar fotografías de {producto}"),
    text("rentalGallery.imageAlt", "Renta · Texto alternativo", "{producto}, vista {numero}"),
    text("rentalGallery.badge", "Renta · Etiqueta de imagen", "EQUIPO / RENTA"),
    text("rentalGallery.showView", "Renta · Seleccionar vista", "Mostrar vista {numero} de {producto}"),
    text("rentalGallery.expandedAlt", "Renta · Vista ampliada", "{producto}, vista ampliada {numero}"),
    text("social.instagram", "Redes · Instagram", "Instagram"),
    text("social.facebook", "Redes · Facebook", "Facebook"),
    text("social.whatsapp", "Redes · WhatsApp", "WhatsApp"),
    text("footer.servicesAria", "Pie · Accesibilidad servicios", "Servicios en el pie de página"),
    text("footer.secondaryAria", "Pie · Accesibilidad navegación", "Navegación secundaria del pie de página"),
    text("lightbox.dialog", "Galería ampliada · Accesibilidad", "Vista ampliada de la imagen"),
    text("lightbox.close", "Galería ampliada · Cerrar", "Cerrar imagen"),
    text("lightbox.previous", "Galería ampliada · Anterior", "Imagen anterior"),
    text("lightbox.next", "Galería ampliada · Siguiente", "Imagen siguiente"),
    text("loading.label", "Carga · Accesibilidad", "Cargando página"),
    text("error.title", "Error · Título", "Ocurrió un error inesperado."),
    text("error.reload", "Error · Botón", "Recargar página"),
  ]),
  page("home", [
    image("hero.image", "Hero · Imagen", media.hero, "Atención de Imagen del Puerto"),
    text("hero.coordinates", "Hero · Coordenadas", "20°39' N\n105°13' W"),
    text("hero.brand", "Hero · Marca", "IMAGEN DEL PUERTO"),
    text("hero.code", "Hero · Código", "MEDICAL IMAGING / 01"),
    text("hero.title", "Hero · Título", "Diagnóstico\ny equipo médico\nhasta tu hogar."),
    text("hero.body", "Hero · Descripción", "Rayos X, electrocardiogramas, poligrafía respiratoria y renta de equipo médico con atención profesional, rápida y personalizada.", "longText"),
    text("hero.side", "Hero · Texto lateral", "PRECISIÓN\nA TU PUERTA"),
    text("services.eyebrow", "Servicios · Etiqueta", "Servicios de diagnóstico"),
    text("services.title", "Servicios · Título", "Tecnología que se mueve contigo."),
    text("services.titlePrefix", "Servicios · Inicio del título", "Tecnología que "),
    text("services.titleAccent", "Servicios · Texto destacado", "se mueve contigo."),
    text("services.body", "Servicios · Descripción", "Estudios portátiles para llevar información clara a donde más la necesitas.", "longText"),
    text("services.linkAria", "Servicios · Accesibilidad de enlace", "Ver {servicio}"),
    text("rental.eyebrow", "Renta · Etiqueta", "Equipo médico en renta"),
    text("rental.title", "Renta · Título", "Apoyo para\ncada etapa."),
    text("rental.body", "Renta · Descripción", "Equipo confiable para acompañar la recuperación, el cuidado y la movilidad.", "longText"),
    text("rental.button", "Renta · Botón superior", "Ver catálogo completo"),
    image("rental.image", "Renta · Imagen", media.equipment, "Equipo médico en renta"),
    text("rental.imageEyebrow", "Renta · Etiqueta de imagen", "EQUIPO MÉDICO / 02"),
    text("rental.imageTitle", "Renta · Título de imagen", "Lo que necesitas\ncuando lo necesitas."),
    text("rental.imageButton", "Renta · Botón de imagen", "Explorar catálogo"),
    text("audiences.eyebrow", "Audiencias · Etiqueta", "Para quiénes trabajamos"),
    text("audiences.title", "Audiencias · Título", "Cuidado que entiende\ndistintos caminos."),
    text("gallery.eyebrow", "Galería · Etiqueta", "Una mirada al servicio"),
    text("gallery.title", "Galería · Título", "Precisión en cada\ndetalle."),
    text("gallery.button", "Galería · Botón", "Ver galería"),
    image("gallery.primaryImage", "Galería · Atención a domicilio", media.hero, "Atención a domicilio"),
    text("gallery.primaryLabel", "Galería · Etiqueta atención", "Atención a domicilio"),
    text("gallery.primaryAria", "Galería · Accesibilidad atención", "Ampliar imagen de atención a domicilio"),
    image("gallery.secondaryImage", "Galería · Equipo de diagnóstico", galleryImages[0], "Equipo de diagnóstico"),
    text("gallery.secondaryLabel", "Galería · Etiqueta equipo", "Equipo de diagnóstico"),
    text("gallery.secondaryAria", "Galería · Accesibilidad equipo", "Ampliar imagen del equipo de diagnóstico"),
    image("gallery.tertiaryImage", "Galería · Atención profesional", serviceImages.ecg[2], "Atención profesional"),
    text("gallery.tertiaryLabel", "Galería · Etiqueta profesional", "Atención profesional"),
    text("gallery.tertiaryAria", "Galería · Accesibilidad profesional", "Ampliar imagen de atención profesional"),
    text("gallery.lightboxAlt", "Galería · Vista ampliada", "Imagen ampliada de Imagen del Puerto"),
  ]),
  page("about", [
    image("hero.image", "Hero · Imagen", media.hero, "Imagen del Puerto"),
    text("hero.eyebrow", "Hero · Etiqueta", "Nuestra historia"),
    text("hero.title", "Hero · Título", "Cuidado que llega\nhasta tu hogar."),
    text("hero.body", "Hero · Descripción", "Diagnóstico y equipo médico a domicilio en Puerto Vallarta y Bahía de Banderas.", "longText"),
    text("hero.location", "Hero · Ubicación", "Puerto Vallarta · Bahía de Banderas"),
    image("founder.image", "Fundador · Fotografía", media.founder, "Lic. Fidel Correa Rodríguez, fundador de Imagen del Puerto"),
    text("founder.imageAlt", "Fundador · Texto alternativo", "Lic. Fidel Correa Rodríguez, fundador de Imagen del Puerto"),
    text("founder.name", "Fundador · Nombre", "Lic. Fidel Correa Rodríguez"),
    text("founder.role", "Fundador · Cargo", "Licenciado en Radiología"),
    text("founder.eyebrow", "Fundador · Etiqueta", "Una historia de cuidado y compromiso"),
    text("founder.title", "Fundador · Título completo", "Ayudar sin pedirle al paciente un esfuerzo más."),
    text("founder.titlePrefix", "Fundador · Inicio del título", "Ayudar sin pedirle al paciente un"),
    text("founder.titleAccent", "Fundador · Texto destacado", "esfuerzo más."),
    text("founder.paragraph1", "Fundador · Párrafo 1", "Todo comenzó con un deseo simple: ayudar a quienes enfrentan la dificultad de trasladarse a un centro médico. Adultos mayores, familias y pacientes que necesitan atención confiable inspiraron una forma más cercana de cuidar.", "longText"),
    text("founder.paragraph2", "Fundador · Párrafo 2", "Así nació Imagen del Puerto: llevamos rayos X, electrocardiogramas, poligrafía respiratoria y equipo médico hasta el hogar para que recibir atención de calidad sea un alivio, no un sacrificio.", "longText"),
    text("founder.quote", "Fundador · Cita", "“Tu salud y comodidad, nuestra prioridad.”"),
    text("stats.1", "Estadística 1", "10|+|Años de experiencia"),
    text("stats.2", "Estadística 2", "500|+|Pacientes atendidos"),
    text("stats.3", "Estadística 3", "24|/7|Atención y coordinación"),
    text("commitments.eyebrow", "Compromisos · Etiqueta", "Nuestro compromiso"),
    text("commitments.title", "Compromisos · Título", "Respuestas claras.\nCuidado oportuno."),
    text("commitments.body", "Compromisos · Descripción", "Coordinamos cada servicio con cercanía y mantenemos informado al paciente en cada paso.", "longText"),
    text("commitments.1", "Compromiso 1", "Atención 24/7|Cuando necesitas orientación|Disponibles para solicitudes urgentes y citas programadas. Ante una emergencia que ponga en riesgo la vida, llama al 911."),
    text("commitments.2", "Compromiso 2", "Radiografías|Resultados en 24 horas|Entrega digital e interpretación realizada por radiólogos certificados."),
    text("commitments.3", "Compromiso 3", "Electrocardiogramas|Información clara y oportuna|Interpretación cardiológica y reportes digitales para facilitar el seguimiento médico."),
  ]),
  page("services", [
    image("hero.image", "Hero · Imagen", media.equipment, "Servicios de Imagen del Puerto"),
    text("hero.title", "Hero · Título", "Diagnóstico y cuidado,\nmás cerca de ti."),
    text("hero.body", "Hero · Descripción", "Una solución clara para estudios a domicilio y equipo médico en Puerto Vallarta y Bahía de Banderas.", "longText"),
    text("list.eyebrow", "Listado · Etiqueta", "Todo en un solo lugar"),
    text("list.title", "Listado · Título", "Servicios pensados\npara la vida real."),
    text("list.body", "Listado · Descripción", "Elige el servicio que necesitas y consulta disponibilidad directamente por WhatsApp.", "longText"),
    text("cards.1.eyebrow", "Tarjeta Rayos X · Etiqueta", "Diagnóstico / 01"),
    text("cards.1.title", "Tarjeta Rayos X · Título", "Rayos X portátiles"),
    text("cards.1.body", "Tarjeta Rayos X · Descripción", "Estudios radiológicos digitales realizados donde el paciente los necesita, con entrega digital e interpretación profesional.", "longText"),
    text("cards.1.action", "Tarjeta Rayos X · Botón", "Conocer Rayos X"),
    text("cards.2.eyebrow", "Tarjeta ECG · Etiqueta", "Diagnóstico / 02"),
    text("cards.2.title", "Tarjeta ECG · Título", "Electrocardiogramas"),
    text("cards.2.body", "Tarjeta ECG · Descripción", "ECG de 12 derivaciones con equipo portátil, reporte detallado e interpretación médica.", "longText"),
    text("cards.2.action", "Tarjeta ECG · Botón", "Conocer ECG"),
    text("cards.3.eyebrow", "Tarjeta poligrafía · Etiqueta", "Diagnóstico / 03"),
    text("cards.3.title", "Tarjeta poligrafía · Título", "Poligrafía respiratoria"),
    text("cards.3.body", "Tarjeta poligrafía · Descripción", "Estudio respiratorio nocturno realizado en casa con equipo portátil, reporte digital y acompañamiento para su correcta colocación.", "longText"),
    text("cards.3.action", "Tarjeta poligrafía · Botón", "Conocer poligrafía"),
    text("cards.4.eyebrow", "Tarjeta renta · Etiqueta", "Cuidado / 04"),
    text("cards.4.title", "Tarjeta renta · Título", "Renta de equipo médico"),
    text("cards.4.body", "Tarjeta renta · Descripción", "Camas hospitalarias, concentradores de oxígeno, sillas de ruedas y apoyos para recuperación en casa.", "longText"),
    text("cards.4.action", "Tarjeta renta · Botón", "Explorar equipo"),
    image("cards.4.image", "Tarjeta renta · Imagen", media.rentalHero, "Renta de equipo médico"),
    image("coverage.image", "Cobertura · Imagen", media.contactHero, "Atención médica de Imagen del Puerto a domicilio"),
    text("coverage.imageAlt", "Cobertura · Texto alternativo", "Atención médica de Imagen del Puerto a domicilio"),
    text("coverage.caption", "Cobertura · Pie de imagen", "Puerto Vallarta · Bahía de Banderas"),
    text("coverage.eyebrow", "Cobertura · Etiqueta", "Atención coordinada"),
    text("coverage.title", "Cobertura · Título", "Llegamos hasta\ndonde estás."),
    text("coverage.body", "Cobertura · Descripción", "Coordinamos cada estudio de acuerdo con la ubicación, las necesidades del paciente y la disponibilidad del equipo.", "longText"),
    text("coverage.items", "Cobertura · Características", "Atención en hogares, consultorios y clínicas\nCobertura en Puerto Vallarta y Bahía de Banderas\nEquipo portátil y reportes digitales\nOrientación clara antes de cada servicio", "longText"),
  ]),
  page("serviceDetail", [
    text("back", "Botón volver", "← Volver a servicios"),
    text("includes.eyebrow", "Incluye · Etiqueta", "Qué incluye"),
    text("includes.title", "Incluye · Título", "Información\nclara."),
    text("process.eyebrow", "Proceso · Etiqueta", "Así funciona"),
    text("process.title", "Proceso · Título", "Un proceso sencillo.\nBien acompañado."),
    text("process.body", "Proceso · Descripción", "Te explicamos qué esperar antes, durante y después del estudio."),
    text("gallery.eyebrow", "Galería · Etiqueta", "El servicio de cerca"),
    text("gallery.title", "Galería · Título", "Tecnología portátil.\nAtención humana."),
    text("gallery.body", "Galería · Descripción", "Conoce parte del equipo y del trabajo que llevamos hasta cada paciente."),
    text("gallery.caption", "Galería · Pie de foto", "Imagen del Puerto"),
    text("gallery.openAria", "Galería · Abrir fotografía", "Ampliar fotografía {numero} de {servicio}"),
    text("gallery.imageAlt", "Galería · Texto alternativo", "{servicio}, imagen {numero}"),
    text("gallery.expandedAlt", "Galería · Vista ampliada", "Vista ampliada de {servicio}"),
  ]),
  page("rental", [
    image("hero.image", "Hero · Imagen", media.rentalHero, "Equipo médico en renta"),
    text("hero.title", "Hero · Título", "Equipo para\ncuidar mejor."),
    text("hero.body", "Hero · Descripción", "Consulta disponibilidad y encuentra el apoyo que necesitas para tu recuperación o cuidado en casa.", "longText"),
    text("search.label", "Buscador · Accesibilidad", "Buscar en el catálogo"),
    text("search.placeholder", "Buscador · Placeholder", "Buscar equipo médico..."),
    text("filters.label", "Filtros · Etiqueta", "Filtrar por categoría"),
    text("filters.categories", "Filtros · Categorías", "Todos\nMovilidad\nRespiratorio\nMovilidad y cuidado"),
    text("card.button", "Producto · Botón", "Consultar disponibilidad"),
    text("card.message", "Producto · Mensaje de WhatsApp", "Hola, deseo consultar disponibilidad de {producto}."),
    text("empty.message", "Sin resultados · Mensaje", "No encontramos equipo con esa búsqueda."),
    text("empty.button", "Sin resultados · Botón", "Limpiar filtros"),
  ]),
  page("gallery", [
    image("hero.image", "Hero · Imagen", galleryImages[6], "Galería Imagen del Puerto"),
    text("hero.title", "Hero · Título", "Historias reales.\nTrabajo preciso."),
    text("hero.body", "Hero · Descripción", "Una mirada al equipo, los estudios y la atención que llevamos a distintos espacios de Puerto Vallarta y Bahía de Banderas.", "longText"),
    text("content.eyebrow", "Contenido · Etiqueta", "Nuestro trabajo"),
    text("content.title", "Contenido · Título", "Cada imagen guarda\nuna historia."),
    text("content.body", "Contenido · Descripción", "Fotografías de servicios, equipo y experiencias compartidas por Imagen del Puerto.", "longText"),
    text("image.caption", "Imagen · Pie", "Imagen del Puerto · Puerto Vallarta y Bahía de Banderas"),
    text("image.alt", "Imagen · Texto alternativo", "Galería Imagen del Puerto"),
    text("lightbox.alt", "Vista ampliada · Texto alternativo", "Fotografía ampliada de Imagen del Puerto"),
    text("image.openAria", "Imagen · Abrir fotografía", "Ampliar imagen {numero} de la galería"),
  ]),
  page("contact", [
    image("hero.image", "Hero · Imagen", media.contactHero, "Contacto Imagen del Puerto"),
    text("hero.title", "Hero · Título", "Cuéntanos\nqué necesitas."),
    text("hero.body", "Hero · Descripción", "Atendemos Puerto Vallarta y Bahía de Banderas para orientarte sobre servicios de diagnóstico y equipo médico.", "longText"),
    text("channels.eyebrow", "Canales · Etiqueta", "Canales directos"),
    text("channels.title", "Canales · Título", "Hablemos\nsin rodeos."),
    text("channels.whatsapp", "Canales · WhatsApp", "WhatsApp"),
    text("channels.phone", "Canales · Teléfono", "Teléfono"),
    text("channels.email", "Canales · Correo", "Correo"),
    text("channels.location", "Canales · Ubicación", "Ubicación"),
    text("form.aria", "Formulario · Accesibilidad", "Solicitar información por WhatsApp"),
    text("form.eyebrow", "Formulario · Etiqueta", "FORMULARIO GENERAL"),
    text("form.name", "Formulario · Nombre", "Nombre"),
    text("form.namePlaceholder", "Formulario · Placeholder nombre", "Tu nombre"),
    text("form.contact", "Formulario · Contacto", "Teléfono o correo"),
    text("form.contactPlaceholder", "Formulario · Placeholder contacto", "¿Cómo te contactamos?"),
    text("form.service", "Formulario · Servicio", "Servicio de interés"),
    text("form.servicePlaceholder", "Formulario · Selección inicial", "Selecciona una opción"),
    text("form.message", "Formulario · Mensaje", "Mensaje general"),
    text("form.messagePlaceholder", "Formulario · Placeholder mensaje", "Cuéntanos brevemente cómo podemos ayudarte."),
    text("form.privacyPrefix", "Formulario · Consentimiento inicial", "He leído el "),
    text("form.privacyLink", "Formulario · Enlace de privacidad", "aviso de privacidad"),
    text("form.privacySuffix", "Formulario · Consentimiento final", " y entiendo que este formulario es únicamente para contacto general.", "longText"),
    text("form.submit", "Formulario · Botón", "Enviar por WhatsApp"),
    text("form.help", "Formulario · Ayuda", "Este formulario no sustituye servicios de emergencia. No compartas datos médicos sensibles.", "longText"),
    text("form.template", "Formulario · Plantilla WhatsApp", "Hola, soy {nombre}.\nServicio de interés: {servicio}\nMi contacto: {contacto}\n\n{mensaje}", "longText"),
  ]),
  page("legal", [
    text("updated", "Fecha de actualización", "Última actualización: 25 de septiembre de 2026"),
    text("privacy.title", "Privacidad · Título", "Aviso de privacidad"),
    text("privacy.intro", "Privacidad · Introducción", "Este aviso explica de forma clara cómo utilizamos la información que compartes al ponerte en contacto con nosotros.", "longText"),
    text("privacy.markdown", "Privacidad · Documento", privacy, "markdown"),
    text("terms.title", "Términos · Título", "Términos y condiciones"),
    text("terms.intro", "Términos · Introducción", "Estas condiciones establecen el uso responsable del sitio y el alcance de la información publicada por Imagen del Puerto.", "longText"),
    text("terms.markdown", "Términos · Documento", terms, "markdown"),
  ]),
  page("notFound", [
    image("image", "Imagen 404", media.notFound, "Página 404, no pudimos encontrar lo que buscabas"),
    text("imageAlt", "Imagen 404 · Texto alternativo", "Página 404, no pudimos encontrar lo que buscabas"),
    text("title", "Título accesible", "Página no encontrada"),
    text("button", "Botón", "Volver al inicio"),
  ]),
  page("seo", [
    text("home", "SEO · Inicio", "Servicios médicos a domicilio en Puerto Vallarta | Imagen del Puerto|Rayos X portátiles, electrocardiogramas, poligrafía respiratoria y renta de equipo médico en Puerto Vallarta y Bahía de Banderas."),
    text("services", "SEO · Servicios", "Servicios médicos a domicilio | Imagen del Puerto|Conoce nuestros estudios de diagnóstico a domicilio en Puerto Vallarta y Bahía de Banderas."),
    text("xray", "SEO · Rayos X", "Rayos X a domicilio en Puerto Vallarta | Imagen del Puerto|Radiografías digitales con equipo portátil, interpretación profesional y entrega digital de resultados."),
    text("ecg", "SEO · Electrocardiogramas", "Electrocardiogramas a domicilio | Imagen del Puerto|Electrocardiograma de 12 derivaciones a domicilio con equipo portátil y reporte digital."),
    text("respiratory", "SEO · Poligrafía", "Poligrafía respiratoria a domicilio | Imagen del Puerto|Estudio respiratorio nocturno en casa con orientación para el uso del equipo y reporte digital."),
    text("rental", "SEO · Renta", "Renta de equipo médico en Puerto Vallarta | Imagen del Puerto|Consulta disponibilidad de equipo médico para recuperación, movilidad y cuidado en casa."),
    text("about", "SEO · Nosotros", "Nosotros | Imagen del Puerto|Conoce el enfoque humano y profesional de Imagen del Puerto para brindar diagnóstico médico a domicilio."),
    text("gallery", "SEO · Galería", "Galería | Imagen del Puerto|Conoce nuestro equipo portátil y parte de la atención que llevamos hasta cada paciente."),
    text("contact", "SEO · Contacto", "Contacto | Imagen del Puerto|Solicita información sobre diagnóstico a domicilio y renta de equipo médico en Puerto Vallarta y Bahía de Banderas."),
    text("privacy", "SEO · Privacidad", "Aviso de privacidad | Imagen del Puerto|Consulta el aviso de privacidad de Imagen del Puerto."),
    text("terms", "SEO · Términos", "Términos y condiciones | Imagen del Puerto|Consulta los términos y condiciones de uso de Imagen del Puerto."),
    text("notFound", "SEO · Página no encontrada", "Página no encontrada | Imagen del Puerto|La página solicitada no existe o cambió de ubicación."),
  ]),
];

const experience = {
  "rayos-x": { eyebrow: "Radiología móvil", title: "Precisión desde la primera visita.", note: "Nuestro equipo portátil permite realizar distintas proyecciones sin trasladar al paciente.", steps: [["01", "Coordinación", "Confirmamos el tipo de estudio, ubicación y condiciones del paciente."], ["02", "Toma del estudio", "Realizamos las proyecciones necesarias con equipo digital portátil."], ["03", "Resultados", "Entregamos imágenes digitales e interpretación radiológica en aproximadamente 24 horas."]], images: serviceImages.xray.slice(0, 3) },
  electrocardiogramas: { eyebrow: "Evaluación cardiaca", title: "Un registro cómodo y confiable.", note: "El ECG de 12 derivaciones se realiza con el paciente en reposo y sin procedimientos invasivos.", steps: [["01", "Preparación", "Explicamos el procedimiento y preparamos al paciente para obtener un registro claro."], ["02", "Registro", "Colocamos los electrodos y realizamos el electrocardiograma con equipo portátil."], ["03", "Reporte", "Compartimos el reporte digital con interpretación cardiológica para su seguimiento."]], images: serviceImages.ecg.slice(0, 3) },
  "poligrafia-respiratoria": { eyebrow: "Estudio respiratorio nocturno", title: "Tu descanso también cuenta una historia.", note: "La poligrafía registra variables respiratorias durante el sueño sin necesidad de pasar la noche en una clínica.", steps: [["01", "Orientación", "Explicamos el uso del equipo y resolvemos dudas antes del registro."], ["02", "Noche de estudio", "El paciente duerme en casa mientras el equipo registra las variables respiratorias."], ["03", "Procesamiento", "Recuperamos la información y coordinamos la entrega del reporte digital."]], images: [media.contactHero, galleryImages[0], media.equipment] },
} as const;

const localPath = (source: string) => join(root, "client", "public", source.replace(/^\//, ""));
const assetCache = new Map<string, string>();
async function asset(source: string) {
  if (assetCache.has(source)) return assetCache.get(source)!;
  const filename = basename(source);
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );
  const id = existing || (await client.assets.upload("image", createReadStream(localPath(source)), { filename }))._id;
  assetCache.set(source, id);
  return id;
}
const imageValue = async (source: string, alt?: string) => ({
  _type: "image" as const,
  asset: { _type: "reference" as const, _ref: await asset(source) },
  ...(alt ? { alt } : {}),
});

async function hydratePage(document: ReturnType<typeof page>) {
  const entries = await Promise.all(document.entries.map(async (entry) => {
    if (!entry.source) return entry;
    const { source, alt, ...rest } = entry;
    return { ...rest, image: await imageValue(source, alt) };
  }));
  return { ...document, entries };
}

async function documents(): Promise<Array<Record<string, unknown> & { _id: string; _type: string }>> {
  const hydratedPages = await Promise.all(pages.map(hydratePage));
  const serviceDocs = await Promise.all(services.map(async (item, index) => {
    const details = experience[item.slug as keyof typeof experience];
    const hero = item.slug === "rayos-x" ? media.xrayHero : item.slug === "electrocardiogramas" ? media.ecgHero : media.contactHero;
    return {
      _id: `service-${item.slug}`, _type: "service", name: item.title.replace("\n", " "), number: item.number,
      title: item.title, slug: { _type: "slug", current: item.slug }, summary: item.short, description: item.detail,
      characteristics: item.bullets, whatsappMessage: item.message, icon: item.icon, accent: item.accent,
      image: await imageValue(hero, item.title.replace("\n", " ")),
      gallery: await Promise.all(details.images.map((source) => imageValue(source))),
      experienceEyebrow: details.eyebrow, experienceTitle: details.title, experienceNote: details.note,
      steps: details.steps.map(([number, title, body], step) => ({ _key: `step-${step + 1}`, _type: "object", number, title, body })),
      order: index, published: true,
    };
  }));
  const rentalDocs = await Promise.all(rentals.map(async (item, index) => ({
    _id: `rental-${keyFor(item.name.toLowerCase())}`, _type: "rentalProduct", name: item.name,
    slug: { _type: "slug", current: keyFor(item.name.toLowerCase()) }, category: item.category,
    description: item.note, images: await Promise.all(equipmentImages[item.image as keyof typeof equipmentImages].map((source) => imageValue(source))),
    imageKey: item.image, available: true, featured: index < 3, order: index,
  })));
  const gallerySources = [...galleryImages, ...serviceImages.xray, ...serviceImages.ecg];
  const galleryDocs = await Promise.all(gallerySources.map(async (source, index) => ({
    _id: `gallery-${index + 1}`, _type: "galleryItem", title: `Galería Imagen del Puerto ${index + 1}`,
    category: index < galleryImages.length ? "Recuerdos" : index < galleryImages.length + serviceImages.xray.length ? "Rayos X" : "Electrocardiogramas",
    description: "Imagen del Puerto · Puerto Vallarta y Bahía de Banderas",
    image: await imageValue(source, `Galería Imagen del Puerto ${index + 1}`), order: index, published: true,
  })));
  return [
    ...hydratedPages,
    { _id: "site-settings", _type: "siteSettings", businessName: "Imagen del Puerto", ...site, footerLogo: await imageValue("/storage/images/logo-footer.webp", "Imagen del Puerto"), copyright: "© 2026 Imagen del Puerto" },
    ...serviceDocs,
    ...rentalDocs,
    ...audiences.map(([number, name, description], index) => ({ _id: `audience-${index + 1}`, _type: "audience", number, name, description, order: index })),
    ...processSteps.map(([number, title, description], index) => ({ _id: `process-${index + 1}`, _type: "processStep", number, title, description, order: index })),
    ...faqs.map(([question, answer], index) => ({ _id: `faq-${index + 1}`, _type: "faq", question, answer, category: "General", order: index, published: true })),
    ...galleryDocs,
  ];
}

async function main() {
  if (!projectId || argument("--confirm-project") !== projectId || argument("--confirm-dataset") !== dataset) {
    throw new Error(`Confirma el destino con --confirm-project ${projectId} --confirm-dataset ${dataset}.`);
  }
  if (dryRun) {
    console.log(JSON.stringify({ mode: "dry-run", projectId, dataset, pages: pages.length, services: services.length, rentals: rentals.length, audiences: audiences.length, processSteps: processSteps.length, faqs: faqs.length, gallery: galleryImages.length + serviceImages.xray.length + serviceImages.ecg.length }, null, 2));
    return;
  }
  const docs = await documents();
  let transaction = client.transaction();
  for (const document of docs) transaction = transaction.createOrReplace(document);
  await transaction.commit({ tag: "imagen-del-puerto.current-content" });
  console.log(`Migración completa: ${docs.length} documentos en ${projectId}/${dataset}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
