import { expect, userEvent, within, waitFor } from "storybook/test";
import { accordionHTML } from "./accordion.html.js";
import "./accordion.css";

const mount = (html) => {
  const wrap = document.createElement("div");
  wrap.style.cssText = "max-width: 588px;";
  wrap.innerHTML = html;
  return wrap;
};

export default {
  title: "Componentes/Accordion/Ejemplos",
  render: () => mount(accordionHTML()),
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const Open = { name: "Abierto", render: () => mount(accordionHTML({ open: [0] })) };
export const WithSlot = {
  name: "Abierto con slot",
  render: () => mount(accordionHTML({ open: [0], items: [{ title: "01.  Title", text: "Texto", slot: '<ul style="margin: 0; padding-left: var(--space-5);"><li>Contenido del slot</li><li>Contenido del slot</li></ul>' }, { title: "02.  Title", text: "Texto" }] })),
};
export const LongTitle = {
  name: "Título largo",
  render: () => mount(accordionHTML({ items: [{ title: "01.  Title con un texto largo que baja de línea", text: "Texto" }] })),
};

/** Interacción crítica: Tab llega a la cabecera; Enter y Espacio abren y cierran;
 *  cerrado, el contenido no recibe el foco. */
export const Keyboard = {
  name: "Teclado",
  render: () => mount(accordionHTML({ items: [{ title: "01.  Title", text: 'Texto con un <a href="#">enlace</a>' }, { title: "02.  Title", text: "Texto" }] })),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [first] = canvas.getAllByRole("button");
    const link = canvasElement.querySelector("a");
    await userEvent.tab();
    await expect(first).toHaveFocus();
    await expect(first).toHaveAttribute("aria-expanded", "false");
    // Cerrado, el panel es inert y el navegador no da foco a su enlace. userEvent.tab()
    // no respeta inert, así que se comprueba el atributo en vez de tabular.
    await expect(link.closest("[inert]")).not.toBeNull();
    await userEvent.keyboard("{Enter}");
    await expect(first).toHaveAttribute("aria-expanded", "true");
    // El panel se abre con una transición: se espera a que se vea.
    await waitFor(() => expect(canvas.getByRole("region", { name: "01. Title" })).toBeVisible());
    await expect(link.closest("[inert]")).toBeNull();
    await userEvent.tab();
    await expect(canvas.getByRole("link", { name: "enlace" })).toHaveFocus();
    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(first).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(first).toHaveAttribute("aria-expanded", "false");
  },
};
