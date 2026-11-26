# DIME · vocabulario

Lenguaje compartido entre diseño (Figma), documentación (Storybook) y código (la
web) para hablar del design system DIME. Este documento es la fuente de verdad
del vocabulario.

## Lenguaje

**DIME**:
El design system de dianamendozacruz.com: librería de Figma, tokens, componentes
y su documentación.
_Evitar_: UI kit, guía de estilos

**Librería DIME**:
El archivo de Figma `HUTWjaHvtErDoUZoUnDTLd`. Es la fuente de verdad visual hoy, como punto de partida (D-018: después lo será Storybook).
_Evitar_: el Figma del portfolio, Nuevo portfolio (es otro archivo)

**Foundation**:
Las reglas visuales de base: color, tipografía, espaciado, elevación, layout,
iconos y logos.
_Evitar_: tokens (los tokens son cómo se expresa la foundation en código)

**Token primitivo**:
Valor con nombre que pertenece a una paleta o escala y no dice para qué se usa.
En Figma, colección *Globals* (`neutral/900`, `space/6`, `size/24`).
_Evitar_: token base, token global, valor

**Token semántico**:
Token que dice para qué se usa y apunta a un primitivo. En Figma, colección
*Alias* (`content/default`, `border/subtle`) y el grupo `feedback/*`.
_Evitar_: alias (es solo el nombre de la colección)

**Token de componente**:
Token propio de un tipo de componente. En Figma, colección *Component*
(`interaction/size/large`).

**Estilo de texto**:
Combinación de tamaño, interlineado y peso definida en Figma
(`Body/Large/regular`). En código, una clase `.text-[nivel]-[peso]`.
_Evitar_: tipografía (es la foundation entera)

**Volcado de Figma**:
`tokens/source/figma.json`: lo que se leyó de la librería en una fecha concreta.
No se edita a mano.
_Evitar_: exportación, snapshot

**Artefacto generado**:
Archivo que produce `npm run tokens` a partir del volcado. No se edita a mano.
_Evitar_: fuente, CSS de tokens a mano

**Componente**:
Pieza de interfaz reutilizable con anatomía, variantes, estados y
comportamiento propios, publicada en la librería DIME.
_Evitar_: patrón, sección

**Variante**:
Versión de un componente definida en Figma con una propiedad de tipo variante
(`State=open`, `Type=primary`).

**Estado**:
Situación en la que puede estar un componente: close/open, hover, focus,
disabled, error… Solo existen los que están en Figma o los que Diana decide.

**Patrón**:
Composición de componentes que resuelve una tarea recurrente (el footer
compacto, la cabecera de un caso de estudio).
_Evitar_: componente

**Contrato de componente**:
Acuerdo verificable sobre anatomía, contenido, estados, comportamiento y
accesibilidad de un componente. Vive en `docs/work/[componente].md` y en su
página de Storybook.
_Evitar_: captura de Figma, lista de props

**Documentación en Figma**:
La sección *Documentation* de cada componente en la librería, en español y
simple: anatomía, cuándo usarlo, recomendaciones, do y don't, accesibilidad
breve, properties y responsive.

**Documentación en Storybook**:
La referencia para desarrollo: código, especificaciones, tokens usados,
accesibilidad detallada y ejemplos ejecutables.

**Story**:
Ejemplo ejecutable en Storybook que muestra un estado o escenario concreto.
_Evitar_: captura, demo

**Patrón ARIA**:
Semántica y comportamiento descritos por WAI-ARIA y, si existe, por el APG.
React Aria es una implementación de referencia de esos patrones.
_Evitar_: diseño visual, requisito de WCAG

**Doble anillo de foco**:
El foco de teclado de DIME: un hueco de 2 px, un anillo interior de 2 px
`focus/ring-inner` (oscuro) y un anillo exterior de 2 px `focus/ring` (amarillo), como
en Figma. En código, el hueco se rellena con el color de fondo (`--dime-focus-gap`).
_Evitar_: outline, focus ring a secas

**Web**:
dianamendozacruz.com, repositorio `mi-portfolio`. Consume los tokens de DIME.
Sirve de referencia de uso, no de verdad visual.
