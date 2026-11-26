// Genera los tokens de DIME a partir del volcado de Figma.
//   Entrada:  tokens/source/figma.json        (no se edita a mano)
//             tokens/descriptions.es.json     (textos de uso, en español)
//   Salida:   tokens/tokens.css               (custom properties)
//             tokens/typography.css           (clases de los estilos de texto)
//             tokens/tokens.json              (formato W3C Design Tokens)
//             tokens/tokens.meta.json         (lo que leen las páginas de Storybook)
//
// Ejecutar: npm run tokens

import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../tokens/", import.meta.url);
const src = JSON.parse(readFileSync(new URL("source/figma.json", root)));
const descriptions = JSON.parse(readFileSync(new URL("descriptions.es.json", root)));

const BASE_PX = 16;
const WEIGHTS = { light: 300, regular: 400, medium: 500, bold: 700 };
const FONT_STACK = '"Helvetica Neue", Arial, sans-serif';

// "border/subtle-light" -> "border-subtle-light"; "heading-l" -> "heading-l"
const slug = (s) => s.toLowerCase().trim().replace(/[\s/]+/g, "-");
const rem = (px) => (px === 0 ? "0" : `${+(px / BASE_PX).toFixed(4)}rem`);

// Nombre CSS de cada variable de Figma, según su colección.
function cssName(collection, name, type) {
  if (type === "COLOR") return `--color-${slug(name)}`;
  if (collection === "Globals" && name.startsWith("size/")) return `--size-${slug(name.slice(5))}`;
  if (collection === "Globals" && name.startsWith("space/")) return `--space-${slug(name.slice(6))}`;
  if (collection === "Typography") {
    if (name === "font-family") return "--font-family-base";
    if (name.startsWith("size/")) return `--font-size-${slug(name.slice(5))}`;
    return `--${slug(name)}`; // font-weight/*, line-height/*
  }
  if (collection === "Component") return `--${slug(name)}`; // interaction/*
  return null;
}

const vars = src.variables
  .filter(([, name, type]) => type !== "STRING" || name !== "String") // marcador vacío de Figma
  .map(([collection, name, type, value, alias]) => ({ collection, name, type, value, alias, css: cssName(collection, name, type) }))
  .filter((v) => v.css);

const byFigmaName = new Map(vars.filter((v) => v.collection === "Globals").map((v) => [v.name, v]));

function cssValue(v) {
  if (v.alias && byFigmaName.has(v.alias)) return `var(${byFigmaName.get(v.alias).css})`;
  if (v.type === "COLOR") return v.value.endsWith("@0") ? "transparent" : v.value;
  if (v.name === "font-family") return `"${v.value}", ${FONT_STACK}`;
  if (v.name.includes("font-weight")) return String(WEIGHTS[v.value]);
  return rem(v.value);
}
const pxComment = (v) => (v.type === "FLOAT" && v.value !== 0 ? ` /* ${v.value}px */` : "");

// Grupos en el orden en que se leen en el CSS.
const groups = [
  ["Color · primitivos", (v) => v.type === "COLOR" && v.collection === "Globals"],
  ["Color · feedback", (v) => v.name.startsWith("feedback/")],
  ["Color · semánticos", (v) => v.type === "COLOR" && v.collection === "Alias" && !v.name.startsWith("feedback/")],
  ["Tamaños (escala base)", (v) => v.css.startsWith("--size-")],
  ["Espaciado", (v) => v.css.startsWith("--space-")],
  ["Tipografía", (v) => v.collection === "Typography"],
  ["Componentes · interacción", (v) => v.collection === "Component"],
];

const shadow = (layers) =>
  layers
    .map(([x, y, blur, spread, hex, a]) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
      return `${x}px ${y}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${a})`;
    })
    .join(", ");
// "Elevation/Small" -> "--elevation-s": mismas abreviaturas que el resto del CSS (heading-l, body-xl).
const SIZE_ABBR = { small: "s", medium: "m", large: "l" };
// Los efectos de Figma son sombras (capas numéricas) o desenfoques de fondo (["BACKGROUND_BLUR", radio]).
const isBlur = ([, layers]) => layers.length === 1 && layers[0][0] === "BACKGROUND_BLUR";
const effects = src.effects.filter((e) => !isBlur(e)).map(([name, layers]) => ({ name, css: `--${slug(name).replace(/-(small|medium|large)$/, (_, w) => "-" + SIZE_ABBR[w])}`, value: shadow(layers) }));
// "Blur/Header" (8,3 en Figma) -> "--blur-header: blur(4.15px)". El código que genera Figma
// para el header da 4.15px: el radio de Figma se divide entre dos. Se usa como backdrop-filter.
const blurs = src.effects.filter(isBlur).map(([name, [[, radius]]]) => ({ name, css: `--${slug(name)}`, value: `blur(${+(radius / 2).toFixed(2)}px)` }));

// ---------- tokens.css
let css = `/* DIME — design tokens. Generado por scripts/build-tokens.mjs desde Figma.\n   No editar a mano: cambia Figma y ejecuta \`npm run tokens\`. */\n\n:root {\n`;
for (const [title, test] of groups) {
  css += `  /* ${title} */\n`;
  for (const v of vars.filter(test)) css += `  ${v.css}: ${cssValue(v)};${pxComment(v)}\n`;
  css += "\n";
}
css += "  /* Elevación */\n";
for (const e of effects) css += `  ${e.css}: ${e.value};\n`;
css += "\n  /* Desenfoque (backdrop-filter) */\n";
for (const b of blurs) css += `  ${b.css}: ${b.value};\n`;
css += "}\n";
writeFileSync(new URL("tokens.css", root), css);

