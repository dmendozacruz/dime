# Skip nav

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Skip Nav` (`19:23`), sección `Skip Nav` (`337:2147`).
  Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Skip Nav` (`472:2207`, 2 variantes): `Size` small (177 × 40) · large
    (195 × 48). Sin `State`.
  - Anatomía: píldora negra (`background/brand`, radio 100, borde 1 px
    `border/default`) con el texto **"Skip to main content"** en
    `content/inverse` (`Interaction / Medium / regular` en small,
    `Interaction / Large / regular` en large) y **los dos anillos de foco
    siempre visibles** (`focus/ring-inner`, `focus/ring`; rectángulos `Ring`
    con radios 41 y 39,83).
  - Padding `space/4` × `space/2` (small) o `space/3` (large), gap
    `space/1`. Variables todas locales (0 remotas).
  - Cabecera `.Headers` (`337:2148`): título "Skip Nav", descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: enlace "saltar al contenido" de la
  home. No se ha podido copiar el texto ni el destino del HTML.
- WCAG 2.2: 2.4.1 (saltar bloques), 2.4.3, 2.4.7, 2.4.11, 2.5.8.
  WebAIM: [Skip navigation links](https://webaim.org/techniques/skipnav/).
  React Aria: no aplica (es un enlace).

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Enlace para saltar al contenido | Home (no verificado) | 2.4.1 | — | confirmado |
| Anatomía | Píldora + texto + doble anillo | — | `<a href="#main">`, primer elemento enfocable | — | confirmado |
| Nombre accesible | "Skip to main content" | web no verificada | El texto visible es el nombre | — | confirmado en Figma |
| Oculto hasta el foco | Figma lo muestra siempre en foco | — | Visible al recibir el foco; oculto con técnica que no lo saque del orden de Tab (nunca `display:none`) | — | falta decisión (1) |
| Focus-visible (doble anillo) | Siempre dibujado | — | 2.4.7 | — | confirmado |
| Destino | — | web no verificada | `<main id="main" tabindex="-1">` para que el foco llegue de verdad (Safari) | — | confirmado como requisito |
| Posición | — | — | 2.4.11: no puede quedar tapado por el header fijo | — | falta decisión (2) |
| Hover, Active, Disabled | No existen | — | Hover opcional; no hay disabled | — | no aplica |
| Tamaños | small · large | — | — | — | falta decisión (3) |
| Tokens | Locales; radios de los anillos 41 y 39,83 | — | D-013 | — | discrepancia menor (4) |
| Contraste | Blanco sobre negro 17,4:1; amarillo sobre negro 10,7:1 | — | 1.4.3, 1.4.11 | — | confirmado |
| Objetivo táctil | 40 y 48 | — | 2.5.8 | — | confirmado |
| Movimiento | — | — | Si entra con animación, solo sin reduced motion | — | falta decisión (1) |
| Responsive | — | — | — | — | falta decisión (3) |

## Variables y nombres incoherentes

- Sin `State`: el componente es solo el estado con foco. Está bien (es el único
  momento en que se ve), pero hay que decirlo en la documentación.
- Radios de los anillos 41 y 39,83 (decimal): con 44–56 px de alto se ven como
  píldora, pero D-013 dice 100.
- Página "Skip Nav", set "Skip Nav": en el mapa "Skip nav". Mayúsculas
  distintas.

## Decisiones y alternativas

1. **Cómo aparece.** *Recomendación:* oculto visualmente hasta recibir el foco
   (clase `visually-hidden` que se quita con `:focus`), arriba a la izquierda,
   por encima del header; aparece sin animación.
2. **En qué páginas.** *Recomendación:* en todas (home y casos de estudio), no
   solo en la home: 2.4.1 aplica a cada página con navegación repetida.
3. **Tamaño.** ¿Cuándo small y cuándo large? *Recomendación:* uno solo, el
   mismo tamaño que el Button de la cabecera en cada breakpoint (si el header
   usa small en desktop, small); documentar el otro solo si hay uso.
4. **Radios de los anillos.** *Recomendación:* 100 (D-013). No se nota.

## Web (revisada el 22-11-2026, `portfolio`, rama `main`)

- `<a class="skip-link">` "Skip to main content" en la home y en todos los
  casos de estudio; en los casos lleva a `#main-content`, **en la home a
  `#work`** (la sección The Work, no el principio del contenido).
- CSS (`css/styles.css`, `.skip-link`): oculto con `opacity: 0` y
  `pointer-events: none` hasta `:focus`; aparece arriba a la izquierda con
  doble anillo y una transición de 200 ms que se quita con reduced motion.
  Padding 12 × 16, 18 px / 24, radio 100.

## Decisiones de Diana (22-11-2026)

- **Solo aparece con el teclado** (como en la web). Por eso el componente
  solo existe en estado Focus: **no necesita estado Default** ni Hover. Se
  documenta así en Figma (aviso "Solo se ve al navegar con el teclado").
- **Destino:** en la home va a la sección The Work (`#work`), a propósito; en
  los casos de estudio, al contenido principal (`#main-content`).
  El texto es siempre "Skip to main content": para Diana el contenido
  principal de la home empieza en The Work (el hero es la presentación). En el
  HTML, `<main id="main">` empieza en el hero (con el `<h1>`) y `#work` tiene
  `tabindex="-1"`, así que el salto funciona. Se deja así.
- **Tamaño por breakpoint:** `small` (40 px) en desktop y `large` (48 px) en
  tablet y móvil, para llegar al tamaño táctil recomendado. Hoy la web usa
  siempre la medida large (18 px / 24 con padding 12 × 16 = 48 px): se ajusta
  en la fase 4.
- Pendiente: radios de los anillos (decisión 4, va en la limpieza A).

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Aviso (Alert info): "Solo se ve al navegar con el teclado".

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Radios de los 4 anillos a 100. Decisión 4 cerrada.

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`641:54`) en la página Skip Nav, copiada de la del Badge más la sección Responsive de la del Link (este componente sí cambia por breakpoint). Anatomía de 3 partes (texto, píldora, anillo de foco siempre visible) con las variantes small y large; Cuándo usarlo; Recomendaciones; Do y don't ("Skip to main content" frente a "Skip"); **Cuándo se ve** (con teclado frente a ratón o táctil, con los destinos reales de la web y el aviso "Solo con teclado"); Accesibilidad (2.4.1, 2.4.11, foco en el destino); Properties (`Size`); Responsive (small en desktop, large en tablet y móvil). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

## Storybook (26-11-2026)

Clase `dime-skip-nav` sobre un enlace nativo, sin JS (`components/skip-nav/`): oculto hasta recibir el foco y entonces visible, con doble anillo. Stories: Size small, Size large y *Teclado*, con una prueba: aparece con el primer Tab y, al activarlo, el foco pasa al contenido principal. axe sin violaciones.
