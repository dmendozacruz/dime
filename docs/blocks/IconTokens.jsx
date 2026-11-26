import React, { useState } from "react";
import { Row, List } from "./shared.jsx";

// Los nombres salen de los archivos de public/icons: si se añade o renombra uno,
// la página se actualiza sola (Storybook no ve archivos movidos hasta reiniciarlo).
// Código de cada SVG tal cual está en el archivo: es lo que copia su tarjeta.
const svgs = import.meta.glob("../../public/icons/*.svg", { query: "?raw", import: "default", eager: true });
const svgOf = Object.fromEntries(Object.entries(svgs).map(([f, code]) => [f.split("/").pop().replace(".svg", ""), code.trim()]));
const names = Object.keys(svgOf).sort();
const label = (n) => n.replace(/-/g, " ");

// Un solo SVG de 20 px sirve para los tres tamaños: es el mismo dibujo escalado
// y el trazo crece en proporción (1 → 1,2 → 1,4 px).
const SIZES = [
  { px: 20, token: "--size-20", stroke: "1 px" },
  { px: 24, token: "--size-24", stroke: "1,2 px" },
  { px: 28, token: "--size-28", stroke: "1,4 px" },
];

/** Tarjeta con un SVG, como en Nueva York: la imagen y su nombre forman un solo botón
 *  que copia el código del SVG. Debajo, el mensaje "Copiar al portapapeles" / "Copiado".
 *  La usan Iconos y Logos. */
export function SvgCard({ name, src, svg, imgClass = "dime-icon-card__img", note }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* el portapapeles puede estar bloqueado en el iframe: no rompemos la página */
    }
  };
  return (
    <li className="dime-icon-item">
      <button
        type="button"
        className="dime-icon-card"
        onClick={copy}
        aria-label={`${name}: copiar SVG`}
        data-copied={copied || undefined}
      >
        <img className={imgClass} src={src} alt="" />
        <span className="dime-icon-card__name">{name}</span>
        {note && <span className="dime-icon-card__note">{note}</span>}
      </button>
      <span className="dime-icon-card__msg" aria-hidden="true">
        {copied && <span className="dime-icon-card__check" />}
        {copied ? "Copiado" : "Copiar al portapapeles"}
      </span>
      <span className="dime-visually-hidden" role="status">{copied ? `SVG de ${name} copiado` : ""}</span>
    </li>
  );
}

const IconCard = ({ name }) => <SvgCard name={label(name)} src={`icons/${name}.svg`} svg={svgOf[name]} />;

/** Catálogo: todos los iconos en tarjetas; al pulsar una se copia el código de su SVG. */
export function IconGrid() {
  return (
    <ul className="dime-icons sb-unstyled">
      {names.map((n) => (
        <IconCard key={n} name={n} />
      ))}
    </ul>
  );
}

/** Los tres tamaños: el mismo icono, con el token de tamaño que lo gobierna. */
export function IconSizes() {
  return (
    <List>
      {SIZES.map((s) => (
        <Row
          key={s.px}
          example={<img src="icons/arrow-right.svg" alt="" style={{ width: `var(${s.token})`, height: `var(${s.token})` }} />}
          raw={`${s.px}px · trazo ${s.stroke}`}
          name={`Icon / ${s.px}`}
          code={s.token}
        />
      ))}
    </List>
  );
}

/** Color por token: el icono como máscara pintada con el color que toque, sobre claro y oscuro. */
export function IconColors() {
  const mask = (n) => ({ maskImage: `url(icons/${n}.svg)`, WebkitMaskImage: `url(icons/${n}.svg)` });
  return (
    <div className="dime-icon-colors" aria-hidden="true">
      <span className="dime-icon-colors__panel dime-icon-colors__panel--light">
        <span className="dime-icon-mask" style={{ ...mask("download"), backgroundColor: "var(--color-content-default)" }} />
      </span>
      <span className="dime-icon-colors__panel dime-icon-colors__panel--dark">
        <span className="dime-icon-mask" style={{ ...mask("download"), backgroundColor: "var(--color-content-inverse)" }} />
      </span>
    </div>
  );
}
