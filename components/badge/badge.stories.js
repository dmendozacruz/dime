import "./badge.css";

/** HTML del Badge. `full` es el nombre completo de una sigla, para el lector de pantalla. */
export const badgeHTML = ({ text = "Label", full = "" } = {}) =>
  full
    ? `<span class="dime-badge"><span aria-hidden="true">${text}</span><span class="dime-badge__full">${full}</span></span>`
    : `<span class="dime-badge">${text}</span>`;

/** Varios badges: una lista, para que el lector de pantalla diga cuántos hay. */
export const badgeListHTML = (items) =>
  `<ul role="list" class="dime-badge-list">${items.map((it) => `<li>${badgeHTML(it)}</li>`).join("")}</ul>`;

export default {
  title: "Componentes/Badge/Ejemplos",
  excludeStories: ["badgeHTML", "badgeListHTML"],
  render: (args) => badgeHTML(args),
  args: { text: "Label", full: "" },
  argTypes: {
    text: { name: "Text", control: "text", description: "Una o dos palabras. Se muestra en mayúsculas." },
    full: { control: "text", description: "Nombre completo si el texto es una sigla (solo para el lector de pantalla)." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };

export const Acronym = { name: "Sigla", args: { text: "B2B", full: "Business to Business" } };

export const Group = {
  name: "Grupo de badges",
  render: () => badgeListHTML([{ text: "Label" }, { text: "Label" }, { text: "Label" }]),
};

export const Wrap = {
  name: "Contenedor estrecho",
  render: () => badgeListHTML([{ text: "Label" }, { text: "Label largo" }, { text: "Label" }, { text: "Label" }]),
  decorators: [(story) => `<div style="width: 180px;">${story()}</div>`],
};
