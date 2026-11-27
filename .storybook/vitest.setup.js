import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/html-vite";
import * as a11yAnnotations from "@storybook/addon-a11y/preview";
import previewAnnotations from "./preview.js";

const project = setProjectAnnotations([a11yAnnotations, previewAnnotations]);
beforeAll(project.beforeAll);

// Sin transiciones ni animaciones durante las pruebas: axe y los `play` miden el estado final.
// Con el pie de la Card, el fondo se oscurece en 250 ms y el enlace pasa a blanco al instante:
// si axe medía en el primer fotograma, veía blanco sobre un fondo aún claro (contraste 1,07).
const style = document.createElement("style");
style.textContent = "*, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }";
document.head.appendChild(style);
