import React from "react";
import { Markdown, AnchorMdx, CodeOrSourceMdx, HeadersMdx } from "@storybook/addon-docs/blocks";
import { ScrollTable } from "./ScrollTable.jsx";

// Markdown de Storybook con las tablas dentro de su propia caja de scroll.
// Si se pasa `options.overrides`, Storybook sustituye los suyos (código, enlaces y títulos con ancla):
// por eso se repiten aquí tal cual los tiene el bloque, y solo se añade la tabla.
const overrides = { code: CodeOrSourceMdx, a: AnchorMdx, ...HeadersMdx, table: ScrollTable };

export function MarkdownScroll({ children }) {
  return <Markdown options={{ overrides }}>{children}</Markdown>;
}
