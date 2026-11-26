import "./divider.css";

/** HTML del Divider. Si separa temas distintos es un <hr> (se anuncia); si es
 *  decoración, aria-hidden para que el lector de pantalla no lo lea. */
export const dividerHTML = ({ inverted = false, decorative = false } = {}) =>
  `<hr class="dime-divider${inverted ? " dime-divider--inverted" : ""}"${decorative ? ' aria-hidden="true"' : ""}>`;

const block = (t) => `<p style="margin: 0; font-family: var(--font-family-base); font-size: var(--font-size-body-m); line-height: var(--line-height-body-m);">${t}</p>`;
const frame = (inner, dark = false) => `<div style="display: flex; flex-direction: column; gap: var(--space-6); width: 480px; padding: var(--space-7); ${dark ? "background: var(--color-background-brand); color: var(--color-content-inverse);" : ""}">${inner}</div>`;

export default {
  title: "Componentes/Divider/Ejemplos",
  excludeStories: ["dividerHTML"],
  render: (args) => frame(block("Bloque de contenido") + dividerHTML(args) + block("Otro bloque de contenido"), args.inverted),
  args: { inverted: false, decorative: false },
  argTypes: {
    inverted: { name: "Inverted", control: "boolean", description: "Sobre fondo oscuro." },
    decorative: { control: "boolean", description: "Solo decoración: no se anuncia." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const Inverted = { name: "Inverted", args: { inverted: true } };
export const Decorative = { name: "Decorativo", args: { decorative: true } };
