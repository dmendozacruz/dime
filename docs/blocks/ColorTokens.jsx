import React from "react";
import { CodeBox } from "./shared.jsx";
import meta from "../../tokens/tokens.meta.json";

const WHITE = "#ffffff";
const BLACK = "#1a1a1a"; // base/black: el negro de DIME, no #000

// Contraste WCAG 2.x entre dos colores hex.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
function level(ratio) {
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA grande";
  return "No apto texto";
}

/** Muestra de color con el contraste dentro, como en el design system de Nueva York:
 *  el número es el contraste del texto (blanco o negro, el que mejor se lea) sobre ese color. */
function Swatch({ hex, size = "l" }) {
  if (hex === "transparent") {
    return <span className={`dime-swatch dime-swatch--${size} dime-swatch--transparent`} aria-hidden="true" />;
  }
  const onWhite = contrast(hex, WHITE);
  const onBlack = contrast(hex, BLACK);
  const ink = onWhite >= onBlack ? WHITE : BLACK;
  const ratio = Math.max(onWhite, onBlack);
  return (
    <span className={`dime-swatch dime-swatch--${size}`} style={{ background: hex, color: ink }}>
      <span className="dime-swatch__contrast" aria-hidden="true">
        <span className="dime-swatch__dot" />
        {ratio.toFixed(2)}
      </span>
      <span className="dime-visually-hidden">
        Contraste con texto {ink === WHITE ? "blanco" : "negro"}: {ratio.toFixed(2)} a 1, {level(ratio)}
      </span>
    </span>
  );
}

/** Fila de un token: muestra + valor | nombre + uso | variable CSS. */
function TokenBlock({ token }) {
  return (
    <li className="dime-token">
      <div className="dime-token__example">
        <Swatch hex={token.hex} />
        <code className="dime-token__raw">{token.hex}</code>
      </div>
      <div className="dime-token__details">
        <h4 className="dime-token__name">{token.figma}</h4>
        {token.description && <p className="dime-token__desc">{token.description}</p>}
        {token.alias && (
          <p className="dime-token__alias">
            Usa <code>{token.alias}</code>
          </p>
        )}
      </div>
      <div className="dime-token__info">
        <CodeBox css={token.css} />
      </div>
    </li>
  );
}

/** Lista de tokens semánticos cuyo nombre de Figma empieza por `prefix` (p. ej. "background/"). */
export function SemanticColors({ prefix }) {
  const tokens = meta.colors.filter((c) => c.figma.startsWith(prefix));
  return (
    <ul className="dime-tokens sb-unstyled">
      {tokens.map((t) => (
        <TokenBlock key={t.css} token={t} />
      ))}
    </ul>
  );
}

/** Primitivos de color de una familia (p. ej. "neutral/"), con la misma fila que los semánticos. */
export function PrimitiveColors({ prefix }) {
  const tokens = meta.colors.filter((c) => c.collection === "Globals" && c.figma.startsWith(prefix) && !c.figma.startsWith("feedback/"));
  return (
    <ul className="dime-tokens sb-unstyled">
      {tokens.map((t) => (
        <TokenBlock key={t.css} token={t} />
      ))}
    </ul>
  );
}
