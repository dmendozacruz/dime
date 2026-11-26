// <dime-tabs> · DIME. Web component en light DOM (D-017): envuelve la barra
// (role="tablist") y los paneles, que ya están en el HTML, y les añade el teclado.
// Activación manual (APG): las flechas, Inicio y Fin mueven el foco; Enter o
// Espacio seleccionan la pestaña que tiene el foco y muestran su panel.
import { define } from "../shared/define.js";

export class DimeTabs extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    const list = this.querySelector('[role="tablist"]');
    if (!list) return;
    const tabs = () => [...list.querySelectorAll('[role="tab"]')];

    this.select = (t) => {
      tabs().forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        const panel = this.querySelector(`#${CSS.escape(x.getAttribute("aria-controls"))}`);
        if (panel) panel.hidden = !on;
      });
    };

    list.addEventListener("click", (e) => {
      const t = e.target.closest('[role="tab"]');
      if (t) this.select(t);
    });

    list.addEventListener("keydown", (e) => {
      const all = tabs();
      const i = all.indexOf(document.activeElement);
      if (i < 0) return;
      const go = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: all.length - 1 }[e.key];
      if (go !== undefined) {
        e.preventDefault();
        all[(go + all.length) % all.length].focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.select(all[i]);
      }
    });
  }
}

define("dime-tabs", DimeTabs);
