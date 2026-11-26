import { expect, userEvent, within } from "storybook/test";
import "./skip-nav.css";

/** HTML del Skip nav. Va como primer elemento del <body>; el destino lleva
 *  tabindex="-1" para recibir el foco. */
export const skipNavHTML = ({ target = "main-content", large = false } = {}) =>
  `<a class="dime-skip-nav${large ? " dime-skip-nav--large" : ""}" href="#${target}">Skip to main content</a>`;

const page = (skip) => `
  <div style="position: relative; min-height: 240px; font-family: var(--font-family-base); font-size: var(--font-size-body-m); line-height: var(--line-height-body-m);">
    ${skip}
    <header style="display: flex; gap: var(--space-6); padding: var(--space-4); border-bottom: 1px solid var(--color-border-medium);">
      <a href="#">Link</a><a href="#">Link</a><a href="#">Link</a>
    </header>
    <main id="main-content" tabindex="-1" style="padding: var(--space-6) var(--space-4);">Main content</main>
  </div>`;

/** Visible a la fuerza, solo para documentar su aspecto (en la página solo se ve con el foco). */
const forced = (large) => skipNavHTML({ large }).replace('class="dime-skip-nav', 'style="position: static; transform: none; outline: 3px solid var(--color-focus-ring-inner); box-shadow: 0 0 0 6px var(--color-focus-ring);" class="dime-skip-nav');

export default {
  title: "Componentes/Skip nav/Ejemplos",
  excludeStories: ["skipNavHTML"],
  parameters: { a11y: { test: "error" } },
};

export const Small = { name: "Size small", render: () => `<div style="padding: var(--space-4);">${forced(false)}</div>` };
export const Large = { name: "Size large", render: () => `<div style="padding: var(--space-4);">${forced(true)}</div>` };

/** Interacción crítica: es el primer Tab y lleva el foco al contenido principal.
 *  (Que se vea con el foco se comprueba en las variantes de arriba: en un iframe sin
 *  el foco de la ventana, el navegador no aplica :focus.) */
export const Keyboard = {
  name: "Teclado",
  render: () => page(skipNavHTML()),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skip = canvas.getByRole("link", { name: "Skip to main content" });
    await userEvent.tab();
    await expect(skip).toHaveFocus();
    // La vista previa de Storybook lleva <base target="_parent">: sin esto, el enlace
    // abriría la ventana de fuera en vez de saltar dentro del ejemplo.
    canvasElement.ownerDocument.querySelector("base")?.setAttribute("target", "_self");
    await userEvent.keyboard("{Enter}");
    await expect(canvasElement.querySelector("#main-content")).toHaveFocus();
  },
};
