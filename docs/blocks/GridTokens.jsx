import React from "react";
import { Row, List } from "./shared.jsx";

// Estilos de grid de Figma (página Layout y grids). Los estilos de grid no entran
// en el volcado de variables, así que los valores viven aquí; margen y gutter
// apuntan a tokens de espaciado.
// Valores releídos en Figma (estilos de grid locales) el 24-11-2026.
const GRIDS = [
  {
    name: "grid mobile",
    columns: 4,
    gutter: { px: 16, token: "--space-4" },
    margin: { px: 24, token: "--space-6" },
    width: 390,
    use: "Hasta 768 px. Se diseña a 390 px y se revisa a 360 px.",
  },
  {
    name: "grid tablet",
    columns: 8,
    gutter: { px: 16, token: "--space-4" },
    margin: { px: 32, token: "--space-7" },
    width: 768,
    use: "De 769 a 1024 px. Se diseña a 769 px, el peor caso del tramo.",
  },
  {
    name: "grid desktop",
    columns: 12,
    gutter: { px: 24, token: "--space-6" },
    margin: { px: 120, token: "--space-13" },
    width: 1440,
    use: "Contenido de todas las páginas desde 1025 px. 1440 px es el ancho máximo: por encima se centra.",
  },
  {
    name: "grid header desktop",
    columns: 12,
    gutter: { px: 24, token: "--space-6" },
    margin: { px: 64, token: "--space-10" },
    width: 1440,
    use: "Solo el header y el botón Back, que se alinean con el logo y no con el contenido.",
  },
];

const pct = (px, width) => `${(px / width) * 100}%`;

/** Muestra a escala: margen, gutter y columnas del grid dibujados sobre el ancho de referencia. */
function GridSample({ g }) {
  return (
    <span
      className="dime-grid-sample"
      style={{ paddingInline: pct(g.margin.px, g.width), columnGap: pct(g.gutter.px, g.width) }}
    >
      {Array.from({ length: g.columns }, (_, i) => (
        <span key={i} className="dime-grid-sample__col" />
      ))}
    </span>
  );
}

export function GridStyles() {
  return (
    <List>
      {GRIDS.map((g) => (
        <Row
          key={g.name}
          example={<GridSample g={g} />}
          raw={`${g.columns} columnas · ${g.width} px`}
          name={g.name}
          code={g.margin.token}
        >
          <p className="dime-token__desc">{g.use}</p>
          <p className="dime-token__desc">
            Margen <code>{g.margin.px} px</code> (<code>{g.margin.token}</code>) · gutter{" "}
            <code>{g.gutter.px} px</code> (<code>{g.gutter.token}</code>).
          </p>
          {g.note && <p className="dime-token__alias">{g.note}</p>}
        </Row>
      ))}
    </List>
  );
}
