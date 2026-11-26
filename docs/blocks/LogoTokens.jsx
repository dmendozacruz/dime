import React from "react";
import { SvgCard } from "./IconTokens.jsx";

// Código de cada SVG tal cual está en public/logos: es lo que copia su tarjeta.
const svgs = import.meta.glob("../../public/logos/*.svg", { query: "?raw", import: "default", eager: true });
const svgOf = Object.fromEntries(Object.entries(svgs).map(([f, code]) => [f.split("/").pop().replace(".svg", ""), code.trim()]));

// Nombres y notas del showcase de Figma (página Logos, «Logos · showcase»).
const BRAND = [
  { file: "name-diana", name: "Name Diana", note: "Logo de la cabecera: el nombre en vector, dentro de un enlace a la página de inicio. El nombre accesible lo da el enlace." },
  { file: "brand-asterisk", name: "brand Asterisk", note: "Símbolo de la marca." },
  { file: "icon-interactive-default", name: "Icon interactive · Default", note: "Let’s talk en reposo. El texto circular gira." },
  { file: "icon-interactive-hover", name: "Icon interactive · hover", note: "Al pasar el ratón o con el foco, el asterisco cambia a la cara sonriente." },
];

const CLIENTS = [
  { file: "ulma", name: "Ulma" },
  { file: "comunidad-madrid", name: "Comunidad madrid" },
  { file: "ibercaja", name: "Ibercaja" },
  { file: "santander", name: "Santander" },
  { file: "inditex", name: "Inditex" },
  { file: "feci", name: "FECI" },
];

// Medida real del SVG (width × height del archivo), para la nota de cada logo de cliente.
const sizeOf = (file) => {
  const m = svgOf[file]?.match(/<svg[^>]*\swidth="(\d+)"[^>]*\sheight="(\d+)"/);
  return m ? `${m[1]} × ${m[2]} px` : "";
};

const Grid = ({ items }) => (
  <ul className="dime-icons dime-logos sb-unstyled">
    {items.map((l) => (
      <SvgCard
        key={l.file}
        name={l.name}
        src={`logos/${l.file}.svg`}
        svg={svgOf[l.file]}
        imgClass="dime-logo-card__img"
        note={l.note ?? sizeOf(l.file)}
      />
    ))}
  </ul>
);

/** Marca personal: nombre, asterisco y los dos estados del Let’s talk. */
export const BrandLogos = () => <Grid items={BRAND} />;

/** Los 6 logos de cliente, a su tamaño real (todos de 60 px de alto). */
export const ClientLogos = () => <Grid items={CLIENTS} />;
