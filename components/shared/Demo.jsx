import React from "react";

// Muestras de la pestaña Uso, comunes a todos los componentes. Son ilustraciones:
// sin foco (tabindex -1) y ocultas al lector de pantalla. Los componentes que se
// pueden usar están en la pestaña Código.
const noFocus = (h) => h.replace(/<(a|button)\s/g, '<$1 tabindex="-1" ');

/** Overview, como en Astryx: un solo panel con las variantes juntas y sin rótulos.
 *  `white` va en un bloque blanco y `dark` en uno oscuro, dentro del panel. */
export function Overview({ light = [], white = [], dark = [] }) {
  return (
    <div className="dime-overview sb-unstyled" aria-hidden="true">
      {light.map((h, i) => <span key={i} dangerouslySetInnerHTML={{ __html: noFocus(h) }} />)}
      {white.length > 0 && (
        <span className="dime-overview__white">
          {white.map((h, i) => <span key={i} dangerouslySetInnerHTML={{ __html: noFocus(h) }} />)}
        </span>
      )}
      {dark.length > 0 && (
        <span className="dime-overview__dark">
          {dark.map((h, i) => <span key={i} dangerouslySetInnerHTML={{ __html: noFocus(h) }} />)}
        </span>
      )}
    </div>
  );
}

/** Fila de estados con su rótulo. `demo` fuerza Hover, Active o Focus solo en la
 *  muestra (data-demo): no forma parte del componente. `plain` pone el fondo blanco,
 *  para componentes cuyo Hover es gris. `card` en un item le pone fondo blanco solo
 *  a esa muestra (como en Figma, para que un Hover gris se vea sobre el panel). */
export function States({ items, inverted = false, plain = false }) {
  const mod = inverted ? " dime-states--inverted" : plain ? " dime-states--plain" : "";
  return (
    <div className={`dime-states sb-unstyled${mod}`} aria-hidden="true">
      {items.map(({ label, html, demo, card }) => (
        <figure key={label} className={`dime-states__item${card ? " dime-states__item--card" : ""}`}>
          <div data-demo={demo || label.toLowerCase()} dangerouslySetInnerHTML={{ __html: noFocus(html) }} />
          <figcaption>{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
