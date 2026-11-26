// <dime-nav-header> · DIME. Web component en light DOM (D-017): envuelve el Header y le
// añade el comportamiento del menú de tablet y mobile (patrón Disclosure navigation
// del APG con ventana modal):
//   · el botón de menú lleva aria-expanded y aria-controls
//   · al abrir, el foco entra en el menú (en su botón de cerrar), el resto de la
//     página queda inert y el scroll se bloquea
//   · Tab no sale del menú; Escape lo cierra
//   · al cerrar, el foco vuelve al botón que lo abrió
//   · si la ventana se ensancha hasta desktop con el menú abierto, se cierra
// La animación (un círculo que crece desde el botón) es CSS y se quita con
// prefers-reduced-motion; el JavaScript solo le dice dónde nace.
import { define } from "../shared/define.js";

export class DimeHeader extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    this._bar = this.querySelector(".dime-nav-header__bar");
    this._toggle = this.querySelector(".dime-nav-header__toggle");
    this._menu = this.querySelector(".dime-nav-header__menu");
    this._close = this.querySelector(".dime-nav-header__close");
    if (!this._bar || !this._toggle || !this._menu || !this._close) return;
    this._inerted = [];
    this._menu.inert = true; // cerrado: fuera del orden de tabulación y del lector

    this._toggle.addEventListener("click", () => this.open());
    this._close.addEventListener("click", () => this.close());
    this._menu.addEventListener("click", (e) => {
      if (e.target.closest("a[href]")) this.close(false);
    });
    this._onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); this.close(); return; }
      if (e.key !== "Tab") return;
      const items = [...this._menu.querySelectorAll("a[href], button:not([disabled])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    // Si el botón de menú deja de verse (desktop), no tiene sentido el menú abierto.
    this._observer = new ResizeObserver(() => {
      if (this.isOpen && getComputedStyle(this._toggle).display === "none") this.close(false);
    });
    this._observer.observe(this._bar);
  }

  disconnectedCallback() {
    if (this._observer) this._observer.disconnect();
    document.removeEventListener("keydown", this._onKey);
  }

  get isOpen() {
    return this._menu && this._menu.hasAttribute("data-open");
  }

  open() {
    if (this.isOpen) return;
    this._menu.inert = false;
    // El círculo del menú nace en el centro del botón que lo abre.
    const r = this._toggle.getBoundingClientRect();
    this._menu.style.setProperty("--dime-reveal-x", `${r.left + r.width / 2}px`);
    this._menu.style.setProperty("--dime-reveal-y", `${r.top + r.height / 2}px`);
    this._menu.setAttribute("data-open", "");
    this._toggle.setAttribute("aria-expanded", "true");
    this._setBackgroundInert(true);
    this._scrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", this._onKey);
    this._close.focus();
  }

  close(returnFocus = true) {
    if (!this.isOpen) return;
    this._menu.removeAttribute("data-open");
    this._toggle.setAttribute("aria-expanded", "false");
    this._setBackgroundInert(false);
    this._menu.inert = true;
    document.documentElement.style.overflow = "";
    document.removeEventListener("keydown", this._onKey);
    if (returnFocus) this._toggle.focus();
  }

  /** Deja inert todo lo que hay en la página salvo el propio Header (y su menú). */
  _setBackgroundInert(on) {
    if (on) {
      let node = this;
      while (node.parentElement && node !== document.body) {
        for (const sibling of node.parentElement.children) {
          if (sibling !== node && !sibling.inert && sibling.tagName !== "SCRIPT") {
            sibling.inert = true;
            this._inerted.push(sibling);
          }
        }
        node = node.parentElement;
      }
      this._bar.inert = true; // la barra queda debajo del menú
    } else {
      this._inerted.forEach((el) => { el.inert = false; });
      this._inerted = [];
      this._bar.inert = false;
    }
  }
}

define("dime-nav-header", DimeHeader);
