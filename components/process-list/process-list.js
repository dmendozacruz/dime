// <dime-process-list> · DIME. Web component en light DOM (D-017): envuelve la lista
// ordenada y, al hacer scroll, rellena la línea y los puntos hasta el paso por el
// que va la persona. Es solo visual: los pasos y su orden ya están en el HTML y la
// línea y los puntos son decorativos (aria-hidden).
//
// Mide el centro del título de cada paso, que es donde está su punto, y calcula el
// progreso con la posición de la lista en la ventana. Cada paso recibe:
//   · data-reached  cuando el progreso ha llegado a su punto
//   · --dime-fill   (0 a 1) lo que lleva relleno su tramo de línea hasta el paso siguiente
// Con "reducir movimiento" no hay animación: todo aparece relleno.
import { define } from "../shared/define.js";

export class DimeProcessList extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    this._list = this.querySelector(".dime-process-list");
    this._items = [...this.querySelectorAll(".dime-process-list__item")];
    if (!this._list || this._items.length === 0) return;

    this._centers = [];
    this._onResize = () => { this._measure(); this._update(); };
    this._onScroll = () => {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => { this._raf = null; this._update(); });
    };

    this._measure();
    window.addEventListener("resize", this._onResize);
    // La fuente web puede cargar después de la primera medición y mover los títulos.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(this._onResize);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this._items.forEach((item) => { item.setAttribute("data-reached", ""); item.style.setProperty("--dime-fill", "1"); });
      return;
    }
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._update();
  }

  disconnectedCallback() {
    if (!this._ready) return;
    window.removeEventListener("resize", this._onResize);
    window.removeEventListener("scroll", this._onScroll);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._ready = false;
  }

  /** Centro vertical del título de cada paso, desde la parte de arriba de la lista. */
  _measure() {
    const top = this._list.getBoundingClientRect().top;
    this._centers = this._items.map((item) => {
      const title = item.querySelector(".dime-process-list__title") || item;
      const r = title.getBoundingClientRect();
      return r.top - top + r.height / 2;
    });
  }

  /** Progreso de 0 a 1: empieza cuando la lista asoma por abajo y acaba cuando su último paso está hacia la mitad de la ventana. */
  _progress() {
    const listTop = this._list.getBoundingClientRect().top;
    const vh = window.innerHeight;
    const lastOffset = this._centers[this._centers.length - 1];
    const start = vh * 0.4;
    const end = vh * 0.6 + lastOffset;
    return Math.min(1, Math.max(0, (vh - listTop - start) / (end - start)));
  }

  _update() {
    const first = this._centers[0];
    const span = this._centers[this._centers.length - 1] - first || 1;
    const reach = this._progress() * span; // distancia recorrida desde el primer punto
    this._items.forEach((item, i) => {
      const from = this._centers[i] - first;
      const to = i < this._items.length - 1 ? this._centers[i + 1] - first : from;
      const fill = to > from ? Math.min(1, Math.max(0, (reach - from) / (to - from))) : 0;
      item.style.setProperty("--dime-fill", fill.toFixed(3));
      item.toggleAttribute("data-reached", reach >= from);
    });
  }
}

define("dime-process-list", DimeProcessList);
