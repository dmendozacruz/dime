# Link

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha y aprobada por Diana.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: la etiqueta de categoría de la cabecera de documentación dice «CONTENT» (heredada del Accordion).
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página Links (`19:24`), sección `308:1385`. Lectura 20-11-2026.
  - `Link` (`102:7604`, 20 variantes): `State` (Default · Hover · Active ·
    Focus · Disabled), `Size` (small 40 px · large 48 px), `Inverted`
    (false · true), `Text` ("Open case study"), `Show icon left` (false),
    `Show icon right` (true), `Show text` (true).
  - Variables: todas locales. Padding `space/2` en los 4 lados, gap `space/1`,
    texto `content/default` · `content/subtle` · `content/inverse` ·
    `content/disabled`, subrayado `border/default` · `border/inverse`, foco
    `focus/ring` + `focus/ring-inner`.
  - Estilos de texto: small usa `Interaction / Medium / regular|medium` y
    large `Interaction / Extra large / regular|medium` (antes `Button / Medium`
    y `Link / Large`; renombrados el 20-11-2026).
  - Active y Focus en `medium` (decisión de Diana del 19-11-2026: en los links
    se mantiene porque no tienen fondo ni borde que marque el estado). El ancho
    crece 1–2 px entre estados (159 → 160, 226 → 228).
  - Cabecera con texto de plantilla en la descripción y fecha antigua
    (2025-2-15). Sin sección *Documentation*.
- Web (`../mi-portfolio`):

  | Uso | Texto visible | Nombre accesible (`aria-label`) | Destino |
  | --- | --- | --- | --- |
  | Tarjetas de The Work (`.link.project-card__link`) | Open case study | "Open Shori case study", "Open Inditex case study (password protected)"… | Página del caso |
  | Footer (`.footer__action-link`) | LinkedIn | "LinkedIn (opens in a new tab)" | Externo, pestaña nueva |
  | Pantalla de contraseña (`.protected-link`) | Send email · LinkedIn | "Send email to Diana" · "LinkedIn (opens in a new tab)" | `mailto:` · externo |

  CSS de `.link`: texto 16 px con interlineado 20, padding 12/8 (44 px de alto),
  subrayado que crece desde la izquierda en Hover, Active y Focus, Medium en
  Active y Focus, doble anillo de foco. Todos llevan el icono "Link External"
  (↗), también el que va a una página interna.
- APG: Link. WCAG 2.2: 1.4.1, 1.4.3, 1.4.11, 2.1.1, 2.4.4, 2.4.7, 2.5.3, 2.5.8,
  4.1.2. React Aria: `useLink` (referencia).

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Enlace de texto con icono | Lleva a otra página, a un externo o a un `mailto:` | `<a href>` nativo | `useLink` | confirmado |
| Anatomía | Texto + icono derecho (izquierdo opcional) + subrayado + anillo de foco | Igual | — | — | confirmado |
| Nombre accesible | `Text` | `aria-label` que amplía el texto | 2.4.4 propósito en contexto; 2.5.3 el nombre debe contener el texto visible | — | **discrepancia**: en las tarjetas el texto visible "Open case study" no aparece tal cual en el nombre ("Open Shori case study"). Quien use control por voz dice "Open case study" y puede no activarlo. Decisión 1 |
| Default | Sin subrayado | Sin subrayado | 1.4.1: dentro de un párrafo un enlace necesita algo más que el color | — | confirmado para enlaces sueltos con icono. Para enlaces dentro de un párrafo haría falta subrayado siempre: no existe hoy ese uso |
| Hover | Subrayado, `content/default` | Subrayado animado | — | `isHovered` | confirmado |
| Pressed (Active) | Subrayado + Medium | Igual | — | `isPressed` | confirmado |
| Focus-visible (doble anillo) | `focus/ring` + `focus/ring-inner` | Doble anillo + subrayado + Medium | 2.4.7, 1.4.11 | `isFocusVisible` | confirmado |
| Disabled | Existe, `content/disabled` | No se usa | Un `<a>` no tiene `disabled`: sin `href` y `aria-disabled="true"` | `isDisabled` | falta decisión (2) |
| Teclado | — | Enter activa | Enter (no Espacio, a diferencia del botón) | — | confirmado |
| Pestaña nueva | — | "(opens in a new tab)" en el nombre | 3.2.5 (AAA), buena práctica avisar | — | confirmado. Icono: decisión 4 |
| Tokens | Todo local; estilos `Interaction / *` | `--font-size-button-m`, nombres antiguos | — | — | confirmado (decisión 3) |
| Objetivo táctil | 40 y 48 px de alto | 44 px | 2.5.8: mínimo 24 px | — | **discrepancia** menor: la web mide 44 (padding 12) y Figma 40 (padding 8). Manda Figma (D-001); se alinea en la fase 4 |
| Contraste | `content/default` 17,4:1 sobre blanco en todos los estados salvo Disabled; `content/disabled` no cumple (exento) | Igual | 1.4.3 | — | confirmado |
| Zoom y texto largo | Hug | `fit-content` | 1.4.10 | — | confirmado |
| Movimiento | — | Subrayado con `transition` 0,25 s | Animación pequeña, no requiere reduced motion | — | confirmado |
| Icono solo (`Show text` = false) | Existe | No se usa | El enlace necesita nombre en texto | — | confirmado: se documenta como el Button |

