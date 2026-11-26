# Alert

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-alert-region>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada. La decisión 2 (tipo en texto) la resuelve el título del Alert, que dice el tipo.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Alert` (`443:5263`), frame `Frame 39` (`443:5289`, no es una
  *Section*). Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Alert` (`443:9196`, 4 variantes, 678 × 96 px):
    `State` (info · danger · warning · success; por defecto **danger**),
    `Title` (texto, "Title"), `Content` (texto, "Password entered is not secure
    enough."), `Show content` (booleana, `true`).
  - Anatomía: icono de 28 px (`Icons / Size=28`: `information`, `danger`,
    `warning`, `check circle`), título y contenido; borde solo a la izquierda
    de 4 px; sin radio.
  - Variables, todas locales (0 remotas): relleno `feedback/<tipo>/background`,
    borde e icono `feedback/<tipo>/border`, título y contenido
    `feedback/<tipo>/content`; padding `space/5` (20) en los 4 lados, gap
    `space/3` (12) y `space/1` (4).
  - Estilos de texto: título `Body / Large / bold`, contenido
    `Body / Medium / regular`. Ningún texto sin estilo.
  - Cabecera `.Headers` (`443:9160`): **título "Accordion"** (copiado del
    Accordion), descripción de plantilla, fecha 2025-2-15. Sin sección
    *Documentation*.
  - Ya se usa como aviso dentro de las documentaciones de Figma
    (`references/figma-doc.md`: Alert `443:9196` para notas).
- Web: **no verificada** (`../mi-portfolio` no era accesible desde esa sesión). El mapa dice "Por confirmar". El texto por defecto
  ("Password entered is not secure enough.") apunta a la pantalla de
  contraseña de Inditex, sin confirmar.
- APG: [Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). WAI-ARIA:
  `role="alert"` (assertive) y `role="status"` (polite). React Aria no tiene
  Alert; referencia de comportamiento: InlineAlert de React Spectrum.
- WCAG 2.2: 1.3.1, 1.4.1, 1.4.3, 1.4.11, 3.3.1, 4.1.3.

## Contraste (calculado con `tokens/tokens.css`)

| Tipo | Texto sobre fondo | Icono y borde sobre fondo |
| --- | --- | --- |
| info | 4,76:1 | 4,76:1 |
| danger (`feedback/error/*`) | 7,67:1 | 7,67:1 |
| warning | 4,67:1 (justo por encima de 4,5) | 4,67:1 |
| success | 5,76:1 | 3,94:1 |

Todo cumple AA (texto 4,5:1, no texto 3:1). Warning es el más justo: si el
contenido bajara de `Body / Medium` no habría margen.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Mensaje de estado con 4 tipos | web no verificada | APG Alert: mensaje importante que no interrumpe | InlineAlert (Spectrum) | confirmado en Figma |
| Anatomía | Borde izquierdo + icono + título + contenido | web no verificada | — | — | confirmado |
| Nombre accesible / rol | — | web no verificada | `role="alert"` solo si aparece en respuesta a algo y es urgente; `role="status"` si es informativo; ningún rol si está desde el principio en la página | — | falta decisión (1) |
| Descripción | `Content` opcional (`Show content`) | — | — | — | confirmado |
| Tipo (info, danger…) | Variante `State` | — | 1.4.1: el tipo no puede ir solo por color | — | confirmado: el icono cambia por tipo. Falta que el tipo se diga en texto (2) |
| Hover, Pressed, Focus | No existen | — | No es interactivo | — | no aplica |
| Cerrar (dismiss) | No existe | — | Si se añadiera, botón con nombre "Cerrar aviso" | — | no aplica (no inventar) |
| Invalid y error | `danger` con texto de contraseña | web no verificada | 3.3.1: el error se identifica y se describe en texto; si es de un campo, va junto al campo (Input `.Error help`) | — | falta decisión (3) |
| Anuncios | — | web no verificada | 4.1.3: región viva que ya existe en la página antes de escribir el mensaje | — | falta decisión (1) |
| Tokens | Todo local, `feedback/*` | — | — | — | discrepancia de nombres (4, 5) |
| Contraste y forced colors | Ver tabla | — | 1.4.3, 1.4.11 | — | confirmado. En forced colors el fondo desaparece: queda el borde izquierdo (es un trazo, se ve) y el icono |
| Objetivo táctil | — | — | — | — | no aplica |
| Zoom, reflow y texto largo | Ancho fijo 678 en el componente | web no verificada | 1.4.10 | — | falta decisión: en código, ancho al 100 % del contenedor (recomendado) |
| Movimiento | — | — | — | — | no aplica |
| Responsive | Una sola medida | — | — | — | falta decisión en fase 2 (padding en móvil) |

## Variables y nombres incoherentes

- **`State=danger` usa las variables `feedback/error/*`**: el tipo se llama
  danger en el componente y error en los tokens (y el icono es `danger`).
- **Icono pintado con `feedback/<tipo>/border`**: es un relleno de icono
  ligado a una variable de borde (mismo patrón que `background/disabled` en un
  hover). Hoy tienen el mismo valor que `content` salvo en success
  (`border` = green/500, `content` = green/600).
- `State` como nombre de property: en DIME `State` son estados de
  interacción (Default, Hover…); aquí es el tipo de mensaje.
- Cabecera con el título "Accordion".
- La página no tiene *Section* (es un frame, `Frame 39`).

## Decisiones y alternativas

1. **Rol y anuncio.** ¿Dónde aparece el Alert y cuándo?
   *Recomendación:* tres usos documentados — (a) aviso fijo en la página, sin
   rol; (b) mensaje que aparece tras una acción del usuario: `role="status"`
   (o `role="alert"` solo si es un error que bloquea, como la contraseña
   incorrecta), con la región ya presente en el HTML; (c) nunca robar el foco.
2. **Tipo en texto.** El icono distingue el tipo, pero un lector de pantalla
   no lo dice. *Recomendación:* texto oculto visualmente al inicio
   ("Error:", "Aviso:", "Correcto:", "Información:"), o que el título lo diga.
   El icono queda `aria-hidden`.
3. **Errores de formulario.** El texto por defecto es de contraseña.
   *Recomendación:* el error de un campo va en el Input (`.Error help`, junto
   al campo y con `aria-describedby`); el Alert se reserva para mensajes de
   página. Cambiar el texto por defecto a uno neutro.
4. **`danger` o `error`.** *Recomendación:* renombrar la variante a `error`
   para que coincida con los tokens `feedback/error/*` (o al revés, pero
   cambiar un valor de variante es más barato que cuatro variables).
5. **Icono con variable de borde.** *Recomendación:* ligar el icono a
   `feedback/<tipo>/content`. En success cambia de green/500 a green/600
   (más contraste, 5,76:1); en los demás no cambia nada visible.
6. **Nombre de la property `State`.** *Recomendación:* `Type`, como en otros
   componentes donde la variante es de contenido, para no confundirla con los
   estados de interacción. Cambia las instancias de las documentaciones (se
   conservan si solo se renombra).

## Para la fase 2

- Cabecera: título "Alert", descripción oculta, fecha del día.
- Crear la *Section* "Documentation" (la página no tiene ninguna).
- Anatomía con los 4 tipos y la variante sin contenido.

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Cabecera con el título "Alert"; property `State` → `Type`; valor `danger` → `error` (por defecto `error`). Decisiones 4 y 6 cerradas. Las 3 instancias de la doc del Link conservan `Type=info` y su texto.

## Decisiones de Diana (22-11-2026, punto B)

- **Icono de success:** 3,94:1 cumple (3:1 para iconos). No se cambia el color; la decisión 5 queda solo como nombre de variable y se deja como está.

## Decisión 2 · cerrada (26-11-2026)

El tipo no necesita texto oculto aparte: el título del Alert ya lo dice ("Download started", "Download failed") y el icono queda `aria-hidden`.

## Decisiones de Diana sobre el uso (22-11-2026)

- Hoy no hay ningún Alert en la web. Se usará para avisar de lo que acaba de pasar tras una acción: la descarga del CV (texto honesto, "Download started", porque la web no sabe si terminó) y un error si no se puede descargar.
- Contraseña correcta: el botón Access muestra un check; se anuncia como mensaje de estado (`role="status"`), sin Alert visible.
- 404: es una página propia, por diseñar (Figma y Storybook a la vez).
- Warning e info se mantienen en la librería para el futuro.

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`646:90`) junto al frame del Alert, copiada de la del Badge (sin Responsive). Anatomía de 4 partes (fondo y borde, icono, título, contenido opcional) con los 4 tipos y la versión sin contenido; Cuándo usarlo; Recomendaciones; Do y don't apilados con los casos de Diana en inglés (descarga del CV: "Download started" frente a "Success"; error de descarga con qué hacer frente a "Error / Something went wrong."); **Alert o mensaje de estado** (`role="alert"` frente a `role="status"`, y sin rol si está desde que carga la página); Accesibilidad; Properties (`Type`, `Title`, `Content`, `Show content`). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

Pendiente (decisión 3, sin respuesta): el texto por defecto del componente sigue siendo "Password entered is not secure enough."; la recomendación era uno neutro.

## Corrección aprobada por Diana (24-11-2026)

Texto por defecto de `Content` neutro: "Message that explains what happened and what to do." (antes "Password entered is not secure enough."). Decisión 3 cerrada. Tabla de Properties de la doc actualizada.

## Storybook (26-11-2026)

Web component `<dime-alert-region>` (`components/alert/`): una región que existe desde la carga y a la que se inyecta el Alert, para que el lector de pantalla lo anuncie (`role="status"`, o `role="alert"` si es un error que bloquea). La región se rellena con `show({type, title, content})`. Stories: los cuatro tipos (Error, Info, Success, Warning), sin contenido, texto largo y *Aviso que aparece*, con una prueba: la región empieza vacía y, al pulsar el botón, recibe el aviso sin que el foco se mueva. axe sin violaciones.