// ---------- typography.css (una clase por estilo de texto de Figma)
const STYLE_SCALE = {
  "Display": ["font-size-display", "line-height-display", "display"],
  "Heading/Large": ["font-size-heading-l", "line-height-heading-l", "heading-l"],
  "Heading/Medium": ["font-size-heading-m", "line-height-heading-m", "heading-m"],
  "Heading/Small": ["font-size-heading-s", "line-height-heading-s", "heading-s"],
  "Subheading": ["font-size-subheading", "line-height-subheading", "subheading"],
  "Body/Extra large": ["font-size-body-xl", "line-height-body-xl", "body-xl"],
  "Body/Large": ["font-size-body-l", "line-height-body-l", "body-l"],
  "Body/Medium": ["font-size-body-m", "line-height-body-m", "body-m"],
  "Body/Small": ["font-size-body-s", "line-height-body-s", "body-s"],
  "Label/Medium": ["font-size-label-m", "line-height-label-m", "label-m"],
  "Label/Small": ["font-size-label-s", "line-height-label-s", "label-s"],
  "Interaction/Extra large": ["interaction-size-extra-large", "interaction-line-height-extra-large", "interaction-xl"],
  "Interaction/Large": ["interaction-size-large", "interaction-line-height-large", "interaction-l"],
  "Interaction/Medium": ["interaction-size-medium", "interaction-line-height-medium", "interaction-m"],
};
const textStyles = src.textStyles.map(([name, weight, size, lineHeight, letterSpacing, textCase]) => {
  const group = Object.keys(STYLE_SCALE).find((g) => name === g || name.startsWith(g + "/"));
  if (!group) throw new Error(`Estilo de texto sin escala: ${name}`);
  const [fs, lh, short] = STYLE_SCALE[group];
  const cls = `.text-${short}-${weight.toLowerCase()}`;
  const ls = parseFloat(letterSpacing) / 100;
  return { name, cls, weight: weight.toLowerCase(), size, lineHeight, fs, lh, ls, upper: textCase === "UPPER" };
});
let typo = `/* DIME — estilos de texto. Generado por scripts/build-tokens.mjs. */\n\n`;
for (const t of textStyles) {
  typo += `${t.cls} { /* ${t.name} · ${t.size}/${t.lineHeight} */\n  font-family: var(--font-family-base);\n  font-weight: var(--font-weight-${t.weight});\n  font-size: var(--${t.fs});\n  line-height: var(--${t.lh});\n`;
  if (t.ls) typo += `  letter-spacing: ${t.ls}em;\n`;
  if (t.upper) typo += "  text-transform: uppercase;\n";
  typo += "}\n\n";
}
writeFileSync(new URL("typography.css", root), typo);

// ---------- tokens.json (W3C Design Tokens)
const w3c = {};
const put = (path, token) => {
  let node = w3c;
  for (const k of path.slice(0, -1)) node = node[k] ??= {};
  node[path.at(-1)] = token;
};
for (const v of vars) {
  const path = v.css.slice(2).split("-");
  const $type = v.type === "COLOR" ? "color" : v.name === "font-family" ? "fontFamily" : v.name.includes("font-weight") ? "fontWeight" : "dimension";
  const ref = v.alias && byFigmaName.get(v.alias);
  const $value = ref ? `{${ref.css.slice(2).split("-").join(".")}}` : $type === "fontWeight" ? WEIGHTS[v.value] : $type === "dimension" ? `${v.value}px` : cssValue(v);
  put(path, { $type, $value, $extensions: { figma: `${v.collection}/${v.name}` } });
}
for (const e of effects) put(e.css.slice(2).split("-"), { $type: "shadow", $value: e.value, $extensions: { figma: e.name } });
for (const b of blurs) put(b.css.slice(2).split("-"), { $value: b.value, $extensions: { figma: b.name, dime: "backdrop-filter" } });
writeFileSync(new URL("tokens.json", root), JSON.stringify(w3c, null, 2) + "\n");

// ---------- tokens.meta.json (para las páginas de Storybook)
const meta = {
  colors: vars.filter((v) => v.type === "COLOR").map((v) => ({
    css: v.css,
    figma: v.name,
    collection: v.collection,
    hex: v.value.endsWith("@0") ? "transparent" : v.value,
    alias: v.alias ? byFigmaName.get(v.alias)?.css ?? null : null,
    description: descriptions[v.css] ?? "",
  })),
  dimensions: vars.filter((v) => v.type === "FLOAT").map((v) => ({ css: v.css, figma: `${v.collection}/${v.name}`, px: v.value })),
  typography: vars
    .filter((v) => v.collection === "Typography" || v.collection === "Component")
    .map((v) => ({
      css: v.css,
      figma: v.name,
      collection: v.collection,
      value: cssValue(v),
      px: typeof v.value === "number" ? v.value : null,
      weight: v.name.includes("font-weight") ? WEIGHTS[v.value] : null,
    })),
  textStyles,
  effects: effects.map((e) => ({ ...e, description: descriptions[e.css] ?? "" })),
  blurs: blurs.map((b) => ({ ...b, description: descriptions[b.css] ?? "" })),
};
writeFileSync(new URL("tokens.meta.json", root), JSON.stringify(meta, null, 2) + "\n");

const missing = meta.colors.filter((c) => (c.collection === "Alias" || c.figma.startsWith("feedback/")) && !c.description);
console.log(`Tokens: ${vars.length} variables, ${effects.length} sombras, ${blurs.length} desenfoques, ${textStyles.length} estilos de texto.`);
if (missing.length) console.warn(`Sin descripción: ${missing.map((c) => c.css).join(", ")}`);
