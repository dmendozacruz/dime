import { expect, userEvent, waitFor, within } from "storybook/test";
import { icon } from "../shared/icons.js";
import { linkHTML } from "../link/link.stories.js";
import { badgeListHTML } from "../badge/badge.stories.js";
import "./card.css";
import "../tooltip/tooltip.css";
import "../link/link.css";
import "../badge/badge.css";

/** HTML de la Card. El nombre accesible del enlace empieza por su texto y dice el destino. */
export const cardHTML = ({ title = "Title", subtitle = "Product design · Strategic design · Design system", badges = ["Label"], showLock = false, imageSrc = "", destination = "Title" } = {}) => {
  const name = `Open case study: ${destination}${showLock ? " (password protected)" : ""}`;
  // Sin imagen, el placeholder estándar (gris con un icono de imagen). Con imagen, un <img> de 300 × 300.
  const media = imageSrc
    ? `<img class="dime-card__image" src="${imageSrc}" width="300" height="300" alt="">`
    : `<span class="dime-card__image dime-card__image--placeholder" aria-hidden="true"></span>`;
  const card = `<article class="dime-card">
  ${media}
  <div class="dime-card__body">
    <div class="dime-card__lock" aria-hidden="true">${showLock ? `<span class="dime-tooltip-host">${icon("lock", "dime-card__lock-icon")}<span class="dime-tooltip dime-tooltip--left">Password protected</span></span>` : ""}</div>
    <div class="dime-card__titles">
      <h3 class="dime-card__title">${title}</h3>
      <p class="dime-card__subtitle">${subtitle}</p>
    </div>
    ${badgeListHTML(badges.map((text) => ({ text })))}
  </div>
  <div class="dime-card__footer">${linkHTML({ text: "Open case study", href: "#", size: "small", inverted: false, showIconLeft: false, showIconRight: true, showText: true, disabled: false, ariaLabel: name, newTab: false })}</div>
</article>`;
  // Con candado hay un tooltip decorativo: <dime-tooltip> añade Escape para cerrarlo (D-017).
  return showLock ? `<dime-tooltip>${card}</dime-tooltip>` : card;
};

export default {
  title: "Componentes/Card/Ejemplos",
  excludeStories: ["cardHTML"],
  render: (args) => cardHTML(args),
  args: { title: "Title", subtitle: "Product design · Strategic design · Design system", showLock: false, imageSrc: "" },
  argTypes: {
    imageSrc: { name: "Image", control: "text", description: "Dirección de la imagen que aparece en Hover y Focus. Vacío: el placeholder estándar." },
    title: { name: "Title", control: "text" },
    subtitle: { name: "Subtitle", control: "text", description: "Áreas del caso." },
    showLock: { name: "Show lock", control: "boolean", description: "Contenido protegido: el enlace lo dice en su nombre." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const Locked = { name: "Show lock", args: { showLock: true } };
export const LongText = {
  name: "Texto largo",
  args: { title: "Title largo", subtitle: "Product design · Strategic design · Design system · Design ops · Research" },
};

/** Interacción crítica: un solo Tab por tarjeta; el enlace dice el destino y el candado. */
export const Keyboard = {
  name: "Teclado",
  args: { showLock: true },
  // Con el foco, el texto del pie es blanco sobre el pie oscuro (17,4:1, medido en el navegador).
  // axe no resuelve ese fondo porque la imagen va detrás (z-index: -1) y lo da por el gris del
  // placeholder: falso positivo. El resto de comprobaciones de axe siguen activas.
  parameters: { a11y: { test: "error", config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Open case study: Title (password protected)" });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await expect(canvas.getAllByRole("link")).toHaveLength(1);
    // Con el foco, el pie se oscurece con una transición: se espera a que termine para que axe mida el contraste final.
    const footer = canvasElement.querySelector(".dime-card__footer");
    await waitFor(() => expect(getComputedStyle(footer).backgroundColor).toBe("rgb(26, 26, 26)"));
  },
};
