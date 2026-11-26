import { expect, userEvent, within } from "storybook/test";
import "./link.css";

// Iconos del set Icons (public/icons/link-right.svg y link-left.svg), en línea para
// que tomen el color del texto (currentColor) en cada estado.
const ICON_RIGHT = '<path d="M13.1677 6.00004H6.87465V5H14.875V13.0003H13.875V6.70703L5.58213 14.9997L4.875 14.2926L13.1677 6.00004Z"/>';
const ICON_LEFT = '<path d="M6.58232 6.00004H12.8753V5H4.875V13.0003H5.87504V6.70703L14.1679 14.9997L14.875 14.2926L6.58232 6.00004Z"/>';
const icon = (path) => `<svg class="dime-link__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false">${path}</svg>`;

/** HTML del Link. */
export const linkHTML = ({ text, href, size, inverted, showIconLeft, showIconRight, showText, disabled, ariaLabel, newTab }) => {
  const classes = ["dime-link", size === "large" && "dime-link--large", inverted && "dime-link--inverted"].filter(Boolean).join(" ");
  const attrs = disabled
    ? ['role="link"', 'aria-disabled="true"', 'tabindex="0"']
    : [`href="${href}"`, newTab && 'target="_blank" rel="noopener"'];
  if (ariaLabel) attrs.push(`aria-label="${ariaLabel}"`);
  const label = showText ? `<span class="dime-link__label">${text}</span>` : "";
  return `<a class="${classes}" ${attrs.filter(Boolean).join(" ")}>${showIconLeft ? icon(ICON_LEFT) : ""}${label}${showIconRight ? icon(ICON_RIGHT) : ""}</a>`;
};

export default {
  title: "Componentes/Link/Ejemplos",
  excludeStories: ["linkHTML"],
  render: (args) => linkHTML(args),
  args: {
    text: "Link",
    href: "#",
    size: "small",
    inverted: false,
    showIconLeft: false,
    showIconRight: true,
    showText: true,
    disabled: false,
    ariaLabel: "",
    newTab: false,
  },
  argTypes: {
    text: { name: "Text", control: "text", description: "Texto visible. Es (o empieza) el nombre accesible." },
    href: { control: "text", description: "Destino. Sin él no es un enlace." },
    size: { name: "Size", control: "inline-radio", options: ["small", "large"], description: "small 40 px · large 48 px" },
    inverted: { name: "Inverted", control: "boolean", description: "Sobre fondo oscuro." },
    showIconLeft: { name: "Show icon left", control: "boolean" },
    showIconRight: { name: "Show icon right", control: "boolean" },
    showText: { name: "Show text", control: "boolean", description: "Existe en Figma, pero no se usa: el Link lleva siempre texto." },
    disabled: { name: "State = Disabled", control: "boolean", description: "Sin href y con aria-disabled." },
    ariaLabel: { control: "text", description: "Solo para ampliar el texto visible, empezando por él." },
    newTab: { control: "boolean", description: "Abre en pestaña nueva: decirlo en el nombre." },
  },
  parameters: {
    a11y: { test: "error" },
  },
};

/** Estado principal. */
export const Default = {
  name: "Estado principal",
  args: {},
};

/** Size large (48 px). */
export const Large = {
  name: "Size large",
  args: { size: "large" },
};

/** Inverted: sobre background/brand. */
export const Inverted = {
  name: "Inverted",
  args: { size: "large", inverted: true },
  parameters: { backgrounds: { disable: true } },
  decorators: [(story) => `<div style="background: var(--color-background-brand); padding: var(--space-7); width: fit-content;">${story()}</div>`],
};

/** Icono a la izquierda (Show icon left) en vez de a la derecha. */
export const IconLeft = {
  name: "Icono a la izquierda",
  args: { showIconLeft: true, showIconRight: false },
};

/** Disabled: destino no disponible. Sin href, aria-disabled y el motivo al lado. */
export const Disabled = {
  name: "Disabled",
  args: { disabled: true },
  decorators: [(story) => `<div style="display: flex; flex-direction: column; gap: var(--space-1); font-family: var(--font-family-base);">${story()}<p style="margin: 0; font-size: var(--font-size-body-s); line-height: var(--line-height-body-s); color: var(--color-content-subtle);">No disponible.</p></div>`],
  play: async ({ canvasElement }) => {
    // Disabled sigue recibiendo el foco (aria-disabled, no disabled) y se anuncia como no disponible.
    const el = canvasElement.querySelector('[aria-disabled="true"]');
    await userEvent.tab();
    await expect(el).toHaveFocus();
    await expect(el).toHaveAttribute("aria-disabled", "true");
  },
};

/** Contenido límite: texto largo en un contenedor estrecho. Baja de línea sin cortarse. */
export const LongText = {
  name: "Texto largo",
  args: { text: "Link con un texto largo que baja de línea sin cortarse" },
  decorators: [(story) => `<div style="width: 240px;">${story()}</div>`],
};

/** Interacción crítica: se llega con Tab, tiene rol de enlace con su nombre y Enter lo activa. */
export const Keyboard = {
  name: "Teclado",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Link" });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    let activated = false;
    link.addEventListener("click", (e) => { e.preventDefault(); activated = true; }, { once: true });
    await userEvent.keyboard("{Enter}");
    await expect(activated).toBe(true);
  },
};
