import "./fonts.css";
import "../tokens/tokens.css";
import "../tokens/typography.css";
import "../docs/blocks/blocks.css";
// Web components de DIME (D-017): se registran aquí para que las stories los muestren.
import "../components/index.css";
import "../components/index.js";
import theme from "./theme.js";

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    docs: {
      theme,
      // Índice "En esta página" a la derecha, como en el design system de Nueva York.
      toc: { headingSelector: "h2", title: "En esta página", disable: false },
    },
    options: {
      storySort: {
        order: ["Introducción", "Primeros pasos", "Identidad", "Gobernanza", ["Resumen", "El gate", "Cómo se trabaja"], "Changelog", "Mapa del sistema", "Foundations", ["Color", "Tipografía", "Espacio y layout", "Primitivos", "Iconos", "Logos"], "Componentes", ["*", ["Uso", "Código", "Accesibilidad", "Ejemplos"]]],
      },
    },
    a11y: { test: "todo" },
  },
};
export default preview;
