import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const privacy = await readFile(new URL("../client/src/content/privacy.md", import.meta.url), "utf8");
const terms = await readFile(new URL("../client/src/content/terms.md", import.meta.url), "utf8");

assert.equal((privacy.match(/^## /gm) ?? []).length, 14, "El aviso debe conservar sus 14 secciones");
assert.equal((terms.match(/^## /gm) ?? []).length, 21, "Los términos deben conservar sus 21 secciones");
assert.match(privacy, /Derechos ARCO/);
assert.match(terms, /Emergencias médicas/);
console.log("Documentos legales completos: OK");
