# Imagen del Puerto — Propuesta inicial

## 1. Dirección de arte resumida

La dirección de arte se define como **medical imaging editorial contemporáneo**. La experiencia combina grandes áreas de blanco y niebla fría con bloques de carbón radiológico, tipografía display geométrica, fotografías amplias y recursos técnicos discretos inspirados en placas radiográficas: líneas de exploración, coordenadas, marcos finos y un tratamiento de grano muy ligero. El movimiento es corto, calmado y funcional; nunca debe competir con la lectura.

La identidad evita la estética de hospital corporativo, la farmacia genérica y el exceso de futurismo. El resultado busca comunicar precisión, rapidez, confianza, tecnología y cercanía.

## 2. Mapa del sitio

| Ruta                             | Propósito                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `/`                              | Portada editorial con servicios, renta, proceso, galería, preguntas frecuentes y CTA.     |
| `/nosotros`                      | Historia, misión, visión, valores, fundador, experiencia, cobertura y datos verificables. |
| `/servicios/rayos-x`             | Detalle de Rayos X portátiles, beneficios, estudios, proceso y CTA contextual.            |
| `/servicios/electrocardiogramas` | Detalle de ECG de 12 derivaciones, beneficios, proceso y CTA contextual.                  |
| `/renta`                         | Catálogo independiente de equipo médico en renta con filtro por categoría.                |
| `/galeria`                       | Galería editorial por categorías.                                                         |
| `/contacto`                      | WhatsApp, teléfono, correo, redes, ubicación, formulario corto y FAQ.                     |
| `/aviso-de-privacidad`           | Contenido legal administrable, pendiente de validación profesional.                       |
| `/terminos`                      | Términos y condiciones administrables, pendientes de validación profesional.              |

## 3. Sistema de diseño

**Tipografía.** Space Grotesk para titulares y datos; Inter para párrafos, navegación, formularios y microcopy. No se utilizan más de dos familias.

**Ritmo.** Escala de espaciado amplia, secciones entre 72 y 126 px, líneas finas y layouts asimétricos. Las tarjetas se reservan para catálogo y no se repiten como patrón dominante.

**Interacción.** Hover con desplazamiento mínimo, botones con respuesta de escala, revelado suave de titulares y acordeón accesible para FAQ. Las animaciones se desactivan o reducen mediante `prefers-reduced-motion`.

**Accesibilidad.** HTML semántico, un H1 por vista, estados focus visibles, labels de formulario, contraste AA, navegación móvil explícita y aviso para no ingresar datos médicos sensibles.

## 4. Componentes principales

`Header`, `Mark`, `Eyebrow`, `SectionHeader`, `WhatsAppButton`, `Hero`, `ServicesSection`, `RentalSection`, `BenefitsSection`, `AudiencesSection`, `ProcessSection`, `GallerySection`, `FAQSection`, `FinalCTA`, `Footer`, `DetailPage`, `RentalPage`, `ContactPage`, `AboutPage` y `LegalPage`.

## 5. Arquitectura de contenido en Sanity

Los documentos se separan en configuración global (`siteSettings`, `navigation`, `seo`), páginas (`homePage`, `legalPage`), entidades comerciales (`service`, `rentalProduct`, `audience`), prueba social (`testimonial`), equipo (`teamMember`), galería (`galleryItem`) y preguntas frecuentes (`faq`). Los campos de estado publicado, disponibilidad y verificación impiden presentar como hechos los contenidos que todavía no han sido confirmados.

## 6. Wireframe textual de Inicio

1. Header flotante con marca, navegación de cuatro entradas y CTA de WhatsApp.
2. Hero a pantalla amplia: fotografía de equipo/atención, H1 “Diagnóstico y equipo médico hasta tu hogar.”, descripción y dos acciones.
3. Introducción con frase editorial: “La atención que necesitas, sin salir de casa.”
4. Servicios de diagnóstico en dos filas de alto contraste: Rayos X portátiles y Electrocardiogramas.
5. Bloque oscuro de renta: imagen editorial, catálogo breve y CTA.
6. Beneficios del servicio a domicilio con estadísticas de contenido verificable.
7. Tipos de clientes en lista editorial.
8. Proceso de atención en tres pasos.
9. Frase-manifiesto sobre la cercanía de la atención.
10. Galería editorial con una pieza grande y dos piezas de apoyo.
11. FAQ en acordeón.
12. CTA final oscuro con WhatsApp.
13. Footer con contacto, redes y legales.

## 7. Contenido que requiere validación del propietario

Historia y fecha de fundación; nombres, cargos, credenciales y experiencia del equipo; misión y visión; estadísticas; cobertura exacta; horarios; testimonios y autorización de uso; disponibilidad de productos; tiempos de entrega; interpretaciones, resultados y cualquier afirmación de urgencia o atención 24/7; textos legales definitivos; logo oficial, favicon y fotografías reales del negocio.
