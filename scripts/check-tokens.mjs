// Comprueba que los tokens generados coinciden con el volcado de Figma: regenera
// y compara. Si algo cambia, alguien editó un generado a mano o no lo regeneró.
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const files = ["tokens/tokens.css", "tokens/typography.css", "tokens/tokens.json"];
const hash = () => createHash("sha256").update(files.map((f) => readFileSync(f)).join("")).digest("hex");

const before = hash();
execSync("node scripts/build-tokens.mjs", { stdio: "ignore" });
if (hash() !== before) {
  console.error("Tokens: los archivos generados no coinciden con tokens/source/figma.json. Ejecuta `npm run tokens` y súbelos.");
  process.exit(1);
}
console.log("Tokens: los generados coinciden con Figma.");
