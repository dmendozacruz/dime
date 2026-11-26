# Process list

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-process-list>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Process List` (`19:22`), sección `Process list`
  (`337:2637`). Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Process list step` (`401:1379`, 2 variantes, 10 × 35): `State`
    (default · active). Un círculo de 10 px (`Ellipse 143`) y una línea de
    1 px (`Rectangle 1`).
    - default: círculo `background/disabled`, línea `border/subtle`.
    - active: círculo `background/brand`, línea `border/default`.
  - `Process list item` (`401:1410`, 2 variantes, 610 × 72): `Last step`
    (no · yes; en yes no hay línea), `Title` (texto, "Title"), `Subtitle`
    (texto, "Description"), `Show right` (booleana, `true`), `Show left`
    (booleana, `false`). El paso del ítem es una instancia de
    `Process list step / State=default`.
  - Textos: título `Subheading / bold`, descripción
    `Body / Extra large / regular`, los dos `content/default`. Gap
    `space/8` (40) y `space/3`.
  - Variables todas locales (0 remotas). Sin espaciados sueltos.
  - No hay un componente "Process list" que agrupe los ítems: la lista se
    monta a mano apilando ítems.
  - Cabecera `.Headers` (`337:2528`): título correcto, descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: Process framework del caso de Ulma.
- WAI-ARIA / HTML: lista ordenada `<ol>`. Si marca el paso actual,
  `aria-current="step"`. WCAG 2.2: 1.3.1, 1.3.2, 1.4.1, 1.4.3, 1.4.11.
  React Aria: no aplica (no es interactivo).

## Contraste

