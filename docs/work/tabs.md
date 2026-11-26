# Tabs

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-tabs>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma: página `↳ Tabs` (`18:15`), sección `335:1980`. Lectura 2026-11-20 vía
  MCP oficial (`get_metadata`, `get_screenshot`, `use_figma` lectura).
  - `Tabs Items` (`102:7799`, 8 variantes): `State` (Default · Hover · Active ·
    Focus), `Size` (small 40 px · large 48 px), `Text` (default `"Item"`).
  - `Tabs` (`467:1951`, 2 variantes): `Size` (small · large), `Show item 3`
    (boolean, default `true`), `Show item 4` (boolean, default `false`).
    Contenedor píldora con 2 ítems fijos + 2 opcionales (máx. 4).
    Diana renombró las booleans (antes `Show item 2` / `Show item 3`);
    releído 2026-11-20.
  - Cabecera `.Headers` (`335:1948`): título "Tabs", descripción de plantilla
    visible, fecha `2025-2-15`. **No hay sección Documentation** en la página
    (solo la sección del componente).
- Web (`../mi-portfolio`): home, sección `#about` — pestañas "About me" /
  "Core Skills" (`index.html`, `js/main.js` `initTabs`, `css/styles.css`
  `.tabs*`). Un único uso.
- APG: <https://www.w3.org/WAI/ARIA/apg/patterns/tabs/>
- React Aria: Tabs (referencia; no dependencia).
- WCAG 2.2: 1.3.1, 1.4.3, 2.1.1, 2.4.7, 2.4.11, 2.5.8, 4.1.2.

## Anatomía en Figma (confirmada)

