// Registro de los web components de DIME (D-017: light DOM, sin Shadow DOM).
// Evita el error de registrar dos veces la misma etiqueta (p. ej. con recarga en caliente).
export function define(name, Element) {
  if (!customElements.get(name)) customElements.define(name, Element);
}
