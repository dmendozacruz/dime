import "./blockquote.css";

/** HTML del Blockquote. Con autor, figure + figcaption: el autor queda fuera de la cita. */
export const blockquoteHTML = ({ text = "Text for the quote", showAuthor = false, author = "Nombre Apellido, cargo" } = {}) =>
  showAuthor
    ? `<figure class="dime-blockquote" aria-label="Cita"><div class="dime-blockquote__body"><blockquote class="dime-blockquote__quote"><p>${text}</p></blockquote><figcaption class="dime-blockquote__author"><cite>${author}</cite></figcaption></div></figure>`
    : `<figure class="dime-blockquote" aria-label="Cita"><div class="dime-blockquote__body"><blockquote class="dime-blockquote__quote"><p>${text}</p></blockquote></div></figure>`;

export default {
  title: "Componentes/Blockquote/Ejemplos",
  excludeStories: ["blockquoteHTML"],
  render: (args) => `<div style="max-width: 754px;">${blockquoteHTML(args)}</div>`,
  args: { text: "Text for the quote", showAuthor: false, author: "Nombre Apellido, cargo" },
  argTypes: {
    text: { name: "Text", control: "text", description: "La cita: corta o un párrafo largo." },
    showAuthor: { name: "Show author", control: "boolean" },
    author: { name: "Author", control: "text", description: "Nombre, cargo y empresa." },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const WithAuthor = { name: "Con autor", args: { showAuthor: true } };
export const Long = {
  name: "Texto largo",
  args: { text: "Text for the quote. Una cita larga, como un párrafo, crece en alto sin cortarse: el texto baja de línea dentro de su columna y las comillas se quedan arriba." },
};
