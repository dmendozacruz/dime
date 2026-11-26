import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "@storybook/icons";

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* el portapapeles puede estar bloqueado en el iframe: no rompemos la página */
    }
  };
  return (
    <button type="button" className="dime-copy" onClick={copy} aria-label={`Copiar ${text}`} data-copied={copied || undefined}>
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
      <span className="dime-copy__tip" aria-hidden="true">{copied ? "Copiado" : "Copiar"}</span>
      <span className="dime-visually-hidden" role="status">{copied ? "Copiado" : ""}</span>
    </button>
  );
}

/** Caja gris con la variable CSS (o la clase) y el botón de copiar. */
export const CodeBox = ({ css, copy = `var(${css})` }) => (
  <div className="dime-codebox">
    <code>{css}</code>
    <CopyButton text={copy} />
  </div>
);

/** Fila de token con la composición de Nueva York: ejemplo + valor | nombre + uso | código. */
export function Row({ example, raw, name, children, code, copy }) {
  return (
    <li className="dime-token">
      <div className="dime-token__example">
        <div className="dime-type-example" aria-hidden="true">
          {example}
        </div>
        <code className="dime-token__raw">{raw}</code>
      </div>
      <div className="dime-token__details">
        <h4 className="dime-token__name">{name}</h4>
        {children}
      </div>
      <div className="dime-token__info">
        <CodeBox css={code} copy={copy} />
      </div>
    </li>
  );
}

export const List = ({ children }) => <ul className="dime-tokens sb-unstyled">{children}</ul>;
