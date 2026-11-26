import React from "react";

// Pestañas de un componente (D-014, como en Carbon): cada una es una página propia
// y esta barra es navegación (nav + aria-current), no un componente de pestañas ARIA.
const TABS = [
  { key: "uso", label: "Uso" },
  { key: "codigo", label: "Código" },
  { key: "accesibilidad", label: "Accesibilidad" },
];

// Id de la página en Storybook a partir de su título ("Componentes/Link/Código").
const idOf = (component, label) =>
  `componentes-${component}-${label}`.toLowerCase().replace(/[\s/]+/g, "-") + "--docs";

export function ComponentTabs({ component, current }) {
  return (
    <nav className="dime-comp-tabs sb-unstyled" aria-label={`Documentación de ${component}`}>
      <ul>
        {TABS.map((t) => (
          <li key={t.key}>
            <a
              href={`/?path=/docs/${idOf(component, t.label)}`}
              target="_top"
              aria-current={t.key === current ? "page" : undefined}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
