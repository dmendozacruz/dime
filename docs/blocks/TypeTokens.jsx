import React from "react";
import { Row, List } from "./shared.jsx";
import meta from "../../tokens/tokens.meta.json";

const WEIGHT_NAMES = { 300: "Light", 400: "Regular", 500: "Medium", 700: "Bold" };

// Estilos de texto que usan un token concreto, para explicar dónde se aplica.
const stylesUsing = (token) =>
  meta.textStyles.filter((t) => `--${t.fs}` === token || `--${t.lh}` === token).map((t) => t.name);

function UsedBy({ token }) {
  const names = stylesUsing(token);
  if (!names.length) return null;
  return (
    <p className="dime-token__desc">
      Lo usan: {names.join(", ")}.
    </p>
  );
}

/** Estilos de texto de Figma cuyo nombre empieza por `prefix` ("Heading", "Body"…). */
export function TextStyles({ prefix }) {
  const styles = meta.textStyles.filter((t) => t.name.startsWith(prefix));
  return (
    <List>
      {styles.map((t) => {
        const cls = t.cls.slice(1);
        return (
          <Row
            key={t.cls}
            example={<span className={cls}>Aa</span>}
            raw={`${t.size}/${t.lineHeight} · ${t.weight}`}
            name={t.name}
            code={t.cls}
            copy={cls}
          >
            <p className="dime-token__desc">
              Tamaño <code>var(--{t.fs})</code> · interlineado <code>var(--{t.lh})</code>
              {t.upper && <> · en mayúsculas, con espaciado de letra {Math.round(t.ls * 100)}%</>}.
            </p>
          </Row>
        );
      })}
    </List>
  );
}

/** Tokens de tamaño de fuente. */
export function FontSizes() {
  const tokens = meta.typography.filter((t) => t.css.startsWith("--font-size-"));
  return (
    <List>
      {tokens.map((t) => (
        <Row key={t.css} example={<span style={{ fontSize: `var(${t.css})`, lineHeight: 1 }}>Aa</span>} raw={`${t.value} · ${t.px}px`} name={t.figma} code={t.css}>
          <UsedBy token={t.css} />
        </Row>
      ))}
    </List>
  );
}

/** Tokens de interlineado: la muestra es una caja con la altura de la línea. */
export function LineHeights() {
  const tokens = meta.typography.filter((t) => t.css.startsWith("--line-height-"));
  return (
    <List>
      {tokens.map((t) => (
        <Row key={t.css} example={<span className="dime-line-sample" style={{ height: `var(${t.css})` }} />} raw={`${t.value} · ${t.px}px`} name={t.figma} code={t.css}>
          <UsedBy token={t.css} />
        </Row>
      ))}
    </List>
  );
}

/** Pesos de la familia. */
export function FontWeights() {
  const tokens = meta.typography.filter((t) => t.css.startsWith("--font-weight-")).sort((a, b) => a.weight - b.weight);
  return (
    <List>
      {tokens.map((t) => (
        <Row key={t.css} example={<span style={{ fontWeight: t.weight }}>Aa</span>} raw={`${t.weight}`} name={`${t.figma} · ${WEIGHT_NAMES[t.weight]}`} code={t.css} />
      ))}
    </List>
  );
}

/** Familia tipográfica. */
export function FontFamily() {
  const t = meta.typography.find((x) => x.css === "--font-family-base");
  return (
    <List>
      <Row example={<span>Aa</span>} raw="ABC Monument Grotesk" name={t.figma} code={t.css}>
        <p className="dime-token__desc">
          Fuente única del sistema. Si no carga, se usan Helvetica Neue o Arial.
        </p>
        <p className="dime-token__alias">
          <code>{t.value}</code>
        </p>
      </Row>
    </List>
  );
}

/** Tokens de interacción (botones y enlaces). */
export function InteractionTokens() {
  const tokens = meta.typography.filter((t) => t.collection === "Component");
  return (
    <List>
      {tokens.map((t) => (
        <Row
          key={t.css}
          example={
            t.weight ? (
              <span style={{ fontWeight: t.weight }}>Aa</span>
            ) : t.css.includes("line-height") ? (
              <span className="dime-line-sample" style={{ height: `var(${t.css})` }} />
            ) : (
              <span style={{ fontSize: `var(${t.css})`, lineHeight: 1 }}>Aa</span>
            )
          }
          raw={t.weight ? String(t.weight) : `${t.value} · ${t.px}px`}
          name={t.figma}
          code={t.css}
        />
      ))}
    </List>
  );
}
