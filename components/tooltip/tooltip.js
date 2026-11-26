// <dime-tooltip> · DIME. Web component en light DOM (D-017): envuelve el elemento
// y su tooltip (role="tooltip", unido con aria-describedby). Mostrar y ocultar lo
// hace el CSS; el componente solo añade Escape, que lo cierra sin mover el ratón
// ni el foco (WCAG 1.4.13). Escape funciona mientras el ratón esté encima o el foco
// dentro: con solo ratón el foco no está en el elemento, así que se escucha en el
// documento mientras dura el hover o el foco.
import { define } from "../shared/define.js";

export class DimeTooltip extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    const host = this.querySelector(".dime-tooltip-host") || this;
    let hovered = false;
    let focused = false;
    this._onKey = (e) => {
      if (e.key === "Escape") host.setAttribute("data-dismissed", "");
    };
    const sync = () => {
      if (hovered || focused) {
        document.addEventListener("keydown", this._onKey);
      } else {
        document.removeEventListener("keydown", this._onKey);
        host.removeAttribute("data-dismissed");
      }
    };
    this.addEventListener("mouseenter", () => { hovered = true; sync(); });
    this.addEventListener("mouseleave", () => { hovered = false; sync(); });
    this.addEventListener("focusin", () => { focused = true; sync(); });
    this.addEventListener("focusout", () => { focused = false; sync(); });
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._onKey);
  }
}

define("dime-tooltip", DimeTooltip);