Texto 17,4:1. Círculo y línea en default (`background/disabled`,
`border/subtle`, #dbdbdb) **1,38:1** sobre blanco; en active 17,4:1.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Pasos de un proceso con título y descripción | Ulma (no verificado) | `<ol>` (1.3.1: el orden importa) | — | confirmado |
| Anatomía | Punto + línea + título + descripción | — | Punto y línea decorativos (`aria-hidden`) | — | confirmado |
| Qué es `active` | Punto y línea negros | web no verificada | Si es "paso actual": `aria-current="step"` y texto, no solo color (1.4.1) | — | falta decisión (1) |
| Estados interactivos | No existen | — | No es interactivo | — | no aplica |
| Lado del texto | `Show left` / `Show right` | — | 1.3.2: el orden de lectura no cambia con el lado | — | falta decisión (2) |
| Último paso | `Last step=yes` sin línea | — | En código sale solo (`li:last-child`) | — | confirmado |
| Encabezados | Título en `Subheading / bold` | — | ¿Es un encabezado (`<h3>`) o texto en negrita? | — | falta decisión (3) |
| Tokens | Locales; `background/disabled` para un punto que no está desactivado | — | — | — | discrepancia (4) |
| Contraste y forced colors | default 1,38:1; active 17,4:1 | — | 1.4.11 solo si el punto transmite información | — | falta decisión (1) |
| Zoom y texto largo | Ancho 610, alto 72 | — | 1.4.10, 1.4.12: la línea tiene que crecer con el texto | — | confirmado como requisito |
| Responsive | Una medida | — | — | — | falta decisión en fase 2 |

## Variables y nombres incoherentes

- **`background/disabled` para el punto default** (mismo caso que el Hover del
  Tabs): el paso no está desactivado; es "pendiente" o "no destacado".
- `State` default · active en minúscula (el resto de DIME usa Default, Active).
- `Subtitle` muestra "Description" y la capa se llama `Description`.
- Capas `Ellipse 143` y `Rectangle 1`; la capa `Label+description left`
  oculta.
- `Show left` / `Show right` son dos booleanas para una sola elección (si las
  dos están en `true` o en `false`, el resultado no tiene sentido).

## Decisiones y alternativas

1. **Significado de `active`.** ¿Paso actual, completado o destacado?
   *Recomendación:* si en el caso de Ulma es solo un realce visual de la fase
   de la que se habla, documentarlo así y que no dependa del color: el texto
   ya lo dice. Si es "paso actual", `aria-current="step"`.
2. **Lado del texto.** *Recomendación:* una variante `Align` (left · right)
   en vez de dos booleanas.
3. **Título.** *Recomendación:* encabezado (`<h3>` o el nivel que toque en el
   caso de estudio), para poder saltar entre pasos con el lector de pantalla.
4. **Variable del punto default.** *Recomendación:* un semántico que diga lo
   que es (p. ej. `border/subtle` para punto y línea, que ya existe con el
   mismo valor) en vez de `background/disabled`. No cambia nada visible.
5. **Contenedor.** *Recomendación:* crear un `Process list` que agrupe los
   ítems (en código, el `<ol>`) para documentarlo como un componente; hoy solo
   existen las piezas. Es un cambio en Figma: necesita visto bueno.
6. **Nombre `Subtitle`.** *Recomendación:* `Description`, como la capa y el
   texto.

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Anatomía con default, active y último paso; ejemplo con 3 pasos.

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Valores `Default` / `Active`; punto con `border/subtle` (también dentro de los ítems); capas `Dot` y `Line`; `Subtitle` → `Description`. Decisiones 4 y 6 cerradas.

## Decisiones de Diana (22-11-2026, punto B)

- **`Active` es el paso actual.** Se mantiene el componente tal cual por ahora (probablemente cambie). Recomendación: `aria-current="step"` en el paso actual.

## Uso real y web revisada (24-11-2026)

- **Diana:** se usa en Shori y en Preply.
- Shori, "Understanding the users": 3 perfiles (`.work-user-profile--left|--right`), título `<h3>`, línea de tiempo `aria-hidden` con 3 puntos.
- Preply, "Methodology": 5 pasos en zigzag (`.work-methodology__step`), título `<h3>` numerado ("01. …"), línea `aria-hidden` con 5 puntos.
- `js/timeline-fill.js`: la línea se rellena con el scroll y cada punto se activa al alcanzarlo; con `prefers-reduced-motion` todo aparece activo y sin animación. En móvil la línea pasa a la izquierda.
- Semántica de la web (encabezados por paso, línea decorativa) funciona y se mantiene; retiro la recomendación de `<ol>`.
- Nota: en la web `Active` es "paso alcanzado" (se activan varios al bajar); Diana lo describe como "paso actual". Se documenta como "paso actual o ya alcanzado".

## Fase 2 · Documentación en Figma (24-11-2026)

Sección *Documentation* (`663:309`) en la página Process List, copiada de la del Skip nav (con Responsive: en móvil la línea pasa a la izquierda). Anatomía de 4 partes (punto, línea, título, descripción) con dos pasos; Variantes del paso (Default, Active) y del ítem (Show right, Show left, Last step: yes); Cuándo usarlo con los usos reales (Shori, Preply); Recomendaciones; Do y don't (último paso sin línea frente a línea que sigue); **Process list o lista**; Accesibilidad; Properties (6); Responsive. Cabecera del componente: fecha 24-11-2026, descripción oculta. Estado: en revisión por Diana.

**Encontrado en el componente (no corregido, decide Diana):**
- Con `Show left`, los textos de la izquierda no están enlazados a `Title` ni `Description` (solo los de la derecha), así que muestran "Title / Description". En el ejemplo de la doc se escribieron a mano.
- Cada ítem mide 72 px fijos: título y descripción quedan muy pegados al paso siguiente.

## Corrección aprobada por Diana (24-11-2026)

Los textos de `Label+description left` quedan enlazados a `Title` y `Description` en las dos variantes del ítem. Comprobado con una instancia de prueba (creada y borrada por ID).

## Storybook · relleno al scroll y alineación (25-11-2026)

- `<dime-process-list>` (web component en light DOM, D-017) generaliza `timeline-fill.js` de la web: mide el centro del título de cada paso, rellena la línea y los puntos según el scroll, recalcula al redimensionar y al cargar la fuente, y con «reducir movimiento» lo deja todo relleno. Cada paso recibe `data-reached` y `--dime-fill` (0 a 1).
- Alineación: el punto queda a la altura del centro de la primera línea del título (margen superior de (32 − 10) / 2 = 11 px), como en la web. En Figma el punto está alineado con el borde de arriba del título; **abierto** si se actualiza el componente de Figma.
- Hueco entre tramos (corregido el mismo día): al bajar el punto 11 px, el tramo de línea de cada paso terminaba 11 px antes del punto siguiente. La línea se alarga con `margin-bottom: -11px` y queda continua (medido: el final de cada tramo coincide con el punto del paso siguiente).
- **Figma actualizado (25-11-2026, a petición de Diana)** en `Process list step` (`401:1379`, variantes Default y Active): relleno superior de 11 px (el punto pasa de y 0 a y 11, centro del título de 32 px) y la línea, ahora con posición absoluta y restricción vertical Scale (arriba y abajo), empieza en y 21 y llega 11 px por debajo del paso, hasta el punto del siguiente. El componente pasa de 34,75 a 35 px de alto para que no quede un hueco de 0,2 px. Los pasos de `Process list item` y de la documentación lo heredan; comprobado con captura: punto a la altura del título y línea continua entre pasos. 11 px no es múltiplo de 4: queda como valor suelto (en código, `calc((line-height - 10px) / 2)`).
