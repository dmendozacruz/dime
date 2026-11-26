import { expect, userEvent, within } from "storybook/test";
import { icon } from "../shared/icons.js";
import "./tooltip.css";
import "../button/button.css";

/** La caja del tooltip, suelta (para documentar). */
export const tooltipHTML = ({ text = "Tooltip message", position = "top", id = "" } = {}) =>
  `<span class="dime-tooltip dime-tooltip--${position}" role="tooltip"${id ? ` id="${id}"` : ""}>${text}</span>`;

/** Elemento con tooltip: <dime-tooltip> (web component, D-017). El texto se une al elemento con aria-describedby. */
export const hostHTML = ({ text = "Tooltip message", position = "top", id = "tip" } = {}) =>
  `<dime-tooltip><span class="dime-tooltip-host"><button type="button" class="dime-icon-button" aria-label="Information" aria-describedby="${id}">${icon("information", "dime-icon-button__icon")}</button>${tooltipHTML({ text, position, id })}</span></dime-tooltip>`;

export default {
  title: "Componentes/Tooltip/Ejemplos",
  excludeStories: ["tooltipHTML", "hostHTML"],
  render: (args) => tooltipHTML(args),
  args: { text: "Tooltip message", position: "top" },
  argTypes: {
    text: { name: "Text", control: "text", description: "Dos o tres palabras." },
    position: { name: "Position", control: "inline-radio", options: ["top", "bottom", "left", "right"], description: "Se elige según el espacio libre." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Top = { name: "Top" };
export const Bottom = { name: "Bottom", args: { position: "bottom" } };
export const Left = { name: "Left", args: { position: "left" } };
export const Right = { name: "Right", args: { position: "right" } };

/** En su elemento: aparece con el ratón o con el foco; Escape lo cierra. */
export const OnElement = {
  name: "En su elemento",
  render: (args) => {
    const wrap = document.createElement("div");
    wrap.style.cssText = "padding: var(--space-10) var(--space-12);";
    wrap.innerHTML = hostHTML(args);
    return wrap;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Information" });
    await expect(trigger).toHaveAccessibleDescription("Tooltip message");
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect(trigger.closest(".dime-tooltip-host")).toHaveAttribute("data-dismissed");
    await expect(trigger).toHaveFocus();
  },
};
