import { expect, userEvent, within } from "storybook/test";
import { tabsHTML } from "./tabs.html.js";
import "./tabs.css";

const mount = (html) => {
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  return wrap;
};

export default {
  title: "Componentes/Tabs/Ejemplos",
  render: (args) => mount(tabsHTML({ items: Array.from({ length: args.count }, () => args.text), large: args.size === "large" })),
  args: { text: "Item", count: 3, size: "small" },
  argTypes: {
    text: { name: "Text", control: "text", description: "Etiqueta de cada pestaña." },
    count: { name: "Show item 3 / 4", control: { type: "range", min: 2, max: 4 }, description: "Dos, tres o cuatro pestañas." },
    size: { name: "Size", control: "inline-radio", options: ["small", "large"], description: "small en desktop; large en tablet y móvil (automático por debajo de 1024 px)." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const Large = { name: "Size large", args: { size: "large" } };
export const Four = { name: "Cuatro pestañas", args: { count: 4 } };

/** Interacción crítica: Tab entra en la pestaña activa; las flechas solo mueven el foco;
 *  Enter selecciona y cambia el panel; el siguiente Tab va al panel. */
export const Keyboard = {
  name: "Teclado",
  render: () => mount(tabsHTML({ label: "Example", items: ["Tab one", "Tab two", "Tab three"] })),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [one, two] = canvas.getAllByRole("tab");
    await userEvent.tab();
    await expect(one).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(two).toHaveFocus();
    await expect(two).toHaveAttribute("aria-selected", "false");
    await userEvent.keyboard("{Enter}");
    await expect(two).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveAccessibleName("Tab two");
    await userEvent.tab();
    await expect(canvas.getByRole("tabpanel")).toHaveFocus();
    // Flechas, Inicio y Fin mueven el foco entre pestañas sin activarlas.
    const [first, , third] = canvas.getAllByRole("tab");
    two.focus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(third).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(first).toHaveFocus();
    await expect(first).toHaveAttribute("aria-selected", "false");
  },
};
