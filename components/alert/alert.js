// <dime-alert-region> · DIME. Web component en light DOM (D-017): envuelve la
// región que anuncia los avisos (role="status" o role="alert"), que está vacía en
// el HTML desde que carga la página. show() escribe el aviso y se anuncia; el
// foco no se mueve. El Alert en sí (.dime-alert) no tiene comportamiento: es HTML y CSS.
import { define } from "../shared/define.js";
import { alertHTML } from "./alert.html.js";

export class DimeAlertRegion extends HTMLElement {
  show(options) {
    const region = this.querySelector("[role]") || this;
    region.innerHTML = "";
    // Un instante vacío para que el lector note el cambio aunque el texto se repita.
    setTimeout(() => { region.innerHTML = alertHTML(options); }, 100);
  }

  clear() {
    const region = this.querySelector("[role]") || this;
    region.innerHTML = "";
  }
}

define("dime-alert-region", DimeAlertRegion);
