import { expect, userEvent, within, waitFor } from "storybook/test";
import { alertHTML } from "./alert.html.js";
import "./alert.css";
import "../button/button.css";

const box = (s) => `<div style="max-width: 678px;">${s}</div>`;

export default {
  title: "Componentes/Alert/Ejemplos",
  render: (args) => box(alertHTML(args)),
  args: { type: "error", title: "Title", content: "Message that explains what happened and what to do.", showContent: true },
  argTypes: {
    type: { name: "Type", control: "inline-radio", options: ["info", "success", "warning", "error"], description: "Lo elige el significado, no el color." },
    title: { name: "Title", control: "text", description: "Qué ha pasado, en pocas palabras." },
    content: { name: "Content", control: "text", description: "Qué hacer o más detalle." },
    showContent: { name: "Show content", control: "boolean" },
  },
  parameters: { a11y: { test: "error" } },
};

export const ErrorType = { name: "Error" };
export const Info = { name: "Info", args: { type: "info" } };
export const Success = { name: "Success", args: { type: "success" } };
export const Warning = { name: "Warning", args: { type: "warning" } };
export const NoContent = { name: "Sin contenido", args: { type: "info", showContent: false } };
export const Long = {
  name: "Texto largo",
  args: { type: "warning", content: "Message that explains what happened and what to do. Un contenido largo baja de línea sin cortarse y el icono se queda arriba, alineado con el título." },
};

/** Interacción crítica: la región existe vacía; al pulsar, se escribe el aviso y se anuncia. El foco no se mueve. */
export const Live = {
  name: "Aviso que aparece",
  render: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-4); max-width: 678px; font-family: var(--font-family-base);";
    wrap.innerHTML = `<button type="button" class="dime-button">Show message</button><dime-alert-region><div class="dime-alert-region" role="status"></div></dime-alert-region>`;
    const [btn, region] = wrap.children;
    btn.addEventListener("click", () => region.show({ type: "success", title: "Done", content: "The action finished correctly." }));
    return wrap;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole("status");
    await expect(region).toBeEmptyDOMElement();
    const btn = canvas.getByRole("button", { name: "Show message" });
    await userEvent.click(btn);
    await waitFor(() => expect(region).toHaveTextContent("Done"));
    await expect(btn).toHaveFocus();
  },
};
