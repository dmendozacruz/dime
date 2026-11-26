// Comprueba que cada componente cumple la estructura del sistema:
// tres páginas MDX (Uso, Código, Accesibilidad), el nodo de Figma en la de Uso,
// stories, y axe como error en esas stories. Falla con la lista de lo que falta.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../components/", import.meta.url).pathname;
const problems = [];
const folders = readdirSync(root).filter((d) => d !== "shared" && statSync(join(root, d)).isDirectory());

for (const dir of folders) {
  const files = readdirSync(join(root, dir));
  const find = (suffix) => files.find((f) => f.endsWith(suffix));
  for (const suffix of ["Uso.mdx", "Codigo.mdx", "Accesibilidad.mdx"]) {
    if (!find(suffix)) problems.push(`${dir}: falta la página *${suffix}`);
  }
  const uso = find("Uso.mdx");
  if (uso && !/figmaNode="\d+:\d+"/.test(readFileSync(join(root, dir, uso), "utf8"))) {
    problems.push(`${dir}: la página de Uso no lleva figmaNode`);
  }
  const stories = find(".stories.js");
  if (!stories) problems.push(`${dir}: falta el archivo de stories`);
  else if (!/a11y:\s*\{\s*test:\s*"error"/.test(readFileSync(join(root, dir, stories), "utf8"))) {
    problems.push(`${dir}: las stories no activan axe como error (parameters.a11y.test = "error")`);
  }
}

if (problems.length) {
  console.error("Estructura de componentes: " + problems.length + " problema(s)\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log(`Estructura de componentes: ${folders.length} componentes correctos.`);
