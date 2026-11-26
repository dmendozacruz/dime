// Iconos del set Icons (public/icons/*.svg) en línea, para que tomen el color del
// texto (currentColor) en cada estado. Se leen de los archivos que exporta Diana:
// no se redibujan.
const raw = import.meta.glob("../../public/icons/*.svg", { query: "?raw", import: "default", eager: true });
const svgs = Object.fromEntries(Object.entries(raw).map(([f, code]) => [f.split("/").pop().replace(".svg", ""), code]));

/** SVG decorativo del icono `name` con la clase `cls`. */
export function icon(name, cls) {
  const code = svgs[name];
  if (!code) throw new Error(`No existe el icono ${name}`);
  return code
    .trim()
    .replace(/\s(width|height)="[^"]*"/g, "")
    .replace(/fill="#1A1A1A"/gi, 'fill="currentColor"')
    .replace("<svg", `<svg class="${cls}" aria-hidden="true" focusable="false"`);
}
