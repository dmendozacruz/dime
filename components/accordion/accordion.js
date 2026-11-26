// <dime-accordion> · DIME. Web component en light DOM (D-017): envuelve la lista
// de cabeceras (<button aria-expanded>) y paneles, y abre y cierra cada uno por
// separado. Cerrado, el panel es inert: no recibe el foco ni lo lee el lector.
import { define } from "../shared/define.js";

export class DimeAccordion extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    this.querySelectorAll("button[aria-controls]").forEach((btn) => {
      const panel = this.querySelector(`#${CSS.escape(btn.getAttribute("aria-controls"))}`);
      if (!panel) return;
      const sync = () => { panel.inert = btn.getAttribute("aria-expanded") !== "true"; };
      sync();
      btn.addEventListener("click", () => {
        btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true"));
        sync();
      });
    });
  }
}

define("dime-accordion", DimeAccordion);
