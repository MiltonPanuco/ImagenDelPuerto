# Imagen del Puerto

Sitio web de **Imagen del Puerto**, un negocio de diagnóstico médico a domicilio y renta de equipo médico con cobertura en Puerto Vallarta y Bahía de Banderas.

El repositorio está dividido en `frontend/` y `sanity/`. Incluye el sitio público, un servidor Node para producción y un Studio de Sanity bilingüe para administrar contenido. Si el CMS no está disponible, el sitio conserva contenido local en español como respaldo.

## Qué incluye

- Páginas de servicios, renta, galería, contacto, aviso de privacidad y términos.
- Diseño responsive y mobile-first con Tailwind CSS.
- Formulario que valida los datos en el navegador y prepara la solicitud en WhatsApp; no almacena información en un backend propio.
- Contenido editable desde Sanity con fallback local.
- Títulos, descripciones, Open Graph y datos estructurados específicos por ruta.
- Carga diferida por página y pantalla de carga sólo mientras se descarga una ruta.
- Compresión, políticas de caché, encabezados de seguridad y redirecciones canónicas desde Express.
- Página 404 con respuesta HTTP 404 real en producción.
- Animaciones compatibles con `prefers-reduced-motion`.

## Tecnologías

- React 19 y TypeScript
- Vite 7
- Tailwind CSS 4
- Wouter
- Express 4 y `compression`
- Sanity Studio 6
- pnpm 10

## Requisitos

- Node.js 20 o posterior
- pnpm 10.4.1

## Inicio rápido

```bash
pnpm --dir frontend install --frozen-lockfile
pnpm --dir sanity install --frozen-lockfile
pnpm dev
```

Vite inicia el sitio en la URL indicada por la terminal. Durante el desarrollo también expone `/api/content`, por lo que el frontend usa el mismo flujo de contenido que en producción.

## Comandos

| Comando             | Uso                                                                                |
| ------------------- | ---------------------------------------------------------------------------------- |
| `pnpm dev`          | Inicia el sitio en desarrollo y lo expone en la red local.                         |
| `pnpm check`        | Valida frontend, textos legales y tipos del Studio.                                |
| `pnpm build`        | Genera frontend y servidor, y valida el SEO del resultado.                         |
| `pnpm start`        | Inicia el servidor compilado desde `dist/`.                                        |
| `pnpm preview`      | Previsualiza únicamente el bundle de Vite; no sustituye al servidor de producción. |
| `pnpm format`       | Formatea el repositorio con Prettier.                                              |
| `pnpm sanity:dev`   | Inicia Sanity Studio.                                                              |
| `pnpm sanity:check` | Valida los tipos del Studio.                                                       |
| `pnpm sanity:build` | Compila el Studio.                                                                 |

## Estructura

```text
frontend/
  client/
    public/               Archivos públicos, manifest, iconos e imágenes
    src/
      cms/                Carga y normalización del contenido remoto
      components/         Componentes compartidos y de layout
      content/            Aviso de privacidad y términos en Markdown
      pages/              Una vista por ruta
      App.tsx             Rutas y carga diferida
      data.ts             Contenido local de respaldo
      index.css           Tema Tailwind, estilos globales y animaciones
  docs/                   Referencias y propuesta inicial
  scripts/                Validaciones y migración de datos
  server/                 Servidor Node y Worker de Cloudflare
  shared/                 Consulta del CMS y metadatos compartidos
sanity/
  schemaTypes/            Modelos de contenido del Studio
  scripts/                Importación inicial del contenido actual
```

Los recursos que utiliza el sitio viven en `frontend/client/public/storage/`. Los componentes los consumen con rutas públicas como `/storage/images/archivo.webp`.

## Rutas públicas

| Ruta                                 | Página                  |
| ------------------------------------ | ----------------------- |
| `/`                                  | Inicio                  |
| `/nosotros`                          | Nosotros                |
| `/servicios`                         | Resumen de servicios    |
| `/servicios/rayos-x`                 | Rayos X portátiles      |
| `/servicios/electrocardiogramas`     | Electrocardiogramas     |
| `/servicios/poligrafia-respiratoria` | Poligrafía respiratoria |
| `/renta`                             | Renta de equipo médico  |
| `/galeria`                           | Galería                 |
| `/contacto`                          | Contacto y formulario   |
| `/aviso-de-privacidad`               | Aviso de privacidad     |
| `/terminos`                          | Términos y condiciones  |
| `/404`                               | Página no encontrada    |

La ruta heredada `/service` redirige a `/servicios`. El servidor también normaliza barras finales, HTTP y `www` hacia el dominio canónico.

## Contenido y Sanity

`CmsProvider` solicita `/api/content` una vez al cargar la aplicación. El servidor consulta Sanity y mantiene una caché corta; ante un error puede entregar la última respuesta válida. Si no hay contenido remoto, el cliente utiliza `frontend/client/src/data.ts` y los recursos locales.

El contenido editorial usa objetos `{es, en}` como en `beta/sanity`. El endpoint acepta `?lang=es` (predeterminado) o `?lang=en`; mientras se migran documentos antiguos, la consulta cae de forma segura al campo español y después al valor monolingüe anterior. El importador inicial duplica el español en inglés para no inventar traducciones: revisa y reemplaza cada valor `.en` en el Studio antes de habilitar la versión inglesa del sitio.

El proyecto y dataset públicos se configuran así:

| Variable                   | Ámbito                       | Valor por defecto |
| -------------------------- | ---------------------------- | ----------------- |
| `SANITY_PROJECT_ID`        | Servidor y migración         | `xkjqp0l8`        |
| `SANITY_DATASET`           | Servidor y migración         | `production`      |
| `SANITY_TOKEN`             | Sólo migración con escritura | Sin valor         |
| `DRY_RUN`                  | Sólo migración               | `true`            |
| `SANITY_STUDIO_PROJECT_ID` | Bundle público del Studio    | Debe configurarse |
| `SANITY_STUDIO_DATASET`    | Bundle público del Studio    | `production`      |

No coloques tokens privados en variables `SANITY_STUDIO_*`: forman parte del bundle público del Studio.

### Ejecutar el Studio

El Studio tiene su propio lockfile, por lo que sus dependencias se instalan por separado:

```powershell
pnpm --dir sanity install --frozen-lockfile
Copy-Item sanity/.env.example sanity/.env.local
# Completa SANITY_STUDIO_PROJECT_ID en sanity/.env.local
pnpm sanity:dev
```

### Importación inicial

Para migrar documentos existentes al formato ES/EN sin reemplazar cambios editoriales, ejecuta primero la simulación y después la escritura confirmada:

```powershell
pnpm --dir sanity exec sanity exec scripts/migrateLocalizedContent.ts --with-user-token -- --confirm-project xkjqp0l8 --confirm-dataset production
pnpm --dir sanity exec sanity exec scripts/migrateLocalizedContent.ts --with-user-token -- --write --confirm-project xkjqp0l8 --confirm-dataset production
```

La migración selectiva conserva los valores actuales de Sanity, usa control de revisión para evitar pisar ediciones concurrentes y crea únicamente documentos faltantes.

Para copiar el contenido actual del frontend al proyecto configurado:

```powershell
pnpm --dir sanity exec sanity exec scripts/importCurrentContent.ts --with-user-token -- --confirm-project xkjqp0l8 --confirm-dataset production
```

El importador usa `createOrReplace`: sobrescribe los documentos que administra. Úsalo para una carga inicial o una restauración deliberada, no como parte del arranque diario.

Para migraciones desde un archivo externo, `frontend/scripts/migrate-to-sanity.mjs` realiza primero una simulación:

```bash
node frontend/scripts/migrate-to-sanity.mjs ./migration-source.json
```

La escritura requiere `SANITY_TOKEN` y `DRY_RUN=false`. Las imágenes necesitan una carga separada a Sanity Assets.

## Diseño

La identidad visual usa Space Grotesk para encabezados, Inter para lectura y una paleta clínica de tonos fríos:

| Token      | Color     |
| ---------- | --------- |
| Ink        | `#17151B` |
| Charcoal   | `#28262D` |
| Violet     | `#423E49` |
| RX Blue    | `#6E7190` |
| Lavender   | `#ACB4D3` |
| Steel      | `#767378` |
| Mist       | `#EEEEF2` |
| Background | `#FFFFFF` |

Los tokens, tipografías y movimientos compartidos se encuentran en `frontend/client/src/index.css`. La interfaz se construye con utilidades Tailwind dentro de los componentes; evita añadir CSS aislado cuando una utilidad existente cubra el caso.

## SEO, rendimiento y accesibilidad

- El formato de título es `Imagen del Puerto | <Página>`.
- `frontend/shared/seo.ts` concentra títulos, descripciones, URL canónica e imagen social.
- El servidor inyecta metadatos y JSON-LD antes de entregar cada ruta.
- Cada página se compila como un chunk independiente.
- Los bundles con hash usan caché inmutable; imágenes e iconos usan caché con revalidación.
- Las respuestas de texto se comprimen y se envían con encabezados básicos de seguridad.
- Los controles interactivos tienen estados de foco y las animaciones respetan la preferencia de movimiento reducido.

El origen canónico actual es `https://imagendelpuerto.com`. Si cambia el dominio, actualiza `SITE_URL` en `frontend/shared/seo.ts` y la configuración del proveedor.

## Producción

Despliega el proyecto como un servicio Node, no como hosting estático, para conservar metadatos por ruta, `/api/content`, compresión, redirecciones y códigos 404 correctos.

```bash
pnpm --dir frontend install --frozen-lockfile
pnpm build
NODE_ENV=production pnpm start
```

El proveedor debe:

- definir `PORT` cuando no use el puerto `5000`;
- terminar TLS y reenviar `X-Forwarded-Host` y `X-Forwarded-Proto`;
- apuntar `imagendelpuerto.com` y `www.imagendelpuerto.com` al mismo servicio;
- permitir conexiones salientes a la API de Sanity.

La comprobación de salud está disponible en `/healthz`.

## Verificación antes de publicar

```bash
pnpm check
pnpm build
```

Además de las comprobaciones automáticas, confirma manualmente:

- teléfono, correo, WhatsApp, redes sociales y zona de cobertura;
- disponibilidad real del equipo, tiempos de entrega y credenciales profesionales;
- imágenes, logo, favicon y enlaces sociales;
- navegación con teclado y visualización en móvil, tableta y escritorio;
- consentimiento para publicar fotografías de pacientes o instalaciones;
- textos legales con un profesional competente.

Los scripts sólo verifican que el aviso y los términos conserven sus secciones esenciales. No certifican su suficiencia legal ni sustituyen asesoría jurídica.

## Licencia

El paquete declara licencia MIT. Confirma que esa licencia también sea la deseada para el código, textos, marca y recursos visuales antes de publicar o redistribuir el repositorio.