| Parte | Qué es | Tokens / estilo |
| --- | --- | --- |
| Contenedor `Tabs` | Píldora con borde | fill `background/default`; stroke `border/default`; padding y gap `space/2` (8); radius full |
| Ítem Default | Texto sin píldora visible (fill blanco) | fill `background/default`; texto `content/default`; estilo `Button / Medium / regular` (small) o `Button / Large / regular` (large); padding `space/2`×`space/4` (small) o `space/3`×`space/4` (large) |
| Ítem Hover | Píldora gris | fill `background/hover` (#DBDBDB; antes `background/disabled`) |
| Ítem Active | Píldora negra | fill `background/brand`; texto `content/inverse` |
| Ítem Focus | Active + doble anillo | anillos `focus/ring-inner` + `focus/ring` |
| Property `Text` | Etiqueta del ítem | default `"Item"` |

Variables remotas: **0** (todas locales). No hace falta migración `spacing/*` →
`space/*`.

## Uso en la web (referencia)

| Aspecto | En código |
| --- | --- |
| Dónde | Home `#about` — conmuta About me / Core Skills |
| HTML | `div[role=tablist]` + `button[role=tab]` + `div[role=tabpanel]` |
| Nombres accesibles | Texto visible: "About me", "Core Skills". `tablist` y sección:
  `aria-label="About me and Core Skills"` |
| Selección | `aria-selected`; roving `tabindex` 0 / -1 |
| Activación | **Automática**: flechas activan al mover el foco |
| Teclado | ←/→ **y** ↑/↓, Home, End (sin Enter/Space aparte) |
| Paneles | Misma celda de grid; inactivo con `visibility: hidden` (conserva altura) |
| Foco | Anillo **simple** amarillo (`outline` 2px, offset 4px) |
| Peso | Hover y selected: **Medium**; default: Regular |
| Tamaño | Equivale a small (40 px de alto del ítem) |
| Hover fill | `--color-background-4` (#e4e4e4), distinto del token Figma |

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma (librería DIME) | Web (uso actual) | WAI-ARIA / APG / WCAG | React Aria (referencia) | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Conmutar vistas (solo tablist + ítems; sin panel en el set) | About me / Core Skills | Patrón Tabs | Tabs | confirmado |
| Anatomía | Contenedor + Tabs Items; sin slot de panel | tablist + tabs + tabpanels con contenido de página | tablist / tab / tabpanel | TabList / Tab / TabPanel | confirmado — el panel es de la página, no del set |
| Nombre accesible | Property `Text` del ítem | Texto del botón; tablist con `aria-label` | Nombre del tab = contenido; tablist etiquetado | Igual | confirmado |
| Descripción | Plantilla en cabecera | — | — | — | falta decisión (fase 2: texto real) |
| Default | Fill blanco, Regular | Transparente/blanco, Regular | — | — | confirmado |
| Hover | `background/hover` #DBDBDB, Regular | `#e4e4e4`, Medium | — | — | discrepancia (color y peso) |
| Pressed | No hay variante Pressed | — | — | — | no aplica (Active = seleccionado) |
| Focus-visible (doble anillo) | Sí (`focus/ring-inner` + `focus/ring`) sobre Active | Anillo simple amarillo | 2.4.7 | focus-visible | discrepancia → alinear web a doble anillo (como Accordion/Button) |
| Disabled | No existe | No | Opcional en APG | `isDisabled` | no aplica por ahora (preguntar si se documenta ausencia) |
| Selected | State=Active | `aria-selected="true"` | `aria-selected` | selected | confirmado (nombre Figma: Active) |
| Expanded | — | — | No (eso es Accordion) | — | no aplica |
| Teclado | No especificado en Figma | Hoy automática; ←→↑↓ Home End | Horizontal: ←→; ↑↓ no; auto o manual | Flechas según orientación | **Decisión: activación manual** (Enter/Espacio). Web a alinear después. ↑↓ en horizontal: discrepancia a corregir en web |
| Orden y gestión del foco | — | Roving tabindex; paneles `tabindex="0"` | Roving; Tab entra al activo y sale al panel | Igual | confirmado en espíritu; paneles focusables OK |
| Anuncios | — | Cambio de selección vía `aria-selected` | Rol/estado del tab | Igual | confirmado |
| Tokens | Locales (0 remotas) | Tokens propios de la web (fase tokens pendiente) | — | — | confirmado en Figma |
| Contraste y forced colors | Active blanco/negro; foco con anillos | Similar | 1.4.3, 1.4.11 | forced-color-adjust en RA | confirmado a alto nivel |
| Objetivo táctil (44 × 44 px) | small 40 × ≥64; large 48 × ≥68 | ~40 de alto | 2.5.8 mínimo 24; DIME 44 | — | discrepancia en small (alto 40 < 44) |
| Zoom, reflow y texto largo | Texto hug | `::after` reserva ancho Medium | 1.4.4 / 1.4.10 | — | confirmado en web; Figma hug |
| Movimiento (reduced motion) | Sin motion en el set | `transition` 0.2s en tab | 2.3.3 | reduce en indicador | falta decisión en código (fase 3) |
| Responsive | Un set; sin variantes por breakpoint | Lista a la derecha (desktop); centrada en mobile | — | — | confirmado uso; documentar en fase 2 |
| Accordion vs Tabs | Gemelos de organización de contenido | Ambos en `#about` | Patrones distintos | Disclosure vs Tabs | confirmado — sección diferencial en doc |

## Hallazgos / riesgos

1. **Sin Documentation** en la página Tabs: la fase 2 partirá de duplicar la del
   Accordion (`443:13061`).
2. ~~Naming `Show item *`~~ → Diana renombró a `Show item 3` / `Show item 4`.
3. ~~4.º ítem large en small~~ → corregido (48 px, Size=large).
4. ~~**Hover fill** usa `background/disabled` (nombre engañoso)~~ → corregido
   el 20-11-2026: nueva variable `background/hover` (→ neutral/100).
5. **Peso tipográfico**: Figma Regular; web Medium en hover/selected → web
   después.
6. **Foco**: Figma doble anillo; web anillo simple → web después.
7. **Activación**: decisión manual; web hoy automática → web después.
8. El set **no incluye tabpanel**: el panel es de la página; se documenta en
   Accordion o Tabs (aspecto diferencial) y en Accesibilidad.

## Decisiones de Diana (2026-11-20)

- **Documentación conjunta:** `Tabs` + `Tabs Items` juntos, como Button.
- **Fuente de verdad ahora:** manda Figma. La web se alinea después.
- **Activación: manual.** Flechas solo mueven el foco; Enter o Espacio
  seleccionan y cambian el panel. (La web hoy es automática → se corrige en
  fase web / Storybook.)
- **`Show item 3` / `Show item 4`:** Diana ya los renombró. Releído: defs y
  bindings correctos (3.º y 4.º hijo). Defaults `true` / `false` → 3 ítems al
  soltar.
- **4.º ítem en large:** corregido (ahora `Size=large`, 48 px). Antes era small.
- **Token hover:** primero se dejó `background/disabled` con un aviso; después
  Diana pidió arreglar el nombre. Nueva variable `background/hover` en Alias
  (→ neutral/100, mismo color) usada en las dos variantes Hover. El Alert de la
  doc pasa a info y lo explica.

## Fase 2 · Documentación en Figma (2026-11-20)

Sección `Documentation` `585:503` en la página Tabs (copia del Accordion
adaptada), a la derecha de `335:1980`.

- Cabecera del componente: fecha `20-11-2026`, descripción oculta.
- Cabecera de documentación: resumen Tabs (About me / Core Skills).
- Anatomía: preview con `Tabs` (Focus en About me), tabla de 4 partes,
  tipos y estados (Items small/large + contenedor).
- Cuándo usarlo, recomendaciones, Do/don’t con instancias reales.
- Accordion o Tabs (comparativa + regla rápida).
- Accesibilidad: activación manual, doble anillo, roles tablist/tab.
- Properties: State, Size, Text, Show item 3, Show item 4.
- Alerts: Token de Hover (`background/hover`, info) y Activación
  manual (info).
- Responsive: desktop / tablet / mobile según uso en la home.
- Estilo de etiqueta en anatomía: `Interaction / Medium / regular` (nombre
  actual en Figma).

## Revisión (20-11-2026)

- Las 9 cabeceras de la sección *Documentation* (la de documentación y las 8
  de sección) tenían visible el texto de plantilla "Frame description text
  that’s just a little longer". Corregido con su descripción real mediante la
  propiedad `Description`. Alto de la sección ajustado (6502 px).

## Storybook (26-11-2026)

Web component `<dime-tabs>` en light DOM (`components/tabs/`), con activación manual: las flechas mueven el foco entre pestañas y Enter o Espacio activan. Stories: Default, Large, Four y *Teclado*. axe sin violaciones.
