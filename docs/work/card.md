# Card

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Cards` (`19:20`). Lectura 21-11-2026 vía MCP oficial
  (`use_figma` en lectura). Dos secciones:
  - Sección `Cards` (`190:19349`) con el set **`card`** (`102:7204`, 18
    variantes, 300 × 300 px):
    - `State`: **Hover · Default · Focus · focus** (dos valores que solo se
      diferencian en la mayúscula; `focus` en minúscula lo usa solo Ulma).
    - `Type`: Inditex · Ulma · Shori · Iplace · N12 · Preply (un valor por
      caso de estudio; cambia la imagen).
    - `Title` (texto, "INDITEX"), `Subtitle` (texto, "Product design ·
      strategic design · DESIGN SYSTEM"), `Show lock` (booleana, `false`).
  - Sección `Documentacion` (`490:2482`) con el set **`layout cards`**
    (`490:1970`): `Type` desktop (1440 × 760) · tablet (769 × 1296) · mobile
    (390 × 2192). Es la rejilla de The Work con 6 tarjetas.
  - Anatomía de `card`: imagen (relleno de imagen), título
    `Heading / Small / light` (`content/default`), subtítulo
    `Label / Small / regular` (`content/subtle`), `Label` (`133:17054`, solo
    visible en Default), candado oculto (`Icons / Size=20, Type=lock`,
    `Show lock`), y abajo el `Link` small ("Open case study", icono
    `link right`); en Hover y Focus el Link pasa a `Inverted=true`.
    Focus añade los dos anillos (`focus/ring-inner`, `focus/ring`) alrededor de
    **toda la tarjeta**.
  - Variables todas locales (0 remotas). Estilos de texto en todos los
    textos.
  - **Valores sin variable**: padding 32 (arriba, abajo y derecha del
    contenedor), gaps de 16 y 10, padding 10 del pie; borde de **0,5 px**.
  - Hay una capa `Title` oculta y el título dice "INDITEX" también en las
    variantes de los otros casos (el `Type` solo cambia la imagen).
  - Cabeceras: `190:19350` (principal, título "Cards", descripción de
    plantilla, fecha 2025-2-15) y `490:2425` (de documentación, categoría
    "CATEGORY", descripción de plantilla). Ya hay una sección "Documentacion",
    pero solo contiene `layout cards`.
- Web: el repositorio no es accesible desde esta sesión. Lo que sigue viene de
  `docs/work/link.md` (verificado en el HTML el 20-11-2026): las tarjetas de
  The Work llevan un enlace `.link.project-card__link` con texto "Open case
  study" y `aria-label` "Open Shori case study", "Open Inditex case study
  (password protected)"…; la decisión 1 del Link los cambia a "Open case
  study: Shori", "Open case study: Inditex (password protected)" en la fase 4.
  No está verificado si toda la tarjeta es clicable ni con qué etiqueta va el
  título.
- APG: Link. Patrón de tarjeta con un solo enlace ("block link" / *redundant
  click*): referencia de Inclusive Components (Heydon Pickering). WCAG 2.2:
  1.1.1, 1.3.1, 1.4.3, 1.4.11, 2.4.4, 2.4.7, 2.5.3, 2.5.8. React Aria: `Card`
  no existe en React Aria; referencia `useLink`.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Tarjeta de caso de estudio | The Work (según `link.md`) | — | — | confirmado |
| Anatomía | Imagen + título + subtítulo + Label + candado + Link | Link "Open case study" | El título debería ser un encabezado (1.3.1) | — | falta decisión (2) |
| Zona clicable | Foco alrededor de toda la tarjeta | Enlace en "Open case study" (no verificado si toda la tarjeta) | Un solo enlace por tarjeta; si toda es clicable, el área se amplía con CSS, no con varios enlaces | — | falta decisión (1) |
| Nombre accesible | Link "Open case study" | "Open case study: Shori"… (decisión del Link) | 2.5.3: empieza por el texto visible | — | confirmado por la decisión 1 del Link |
| Imagen | Relleno de imagen | web no verificada | 1.1.1: decorativa (`alt=""`) si el título ya dice el caso | — | falta decisión (3) |
| Default | Blanca, Label visible | — | — | — | confirmado |
| Hover | Link inverted; el Label desaparece | — | — | — | falta decisión (6): ¿el Label se oculta a propósito? |
| Pressed | No existe | — | — | — | no aplica (el del Link) |
| Focus-visible (doble anillo) | Anillos en toda la tarjeta | — | 2.4.7, 1.4.11 | — | confirmado; discrepancia de nombre `Focus`/`focus` (4) |
| Disabled | No existe | — | — | — | no aplica |
| Protegido (candado) | `Show lock` | "(password protected)" en el nombre accesible | 1.1.1: el candado no puede ser la única pista | — | confirmado (lo dice el nombre); Tooltip del candado: ver `tooltip.md` |
| Teclado | — | Enter en el enlace | Un solo Tab por tarjeta | — | falta decisión (1) |
| Tokens | Locales, pero varios espaciados sin variable y borde 0,5 | — | Nunca valores sueltos (AGENTS.md) | — | discrepancia (5) |
| Contraste | Título 17,4:1; subtítulo `content/subtle` 6,79:1 | — | 1.4.3 | — | confirmado |
| Objetivo táctil | 300 × 300 o el Link (40 px) | — | 2.5.8 | — | confirmado |
| Zoom, reflow y texto largo | Alto fijo 300 | — | 1.4.10, 1.4.12: título largo no se puede cortar | — | falta decisión (7) |
| Mayúsculas | "INDITEX", "DESIGN SYSTEM" escritos en mayúsculas | — | Escribir en minúscula y transformar con CSS (los lectores pueden deletrear) | — | falta decisión (7) |
| Responsive | `layout cards` desktop · tablet · mobile | — | — | — | confirmado en Figma |

## Variables y nombres incoherentes

- **`State=Focus` y `State=focus`**: dos valores de la misma variante (Ulma usa
  el de minúscula). Figma los trata como distintos.
- **`Type` = un caso de estudio**: es contenido, no una variante de diseño.
  Con cada caso nuevo hay que añadir 3 variantes. Y el título no cambia con el
  `Type` (sigue "INDITEX").
- Nombres en minúscula (`card`, `layout cards`) frente al resto (`Button`,
  `Link`). Sección "Documentacion" sin tilde.
- Espaciados sueltos (32, 16, 10) y borde de 0,5 px sin variable. Hay tokens
  para 32 (`space/7`) y 16 (`space/4`); para 10 no.

## Decisiones y alternativas

1. **Zona clicable.** *Recomendación:* un único `<a>` por tarjeta (el de "Open
   case study") y toda la tarjeta clicable ampliando su área con CSS
   (pseudo-elemento), así hay un solo Tab y un solo nombre; el foco dibuja el
   doble anillo alrededor de la tarjeta, como en Figma.
2. **Título.** *Recomendación:* encabezado (`<h3>` dentro de la sección The
   Work, nivel según la página), no solo texto.
3. **Imagen.** *Recomendación:* decorativa (`alt=""`), porque el título y el
   nombre del enlace ya dicen el caso.
4. **`Focus` / `focus`.** *Recomendación:* unificar en `Focus` (cambiar el
   valor de la variante de Ulma). No cambia nada visible.
5. **Valores sueltos.** *Recomendación:* 32 → `space/7`, 16 → `space/4`; para
   los 10 px (gap de imagen, pie) elegir `space/2` (8) o `space/3` (12) — se
   nota 2 px, decide Diana. El borde de 0,5 px: ¿1 px como el resto de DIME?
6. **Label en Hover.** El Label desaparece en Hover y Focus. ¿Intencionado?
   *Recomendación:* que no cambie de contenido entre estados (lo que ve el
   ratón y el teclado debe ser lo mismo).
7. **Contenido flexible.** *Recomendación:* `Type` pasa a ser una property de
   imagen (o slot) y el título y subtítulo, texto; así una tarjeta nueva no
   pide variantes nuevas. Alto mínimo 300 en vez de fijo, para títulos largos
   y zoom. Texto escrito en minúscula y mayúsculas con estilo.

## Para la fase 2

- Cabecera principal: descripción oculta y fecha del día.
- La sección "Documentacion" ya existe con `layout cards`: completarla con la
  estructura de `figma-doc.md` (o renombrarla "Documentation").
- Sección "Card o Link" (la tarjeta es un enlace grande).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Set renombrado a `Card`; `focus` → `Focus` (Ulma); 89 espaciados de 32 y 16 ligados a `space/7` y `space/4`. Quedan los de 10 px (decisión B). Decisión 4 cerrada.

## Decisiones de Diana (22-11-2026, punto B)

- **Hover y Focus distintos de Default** (el Label desaparece): intencionado.
- **Borde de 0,5 px:** intencionado, porque las tarjetas van pegadas; ya ajustado en la web.
- Los gaps de 10 px: el pie con el enlace (padding derecho, arriba y abajo y gap), la fila del candado y el marco de la imagen. En la web el pie lleva `padding-right: 10px`. Pendiente de decidir.
- Gaps de 10 px → `space/2` (aprobado): pie, fila del candado y marco de la imagen, en las 18 variantes. Sin cambio de tamaño; no queda ningún espaciado suelto en la Card.

## Decisión de Diana (24-11-2026)

- **`Type` = un valor por caso de estudio, a propósito:** cada tarjeta está personalizada para su caso. Se mantiene como variante. Decisión 7 cerrada (no pasa a contenido).

## Fase 2 · Documentación en Figma (24-11-2026)

Web revisada: `<li class="project-card">` con imagen decorativa (`alt=""`), nombre `<h3>`, áreas, Badge, candado con tooltip decorativo y un solo `<a>` ("Open case study", `aria-label` con el caso) estirado a toda la tarjeta; Hover y `:focus-within` descubren la imagen (`clip-path`) y oscurecen el pie. Rejilla: 4 columnas en desktop, 1 columna a todo el ancho en móvil; en tablet todavía como desktop.

Sección *Documentation* (`666:931`) en la página Cards, a la derecha de la sección "Documentacion" de Diana (que contiene `layout cards` y no se toca). Anatomía de 6 partes; Variantes: estados (Default, Hover, Focus) y los 6 casos (`Type`); Cuándo usarlo; Recomendaciones; Do y don't (con y sin candado); **Card o Link**; Accesibilidad; Properties (5); Responsive con aviso que remite a `Layout cards`. Cabecera del componente: fecha 24-11-2026, descripción oculta. Estado: en revisión por Diana.

## Storybook · imágenes de Type (25-11-2026)

- Las seis imágenes son las que ya exportó Diana (webp, 300 × 300), copiadas a `components/card/images/` con nombre neutro porque Storybook no nombra casos. Correspondencia: `image-1` Inditex · `image-2` Ulma · `image-3` Shori · `image-4` Iplace · `image-5` N12 · `image-6` Preply.
- Hover y Focus siguen Figma (`102:7321`): la imagen sustituye al bloque de título, áreas y etiquetas; el candado y el pie se quedan. Se descubre de abajo arriba (`clip-path`, 550 ms), como la web. Sustituye al fundido por opacidad de la primera versión.
- La imagen va detrás del contenido (`z-index: -1` dentro de la tarjeta, que es su propio contexto de apilado): el enlace estirado y el pie siguen encima.
- **Abierto:** las imágenes miden 300 × 300 px, igual que la tarjeta, es decir a 1×. En pantallas de alta densidad (2×) se verán algo blandas. Si se quiere nitidez, habría que re-exportarlas a 600 × 600.

## Storybook · candado y Tooltip (25-11-2026)

- Con imagen, en Hover y Focus el candado pasa a blanco y aparece un Tooltip «Password protected» a su izquierda (variante Left: a la derecha no hay sitio y arriba el borde de la tarjeta lo recortaría), con 400 ms de retraso. En la web es decorativo (`aria-hidden`) y se mantiene así: el nombre del enlace ya dice «password protected».
- Como el tooltip aparece con ratón y foco, cumple 1.4.13: la tarjeta con candado va dentro de `<dime-tooltip>` y Escape lo cierra sin mover el foco. Reutiliza `.dime-tooltip`, no se crea un tooltip propio.

## Card estándar con placeholder (26-11-2026)

`Type` solo cambiaba la imagen, así que no es una variante sino contenido. Diana pide una Card estándar con un placeholder y las variantes con imágenes como ejemplos.

- **Figma** (`102:7204`): nuevo valor `Type=Placeholder` (con sus tres estados Default, Hover y Focus), con la imagen sustituida por el componente nuevo `Image placeholder` (`706:5092`): fondo `background/subtle` y un icono de imagen de trazo en `content/subtle`. Los seis valores con imágenes se mantienen. La documentación (Anatomía, Properties y Recomendaciones) lo cuenta. Queda por fijar a mano que `Placeholder` sea la variante por defecto (en Figma no se puede cambiar por API).
- **Código:** la Card estándar lleva `<span class="dime-card__image dime-card__image--placeholder">`; una imagen propia se pone con un `<img class="dime-card__image">` en su lugar. Se quita el control `Type` de las stories y las seis imágenes de `components/card/images/` (siguen en Figma). El icono del placeholder es `components/card/image-placeholder.svg`, pintado por máscara con el token.
- **Prueba:** en la story *Teclado* se desactiva solo la regla de contraste de axe, porque da por fondo el gris del placeholder en vez del pie oscuro (la imagen va detrás con `z-index: -1`). El contraste real (blanco sobre negro, 17,4:1) está medido en el navegador.

