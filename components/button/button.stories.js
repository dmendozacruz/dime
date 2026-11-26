import { expect, userEvent, within } from "storybook/test";
import { icon } from "../shared/icons.js";
import "./button.css";

/** HTML del Button. `as: "a"` lo hace enlace (navega) con el mismo aspecto. */
export const buttonHTML = ({ text = "Button", as = "button", href = "#", size = "small", width = "default", inverted = false, showIcon = true, disabled = false }) => {
  const cls = ["dime-button", size === "large" && "dime-button--large", width === "large" && "dime-button--full", inverted && "dime-button--inverted"].filter(Boolean).join(" ");
  const ico = showIcon ? icon("arrow-right", "dime-button__icon") : "";
  const dis = disabled ? ' aria-disabled="true"' : "";
  return as === "a"
    ? `<a class="${cls}" ${disabled ? 'role="link" tabindex="0"' : `href="${href}"`}${dis}><span class="dime-button__label">${text}</span>${ico}</a>`
    : `<button class="${cls}" type="button"${dis}><span class="dime-button__label">${text}</span>${ico}</button>`;
};

/** HTML del icon button: solo icono, el nombre va en aria-label. */
export const iconButtonHTML = ({ label = "Ir al contenido", iconName = "arrow-down", size = "medium", inverted = false, as = "button", href = "#", bounce = false } = {}) => {
  const cls = ["dime-icon-button", size === "large" && "dime-icon-button--large", inverted && "dime-icon-button--inverted", bounce && "dime-icon-button--bounce"].filter(Boolean).join(" ");
  const ico = icon(iconName, "dime-icon-button__icon");
  return as === "a"
    ? `<a class="${cls}" href="${href}" aria-label="${label}">${ico}</a>`
    : `<button class="${cls}" type="button" aria-label="${label}">${ico}</button>`;
};

/** HTML del Button back: enlace con nombre fijo; el texto visible es decorativo. */
export const backHTML = ({ label = "Back to the previous page", text = "Back", href = "#", inverted = false } = {}) =>
  `<a class="dime-button-back${inverted ? " dime-button-back--inverted" : ""}" href="${href}" aria-label="${label}">${icon("arrow-left", "dime-button-back__icon")}<span class="dime-button-back__label" aria-hidden="true">${text}</span></a>`;

const dark = (story) => `<div style="background: var(--color-background-brand); padding: var(--space-7); width: fit-content;">${story()}</div>`;

export default {
  title: "Componentes/Button/Ejemplos",
  excludeStories: ["buttonHTML", "iconButtonHTML", "backHTML"],
  render: (args) => buttonHTML(args),
  args: { text: "Button", as: "button", href: "#", size: "small", width: "default", inverted: false, showIcon: true, disabled: false },
  argTypes: {
    text: { name: "Text", control: "text", description: "Qué pasa al pulsar. Es el nombre accesible." },
    as: { control: "inline-radio", options: ["dime-button", "a"], description: "button si ejecuta una acción; a si navega, descarga o abre el correo." },
    href: { control: "text", description: "Solo con as = a." },
    size: { name: "Size", control: "inline-radio", options: ["small", "large"], description: "small 40 px · large 48 px" },
    width: { name: "Width", control: "inline-radio", options: ["default", "large"], description: "large ocupa todo el ancho." },
    inverted: { name: "Inverted", control: "boolean", description: "Sobre fondo oscuro." },
    showIcon: { name: "Show icon", control: "boolean", description: "Flecha decorativa." },
    disabled: { name: "State = Disabled", control: "boolean", description: "aria-disabled: sigue recibiendo el foco." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };

export const Large = { name: "Size large", args: { size: "large" } };

export const FullWidth = {
  name: "Width large",
  args: { size: "large", width: "large" },
  decorators: [(story) => `<div style="width: 342px;">${story()}</div>`],
};

export const Inverted = { name: "Inverted", args: { inverted: true }, decorators: [dark] };

export const NoIcon = { name: "Sin icono", args: { showIcon: false } };

export const AsLink = { name: "Como enlace", args: { as: "a", text: "Button" } };

export const Disabled = {
  name: "Disabled",
  args: { disabled: true },
  decorators: [(story) => `<div style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-1); font-family: var(--font-family-base);">${story()}<p style="margin: 0; font-size: var(--font-size-body-s); line-height: var(--line-height-body-s); color: var(--color-content-subtle);">No disponible.</p></div>`],
  play: async ({ canvasElement }) => {
    // Disabled sigue recibiendo el foco (aria-disabled, no disabled) y se anuncia como no disponible.
    const el = canvasElement.querySelector('[aria-disabled="true"]');
    await userEvent.tab();
    await expect(el).toHaveFocus();
    await expect(el).toHaveAttribute("aria-disabled", "true");
  },
};

export const IconButton = { name: "icon button", render: () => iconButtonHTML({}) };
export const IconButtonBounce = { name: "icon button con rebote", render: () => iconButtonHTML({ bounce: true }) };
export const IconButtonLarge = { name: "icon button large", render: () => iconButtonHTML({ size: "large" }) };
export const IconButtonInverted = { name: "icon button inverted", render: () => iconButtonHTML({ inverted: true }), decorators: [dark] };

export const Back = { name: "Button back", render: () => backHTML({}) };
export const BackInverted = { name: "Button back inverted", render: () => backHTML({ inverted: true }), decorators: [dark] };

/** Interacción crítica: Tab llega al botón; Enter y Espacio lo activan. */
export const Keyboard = {
  name: "Teclado",
  render: (args) => buttonHTML(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Button" });
    let clicks = 0;
    button.addEventListener("click", () => { clicks += 1; });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(clicks).toBe(2);
  },
};

/** Button back: el nombre accesible es fijo aunque aparezca el texto al pasar el ratón. */
export const BackName = {
  name: "Button back · nombre fijo",
  render: () => backHTML({}),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Back to the previous page" });
    await userEvent.hover(link);
    await expect(link).toHaveAccessibleName("Back to the previous page");
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};
