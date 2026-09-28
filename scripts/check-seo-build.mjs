import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = "4178";
const server = spawn(process.execPath, ["dist/index.js"], {
  env: { ...process.env, NODE_ENV: "production", PORT: port },
  stdio: "ignore",
});

async function request(path, options) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      return await fetch(`http://127.0.0.1:${port}${path}`, options);
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  throw new Error("El servidor de prueba no inició a tiempo.");
}

try {
  const service = await request("/servicios/rayos-x");
  const serviceHtml = await service.text();
  assert.equal(service.status, 200);
  assert.match(serviceHtml, /<title>Imagen del Puerto \| Radiógrafias<\/title>/);
  assert.match(serviceHtml, /rel="canonical" href="https:\/\/imagendelpuerto\.com\/servicios\/rayos-x"/);
  assert.match(serviceHtml, /"@type":"Service"/);
  assert.match(serviceHtml, /id="page-hero-preload"[^>]+traslado-equipo-rayos-x\.webp/);

  const expectedTitles = {
    "/": "Imagen del Puerto | Inicio",
    "/contacto": "Imagen del Puerto | Contacto",
    "/nosotros": "Imagen del Puerto | Nosotros",
    "/galeria": "Imagen del Puerto | Galeria",
    "/servicios": "Imagen del Puerto | Servicios",
    "/renta": "Imagen del Puerto | Renta",
    "/servicios/electrocardiogramas": "Imagen del Puerto | Electrocardiogramas",
    "/servicios/rayos-x": "Imagen del Puerto | Radiógrafias",
  };
  for (const [path, title] of Object.entries(expectedTitles)) {
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).includes(`<title>${title}</title>`), `Título incorrecto para ${path}`);
  }

  const compressed = await request("/servicios/rayos-x", {
    headers: { "accept-encoding": "gzip" },
  });
  assert.equal(compressed.headers.get("content-encoding"), "gzip");

  const assetPath = serviceHtml.match(/<script[^>]+src="([^"]+)"/)?.[1];
  assert.ok(assetPath, "No se encontró el bundle JavaScript.");
  const asset = await request(assetPath, { headers: { "accept-encoding": "gzip" } });
  assert.match(asset.headers.get("cache-control") ?? "", /max-age=31536000, immutable/);
  assert.equal(asset.headers.get("content-encoding"), "gzip");

  const legacy = await request("/service", { redirect: "manual" });
  assert.equal(legacy.status, 308);
  assert.equal(legacy.headers.get("location"), "/servicios");

  const trailingSlash = await request("/servicios/", { redirect: "manual" });
  assert.equal(trailingSlash.status, 308);
  assert.equal(trailingSlash.headers.get("location"), "/servicios");

  const canonicalHost = await request("/servicios", {
    redirect: "manual",
    headers: { "x-forwarded-host": "www.imagendelpuerto.com", "x-forwarded-proto": "https" },
  });
  assert.equal(canonicalHost.status, 308);
  assert.equal(canonicalHost.headers.get("location"), "https://imagendelpuerto.com/servicios");

  const deploymentAlias = await request("/contacto", {
    redirect: "manual",
    headers: { "x-forwarded-host": "imagen-del-puerto.example-host.app", "x-forwarded-proto": "https" },
  });
  assert.equal(deploymentAlias.status, 308);
  assert.equal(deploymentAlias.headers.get("location"), "https://imagendelpuerto.com/contacto");

  const health = await request("/healthz", {
    headers: { "x-forwarded-host": "imagen-del-puerto.example-host.app" },
  });
  assert.equal(health.status, 200);

  const missing = await request("/ruta-inexistente");
  const missingHtml = await missing.text();
  assert.equal(missing.status, 404);
  assert.match(missingHtml, /name="robots" content="noindex,nofollow"/);
  console.log("SEO, caché, compresión y redirecciones: OK");
} finally {
  server.kill();
}
