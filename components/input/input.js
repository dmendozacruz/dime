// <dime-input> · DIME. Web component en light DOM (D-017): envuelve la etiqueta,
// el campo de contraseña, el botón ver/ocultar y el mensaje de error, que ya
// están en el HTML. Añade el botón ver/ocultar y el método setError().
import { define } from "../shared/define.js";
import { icon } from "../shared/icons.js";

export class DimeInput extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    const input = this.querySelector("input");
    const toggle = this.querySelector(".dime-input__toggle");
    if (!input || !toggle) return;
    toggle.addEventListener("click", () => {
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
      toggle.innerHTML = icon(show ? "view-off" : "view", "dime-input__toggle-icon");
    });
  }

  /** Muestra (o quita, sin mensaje) el error. El nodo .dime-input__error existe
   *  siempre con role="alert": se vacía y se rellena 100 ms después para que se
   *  anuncie también si el mensaje se repite. */
  setError(message) {
    const input = this.querySelector("input");
    const error = this.querySelector(".dime-input__error");
    error.innerHTML = "";
    input.removeAttribute("aria-invalid");
    if (!message) return;
    input.setAttribute("aria-invalid", "true");
    setTimeout(() => {
      error.innerHTML = `${icon("danger", "dime-input__error-icon")}<span>${message}</span>`;
    }, 100);
  }
}

define("dime-input", DimeInput);
