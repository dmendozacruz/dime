// <dime-back-to-top> · DIME. Web component en light DOM (D-017): envuelve el
// enlace (<a href="#top">), que funciona solo aunque el script no cargue. Añade:
// aparecer al bajar pasado un umbral (atributo threshold, 400 px por defecto) y
// ocultarse arriba; al activarlo, scroll suave (salvo con "reducir movimiento") y
// el foco pasa al principio de la página.
// En tablet y mobile (hasta 64 rem) solo aparece cuando la persona sube: mientras
// lee hacia abajo no tapa el contenido. El atributo scroll-up-only lo fuerza en
// cualquier ancho.
import { define } from "../shared/define.js";

export class DimeBackToTop extends HTMLElement {
  connectedCallback() {
    if (this._ready) return;
    this._ready = true;
    const link = this.querySelector("a[href^='#']");
    if (!link) return;
    const threshold = Number(this.getAttribute("threshold") ?? 400);
    const target = document.querySelector(link.getAttribute("href"));
    const compact = window.matchMedia("(max-width: 64rem)");
    let anchorY = window.scrollY; // desde dónde se mide la dirección
    let goingUp = false;
    const update = () => {
      const y = window.scrollY;
      // La dirección cambia solo tras 8 px de recorrido, para ignorar temblores.
      if (Math.abs(y - anchorY) >= 8) {
        goingUp = y < anchorY;
        anchorY = y;
      }
      const upOnly = compact.matches || this.hasAttribute("scroll-up-only");
      if (y > threshold && (!upOnly || goingUp)) link.removeAttribute("data-hidden");
      else link.setAttribute("data-hidden", "");
    };
    if (this.hasAttribute("threshold")) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      compact.addEventListener("change", update);
    }
    link.addEventListener("click", (e) => {
      if (!target) return;
      e.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      target.focus({ preventScroll: true });
    });
  }
}

define("dime-back-to-top", DimeBackToTop);
