import React from "react";

/** Pareja Hazlo / Evítalo, como en Figma: icono y palabra, nunca solo color. */
export function DoDont({ items }) {
  return (
    <ul className="dime-dodont sb-unstyled">
      {items.map((it, i) => (
        <li key={i} className={`dime-dodont__item dime-dodont__item--${it.type}`}>
          <div className="dime-dodont__example" dangerouslySetInnerHTML={{ __html: it.html }} />
          <p className="dime-dodont__label">
            <span className="dime-dodont__icon" aria-hidden="true" />
            {it.type === "do" ? "Hazlo" : "Evítalo"}
          </p>
          <p className="dime-dodont__text">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
