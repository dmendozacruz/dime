import { expect, userEvent, within } from "storybook/test";
import { icon } from "../shared/icons.js";
import { buttonHTML } from "../button/button.stories.js";
import "./nav-header.css";
import "../button/button.css";

const NAV = ["Home", "Works", "About me", "Contact"];

/** Header. Con `menuOpen` el menú abierto va como bloque (para documentarlo); sin él, es
 *  el menú real: se abre con el botón. Los enlaces son de ejemplo. El logo es el vector del nombre. */
export const headerHTML = ({ id = "menu", menuOpen = false, menuOnly = false } = {}) => {
  const items = NAV.map((t, i) => `<li><a class="dime-nav-header__item" href="#"${i === 0 ? ' aria-current="page"' : ""}><span class="dime-nav-header__item-label">${t}</span></a></li>`).join("");
  const menuItems = NAV.map((t) => `<li><a class="dime-nav-header__menu-item" href="#">${t}</a></li>`).join("");
  const menu = `<div class="dime-nav-header__menu${menuOpen ? " dime-nav-header__menu--static" : ""}" id="${id}" role="dialog" aria-modal="true" aria-label="Menu"${menuOpen ? " data-open" : ""}>
    <div class="dime-nav-header__menu-inner">
    <div class="dime-nav-header__menu-bar"><button class="dime-icon-button dime-icon-button--inverted dime-nav-header__close" type="button" aria-label="Close menu">${icon("close", "dime-icon-button__icon")}</button></div>
    <nav class="dime-nav-header__menu-body" aria-label="Main"><ul class="dime-nav-header__menu-list" role="list">${menuItems}</ul></nav>
    </div>
  </div>`;
  if (menuOnly) return `<div class="dime-nav-header">${menu}</div>`;
  return `<dime-nav-header><header class="dime-nav-header">
  <div class="dime-nav-header__bar">
    <div class="dime-nav-header__row">
      <a class="dime-nav-header__logo" href="#" aria-label="Diana Mendoza, home"><img src="logos/name-diana.svg" width="142" height="38" alt=""></a>
      <nav class="dime-nav-header__nav" aria-label="Main"><ul class="dime-nav-header__list" role="list">${items}</ul></nav>
      <div class="dime-nav-header__actions">
        ${buttonHTML({ text: "Resume", as: "a", href: "#", size: "small", width: "default", inverted: false, showIcon: true }).replace('<a class="', '<a aria-label="Download resume" download class="')}
        <button class="dime-icon-button dime-nav-header__toggle" type="button" aria-expanded="${menuOpen}" aria-controls="${id}" aria-label="Menu">${icon("menu", "dime-icon-button__icon")}</button>
      </div>
    </div>
  </div>
  ${menu}
</header></dime-nav-header>`;
};

/** Marco de un ancho concreto (desktop 1440, tablet 769, mobile 390). */
export const frame = (html, width) => `<div style="width: ${width}px; max-width: none;">${html}</div>`;

export default {
  title: "Componentes/Nav Header/Ejemplos",
  excludeStories: ["headerHTML", "frame"],
  render: (args) => frame(headerHTML(args), 1440),
  args: {},
  parameters: { a11y: { test: "error" }, layout: "fullscreen" },
};

export const Desktop = { name: "Desktop" };
export const Tablet = { name: "Tablet", render: () => frame(headerHTML({ id: "menu-t" }), 769) };
export const Mobile = { name: "Mobile", render: () => frame(headerHTML({ id: "menu-m" }), 390) };
export const MenuOpenTablet = { name: "Menú abierto · tablet", render: () => frame(headerHTML({ id: "menu-ot", menuOpen: true, menuOnly: true }), 769) };
export const MenuOpenMobile = { name: "Menú abierto · mobile", render: () => frame(headerHTML({ id: "menu-om", menuOpen: true, menuOnly: true }), 390) };

/** Interacción crítica en tablet: abrir con el botón, foco al menú, Escape cierra y el foco vuelve. */
export const Keyboard = {
  name: "Teclado · menú",
  render: () => frame(headerHTML({ id: "menu-k" }), 769),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: "Menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    toggle.focus();
    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("button", { name: "Close menu" })).toHaveFocus();
    // Tab no sale del menú: desde el primer elemento, Mayús+Tab da la vuelta al último.
    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(document.activeElement.closest(".dime-nav-header__menu")).not.toBeNull();
    await userEvent.keyboard("{Tab}");
    await expect(canvas.getByRole("button", { name: "Close menu" })).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveFocus();
  },
};
