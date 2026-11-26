import { expect, userEvent, within } from "storybook/test";
import { linkHTML } from "../link/link.stories.js";
import { buttonHTML } from "../button/button.stories.js";
import { dividerHTML } from "../divider/divider.stories.js";
import "./nav-footer.css";
import "../link/link.css";
import "../button/button.css";
import "../divider/divider.css";

/** Footer. `type` home: título, frase, enlaces y botón. `page`: compacto, solo título,
 *  enlaces y botón. Responde al ancho de su contenedor (desktop, tablet, mobile). */
export const footerHTML = ({ type = "home", showGithub = true } = {}) => {
  const link = (text, label) =>
    `<li>${linkHTML({ text, href: "#", size: "large", inverted: true, showIconLeft: false, showIconRight: true, showText: true, disabled: false, ariaLabel: label, newTab: true })}</li>`;
  const lead = type === "home" ? `<p class="dime-nav-footer__lead">If you think we can build something great together, feel free to reach out.</p>` : "";
  return `<footer class="dime-nav-footer${type === "page" ? " dime-nav-footer--page" : ""}" aria-label="Contact">
  <div class="dime-nav-footer__inner">
    <div class="dime-nav-footer__top">
      <h2 class="dime-nav-footer__title">Let’s talk!</h2>
      ${lead}
    </div>
    <div class="dime-nav-footer__actions">
      <ul class="dime-nav-footer__links" role="list">
        ${link("LinkedIn", "LinkedIn (opens in a new tab)")}
        ${showGithub ? link("Github", "Github (opens in a new tab)") : ""}
      </ul>
      <div class="dime-nav-footer__cta">${buttonHTML({ text: "Get in touch", as: "a", href: "mailto:hello@example.com", size: "small", width: "default", inverted: true, showIcon: true })}</div>
    </div>
    ${dividerHTML({ inverted: true, decorative: true })}
    <p class="dime-nav-footer__copy">© 2026 <strong>Diana Mendoza</strong> · Made with Claude</p>
  </div>
</footer>`;
};

/** Marco de un ancho concreto (desktop 1440, tablet 769, mobile 390). */
export const frame = (html, width) => `<div style="width: ${width}px; max-width: none;">${html}</div>`;

export default {
  title: "Componentes/Nav Footer/Ejemplos",
  excludeStories: ["footerHTML", "frame"],
  render: (args) => frame(footerHTML(args), 1440),
  args: { type: "home", showGithub: true },
  argTypes: {
    type: { name: "Type", control: "inline-radio", options: ["home", "page"], description: "home: completo, con frase. page: compacto." },
    showGithub: { name: "Github", control: "boolean", description: "Segundo enlace de contacto." },
  },
  parameters: { a11y: { test: "error" }, layout: "fullscreen" },
};

export const HomeDesktop = { name: "Completo · desktop" };
export const HomeTablet = { name: "Completo · tablet", render: (args) => frame(footerHTML(args), 769) };
export const HomeMobile = { name: "Completo · mobile", render: (args) => frame(footerHTML(args), 390) };
export const PageDesktop = { name: "Compacto · desktop", args: { type: "page" } };
export const PageTablet = { name: "Compacto · tablet", args: { type: "page" }, render: (args) => frame(footerHTML(args), 769) };
export const PageMobile = { name: "Compacto · mobile", args: { type: "page" }, render: (args) => frame(footerHTML(args), 390) };

/** Interacción crítica: Tab recorre enlaces y botón por orden; el título es un encabezado. */
export const Keyboard = {
  name: "Teclado",
  render: (args) => frame(footerHTML(args), 1440),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 2, name: "Let’s talk!" })).toBeInTheDocument();
    await expect(canvas.getByRole("contentinfo", { name: "Contact" })).toBeInTheDocument();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "LinkedIn (opens in a new tab)" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Github (opens in a new tab)" })).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "Get in touch" })).toHaveFocus();
  },
};
