import { expect, userEvent, waitFor, within } from "storybook/test";
import { icon } from "../shared/icons.js";
import "./back-to-top.css";

/** HTML del Back to top: un enlace al principio de la página, con nombre fijo. */
export const backToTopHTML = ({ floating = false, target = "top" } = {}) =>
  `<a class="dime-back-to-top${floating ? " dime-back-to-top--floating" : ""}" href="#${target}" aria-label="Back to top">${icon("arrow-up", "dime-back-to-top__icon")}</a>`;

/** En la página: <dime-back-to-top> (web component, D-017) envuelve el enlace. */
export const backToTopElementHTML = (opts = {}) =>
  `<dime-back-to-top${opts.threshold ? ` threshold="${opts.threshold}"` : ""}${opts.upOnly ? " scroll-up-only" : ""}>${backToTopHTML(opts)}</dime-back-to-top>`;

export default {
  title: "Componentes/Back to top/Ejemplos",
  excludeStories: ["backToTopHTML", "backToTopElementHTML"],
  render: () => backToTopHTML(),
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };

/** Interacción crítica: es un enlace llamado "Back to top"; Enter lleva el foco al principio. */
export const Keyboard = {
  name: "Teclado",
  render: () => `<div id="top-demo" tabindex="-1" style="font-family: var(--font-family-base);">Principio de la página</div><div style="height: var(--space-9);"></div>${backToTopElementHTML({ target: "top-demo" })}`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Back to top" });
    link.focus();
    await expect(link).toHaveFocus();
    // La vista previa de Storybook lleva <base target="_parent">: sin esto, el enlace
    // abriría la ventana de fuera en vez de saltar dentro del ejemplo.
    canvasElement.ownerDocument.querySelector("base")?.setAttribute("target", "_self");
    await userEvent.keyboard("{Enter}");
    await expect(canvasElement.querySelector("#top-demo")).toHaveFocus();
  },
};

/** En tablet y mobile solo aparece al subir. Aquí se fuerza con `scroll-up-only` para que la
 *  prueba no dependa del ancho de la ventana: arriba está oculto, al bajar sigue oculto y al
 *  subir aparece; si se vuelve a bajar, se va. */
export const ScrollUp = {
  name: "Flotante · solo al subir",
  render: () => `<div style="height: 3000px; font-family: var(--font-family-base);">Contenido largo</div>${backToTopElementHTML({ floating: true, threshold: 400, upOnly: true })}`,
  play: async ({ canvasElement }) => {
    const link = canvasElement.querySelector(".dime-back-to-top");
    const hidden = () => expect(link).toHaveAttribute("data-hidden");
    const shown = () => expect(link).not.toHaveAttribute("data-hidden");
    // Cada scroll se espera hasta que el navegador dispara su evento y el componente lo procesa.
    const scrollTo = (top) => new Promise((resolve) => {
      window.addEventListener("scroll", () => requestAnimationFrame(() => resolve()), { once: true });
      window.scrollTo({ top, behavior: "instant" });
    });
    await hidden();
    await scrollTo(900);
    await hidden(); // bajando: oculto
    await scrollTo(820);
    await shown(); // subiendo, pasado el umbral: aparece
    await scrollTo(1000);
    await hidden(); // vuelve a bajar: se va
    await scrollTo(0);
    await hidden(); // arriba: oculto
  },
};
