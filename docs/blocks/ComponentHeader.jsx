import React from "react";
import { linkHTML } from "../../components/link/link.stories.js";

const FIGMA_FILE = "https://www.figma.com/design/HUTWjaHvtErDoUZoUnDTLd";

/** Cabecera de un componente, como en Nueva York: descripción y, debajo, la etiqueta
 *  de accesibilidad (WCAG 2.2 AA), el enlace a Figma y la fecha de la última
 *  actualización. El enlace es el propio Link de DIME. */
export function ComponentHeader({ description, figmaNode, updated, wcag = "AA" }) {
  const figma = linkHTML({
    text: "Ver en Figma",
    href: `${FIGMA_FILE}?node-id=${figmaNode.replace(":", "-")}`,
    size: "small",
    showIconRight: true,
    showText: true,
    newTab: true,
    ariaLabel: "Ver en Figma (se abre en una pestaña nueva)",
  });
  return (
    <div className="dime-comp-header sb-unstyled">
      <p className="dime-comp-header__desc">{description}</p>
      <div className="dime-comp-header__meta">
        <span className="dime-wcag">
          <span className="dime-wcag__icon" aria-hidden="true" />
          WCAG 2.2 <strong>{wcag}</strong>
        </span>
        <span dangerouslySetInnerHTML={{ __html: figma }} />
        <span className="dime-comp-header__date">
          Última actualización: <time dateTime={updated.split("-").reverse().join("-")}>{updated}</time>
        </span>
      </div>
    </div>
  );
}