## Decisiones de Diana (20-11-2026)

1. **Nombre accesible de las tarjetas:** empieza por el texto visible.
   "Open case study: Shori", "Open case study: Inditex (password protected)".
   Se aplica en la web en la fase 4.
2. **Disabled:** se mantiene, igual que en el Button. Hoy ningún enlace está
   desactivado; sería para un destino roto o no disponible: sin `href`,
   `aria-disabled="true"`, sigue recibiendo el foco y lleva el motivo cerca.
3. **Estilos de texto de interacción:** no se duplican. Los estilos
   `Button / *` y `Link / Large` pasan a `Interaction / Medium | Large | Extra
   large`, que comparten el Button y el Link, igual que las variables
   `interaction/*`.
4. **Icono ↗:** es el icono de los enlaces de texto (el componente Link) a otra
   página, sea interna o externa; no distingue destino. Las flechas
   direccionales (←, →, ↓) son de los botones de navegación: Button back,
   Prev / Next e icon button. Lo de "abre en pestaña nueva" lo dice el nombre
   accesible, no el icono. Las tarjetas no cambian.

## Para la fase 2

- Cabecera: descripción de plantilla oculta y fecha 20-11-2026.
- Sección "Link o Button" (reusar la del Button, vista desde el Link).
- Anatomía por grupos (Link · Link inverted · Tamaños · Iconos), etiquetas
  centradas, ejemplos a `space/9`.

## Fase 2 · Documentación en Figma (20-11-2026)

Hecha el 20-11-2026 (fase 1 cerrada ese día con las 4 decisiones). Sección
  *Documentation* `587:121` en la página Links, duplicada de la del Button y
  adaptada: Anatomía (4 partes sobre la variante Focus large: texto, icono,
  subrayado, anillo), grupos Link · Link inverted · Tamaños e iconos, Cuándo
  usarlo, Recomendaciones, Do y don't con instancias del Link, Link o Button,
  Accesibilidad, Properties (las 7 del set) y Responsive. Cabecera del
  componente: fecha 20-11-2026 y descripción oculta.

## Fase 3 · Storybook (25-11-2026)

Hecha sin presentar antes la API, a petición de Diana («haz uno, lo reviso y sigues»). En revisión.

- Código: `components/link/link.css` (solo tokens, sin JS) y `link.stories.js`. HTML: `<a class="link [link--large] [link--inverted]" href>` con `<span class="link__label">` y el icono como `<svg class="link__icon" aria-hidden="true" focusable="false">` en línea (toma `currentColor`, así sigue el estado). Disabled: sin `href`, `role="link"`, `aria-disabled="true"`, `tabindex="0"`.
- Medidas de Figma: padding `space/2`, gap `space/1`; small 40 px (Interaction / Medium 16/24, icono 20), large 48 px (Interaction / Extra large 24/32, icono 28). Subrayado de 1 px `border/default` (`border/inverse` en inverted) que crece desde la izquierda en Hover, Active y Focus; Active y Focus en medium; doble anillo de DIME.
- Páginas: Uso, Código y Accesibilidad (`components/link/Link*.mdx`), con la barra de pestañas `docs/blocks/ComponentTabs.jsx` (nav + `aria-current`, D-014). Bloques nuevos: `DoDont.jsx` y las muestras de estados (`LinkDemo.jsx`, estados forzados solo en la muestra con `data-demo`).
- Stories: Estado principal, Size large, Inverted, Icono a la izquierda, Solo icono, Disabled, Texto largo y Teclado (`play`: Tab, rol y nombre, Enter). `parameters.a11y.test = "error"`.
- Verificado en Chromium a 1440 px: los 5 estados medidos (alto, tamaño, peso, subrayado, anillo) coinciden con Figma; axe sin violaciones en las 8 stories; la story Teclado pasa; texto a 16 px (también la tabla de controles, que Storybook ponía a 13); sin scroll horizontal ni errores.
- Diferencias con la web (para la fase 4): small mide 40 px (la web 44, padding 12), large lleva texto de 24 px, `.link--inverse` → `.link--inverted`, icono en línea en vez de `<img>`, nombre accesible que empieza por el texto visible (decisión 1).
- Revisión de Diana (25-11-2026):
  - Cabecera como en Nueva York: descripción, etiqueta WCAG 2.2 AA, «Ver en Figma» (`102:7604`) y última actualización. En las tres pestañas.
  - El Link no se usa solo con el icono: fuera la story y las muestras de «Solo icono». `Show text` existe en Figma, pero se documenta como no usado. Si algún día se usara, mantendría el relleno del componente. Las flechas izquierda y derecha sí se usan.
  - Anatomía: Overview como Astryx: un solo panel con las combinaciones de propiedades juntas y sin rótulos (small, large, flecha a la izquierda, inverted en un bloque oscuro) y la anatomía en tabla, sin repetir la imagen numerada de Figma.
- Las stories se ven en el menú lateral en «Ejemplos».
- Pendiente manual: VoiceOver (Safari macOS e iOS), control por voz y dispositivo real. Árbol de accesibilidad en WebKit sin comprobar.
