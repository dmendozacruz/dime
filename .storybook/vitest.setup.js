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
// La Card no recibe el puntero: si el ratón queda encima de la tarjeta, se activa su hover (enlace blanco
// sobre el pie oscuro, 17,4:1) y axe lo da por el gris del placeholder de detrás (1,07): falso positivo que
// depende de dónde esté el puntero. Así las stories en reposo miden siempre el estado en reposo; el hover y
// el foco los cubre la story Teclado.
style.textContent = `*, *::before, *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
.dime-card { pointer-events: none !important; }`;
document.head.appendChild(style);
