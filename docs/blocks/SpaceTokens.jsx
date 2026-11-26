import React from "react";
import { Row, List } from "./shared.jsx";
import meta from "../../tokens/tokens.meta.json";

const rem = (px) => (px === 0 ? "0" : `${+(px / 16).toFixed(4)}rem`);

/** Escala de espaciado: la muestra es una barra con el ancho del token, como en Nueva York. */
export function SpaceScale() {
  const tokens = meta.dimensions.filter((t) => t.css.startsWith("--space-"));
  return (
    <List>
      {tokens.map((t) => (
        <Row
          key={t.css}
          example={<span className="dime-space-bar" style={{ width: `var(${t.css})` }} />}
          raw={`${t.px}px · ${rem(t.px)}`}
          name={t.figma.replace("Globals/", "")}
          code={t.css}
        />
      ))}
    </List>
  );
}

// Tokens de tipografía y componentes que apuntan a cada tamaño base.
const aliasesOf = (css) => meta.typography.filter((t) => t.value === `var(${css})`).map((t) => t.css);

/** Escala base de tamaños: de ella salen los tamaños de texto, interlineados y tokens de componente. */
export function SizeScale() {
  const tokens = meta.dimensions.filter((t) => t.css.startsWith("--size-"));
  return (
    <List>
      {tokens.map((t) => {
        const used = aliasesOf(t.css);
        return (
          <Row
            key={t.css}
            example={<span className="dime-space-bar dime-space-bar--size" style={{ width: `var(${t.css})` }} />}
            raw={`${t.px}px · ${rem(t.px)}`}
            name={t.figma.replace("Globals/", "")}
            code={t.css}
          >
            {used.length > 0 && (
              <p className="dime-token__desc">
                Lo usan: {used.map((u, i) => (
                  <React.Fragment key={u}>
                    {i > 0 && ", "}
                    <code>{u}</code>
                  </React.Fragment>
                ))}
                .
              </p>
            )}
          </Row>
        );
      })}
    </List>
  );
}

/** Sombras de elevación: una tarjeta blanca con la sombra aplicada. */
export function Elevation() {
  return (
    <List>
      {meta.effects.map((e) => (
        <Row key={e.css} example={<span className="dime-shadow-card" style={{ boxShadow: `var(${e.css})` }} />} raw={e.value} name={e.name} code={e.css}>
          {e.description && <p className="dime-token__desc">{e.description}</p>}
        </Row>
      ))}
    </List>
  );
}

/** Desenfoque de fondo: un texto que pasa por debajo de un panel al 85 % con el desenfoque. */
export function Blur() {
  return (
    <List>
      {meta.blurs.map((b) => (
        <Row
          key={b.css}
          example={
            <span className="dime-blur-sample" aria-hidden="true">
              <span className="dime-blur-sample__text">Texto que pasa por debajo del header</span>
              <span className="dime-blur-sample__panel" style={{ backdropFilter: `var(${b.css})`, WebkitBackdropFilter: `var(${b.css})` }} />
            </span>
          }
          raw={b.value}
          name={b.name}
          code={b.css}
        >
          {b.description && <p className="dime-token__desc">{b.description}</p>}
        </Row>
      ))}
    </List>
  );
}
