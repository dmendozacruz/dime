import "./process-list.css";
import { expect, within } from "storybook/test";

/** HTML del Process list: una lista ordenada. `active` marca el paso en curso.
 *  Con `scroll` (por defecto) va dentro de <dime-process-list> (web component, D-017):
 *  la línea y los puntos se rellenan al hacer scroll. Sin él es solo la lista (para
 *  las muestras de estados de la pestaña Uso). */
export const processListHTML = ({ steps = [["Title", "Description"], ["Title", "Description"], ["Title", "Description"]], zigzag = false, active = -1, scroll = true } = {}) => {
  const list = `<ol role="list" class="dime-process-list${zigzag ? " dime-process-list--zigzag" : ""}">${steps
    .map(([t, d], i) => `<li class="dime-process-list__item${i === active ? " dime-process-list__item--active" : ""}"${i === active ? ' aria-current="step"' : ""}><span class="dime-process-list__step" aria-hidden="true"></span><div class="dime-process-list__text"><h3 class="dime-process-list__title">${t}</h3><p class="dime-process-list__description">${d}</p></div></li>`)
    .join("")}</ol>`;
  return scroll ? `<dime-process-list>${list}</dime-process-list>` : list;
};

export default {
  title: "Componentes/Process list/Ejemplos",
  excludeStories: ["processListHTML"],
  render: (args) => `<div style="max-width: 610px;">${processListHTML(args)}</div>`,
  args: { zigzag: false, active: -1 },
  argTypes: {
    zigzag: { control: "boolean", description: "Línea en el centro y pasos alternos (desktop). En mobile, siempre a la izquierda." },
    active: { control: { type: "range", min: -1, max: 2 }, description: "Paso activo (State = Active). −1: ninguno." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = {
  name: "Estado principal",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("list")).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};
export const Active = {
  name: "Paso activo",
  args: { active: 1 },
  play: async ({ canvasElement }) => {
    // El paso en curso se anuncia con aria-current, no solo con el color.
    await expect(canvasElement.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
  },
};
export const Zigzag = {
  name: "Zigzag",
  args: { zigzag: true },
  render: (args) => `<div style="max-width: 1200px;">${processListHTML(args)}</div>`,
};
/** Para ver el relleno: hay espacio antes y después, así que se puede hacer scroll. */
export const Scroll = {
  name: "Relleno al hacer scroll",
  render: () => `<div style="max-width: 610px; padding-block: 60vh;">${processListHTML({ steps: [["01. Title", "Description con un texto largo que baja de línea: la línea del paso crece con él y el punto sigue a su título."], ["02. Title", "Description"], ["03. Title", "Description con más texto para que este paso sea más alto que el anterior."], ["04. Title", "Description"]] })}</div>`,
};
export const LongText = {
  name: "Texto largo",
  render: () => `<div style="max-width: 400px;">${processListHTML({ steps: [["Title", "Description con un texto largo que baja de línea: la línea del paso crece con él."], ["Title", "Description"]] })}</div>`,
};
