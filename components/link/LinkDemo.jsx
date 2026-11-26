import React from "react";
import { linkHTML } from "./link.stories.js";

const base = { text: "Link", href: "#", size: "small", inverted: false, showIconLeft: false, showIconRight: true, showText: true, disabled: false, ariaLabel: "", newTab: false };
export const html = (args) => linkHTML({ ...base, ...args });

const STATES = ["Default", "Hover", "Active", "Focus", "Disabled"];

/** Los cinco estados en fila. Hover, Active y Focus se fuerzan solo en esta muestra
 *  (data-demo), para verlos sin tener que pasar el ratón: no forman parte del componente. */
export function LinkStates({ inverted = false, size = "small" }) {
  return (
    <div className={`dime-states sb-unstyled${inverted ? " dime-states--inverted" : ""}`} aria-hidden="true">
      {STATES.map((s) => (
        <figure key={s} className="dime-states__item">
          <div
            data-demo={s.toLowerCase()}
            dangerouslySetInnerHTML={{ __html: html({ inverted, size, disabled: s === "Disabled" }).replace("<a ", '<a tabindex="-1" ') }}
          />
          <figcaption>{s}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Overview, como en Astryx: un solo panel con las combinaciones de las propiedades
 *  de Figma juntas y sin rótulos (Size small y large, flecha a la derecha o a la
 *  izquierda, Inverted sobre fondo oscuro). Muestras sin foco (tabindex -1): los
 *  enlaces que se pueden usar están en la pestaña Código. */
export function LinkOverview() {
  const noFocus = (h) => h.replace("<a ", '<a tabindex="-1" ');
  const light = [
    html({}),
    html({ size: "large" }),
    html({ showIconLeft: true, showIconRight: false }),
  ];
  const dark = [html({ inverted: true }), html({ size: "large", inverted: true })];
  return (
    <div className="dime-overview sb-unstyled" aria-hidden="true">
      {light.map((h, i) => <span key={i} dangerouslySetInnerHTML={{ __html: noFocus(h) }} />)}
      <span className="dime-overview__dark">
        {dark.map((h, i) => <span key={i} dangerouslySetInnerHTML={{ __html: noFocus(h) }} />)}
      </span>
    </div>
  );
}
