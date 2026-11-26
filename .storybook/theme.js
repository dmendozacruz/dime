import { create } from "storybook/theming/create";
import pkg from "../package.json";

// Colores tomados de los tokens de DIME (valores fijos: el tema de Storybook no lee CSS).
export default create({
  base: "light",
  // Asterisco + nombre y versión (la de package.json) como HTML. Storybook solo interpreta el título como HTML
  // si brandImage es null. El asterisco es decorativo (alt=""): el nombre accesible
  // del enlace es el texto.
  brandTitle:
    '<span style="display:inline-flex;align-items:center;gap:12px;color:#1a1a1a">' +
    '<img src="./brand/asterisk-dark.svg" width="32" height="32" alt="" style="display:block">' +
    '<span style="display:flex;flex-direction:column"><span style="font-weight:700;font-size:16px;line-height:24px">DIME Design System</span>' +
    `<span style="font-weight:400;font-size:14px;line-height:16px;color:#5b5b5b">Versión ${pkg.version}</span></span></span>`,
  brandImage: null,
  brandUrl: "https://dianamendozacruz.com",
  brandTarget: "_blank",

  fontBase: '"ABC Monument Grotesk", "Helvetica Neue", Arial, sans-serif',
  fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',

  colorPrimary: "#1a1a1a", // content/default
  colorSecondary: "#1a1a1a",

  appBg: "#f7f7f7", // background/subtle
  appContentBg: "#ffffff", // background/default
  appPreviewBg: "#ffffff",
  appBorderColor: "#dbdbdb", // border/subtle
  appBorderRadius: 0,

  textColor: "#1a1a1a", // content/default
  textMutedColor: "#5b5b5b", // content/subtle
  textInverseColor: "#ffffff",

  barBg: "#ffffff",
  barTextColor: "#5b5b5b",
  barSelectedColor: "#1a1a1a",
  barHoverColor: "#1a1a1a",

  inputBg: "#ffffff",
  inputBorder: "#8c8c8c", // border/medium
  inputTextColor: "#1a1a1a",
  inputBorderRadius: 0,
});
