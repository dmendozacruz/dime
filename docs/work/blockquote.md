# Blockquote

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Blockquote` (`404:1564`), sección `Quote` (`404:1574`).
  Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Quote` (`404:1620`): **componente suelto, sin ninguna property**.
    754 × 104 px.
  - Anatomía: icono de comillas `.icon Quote` (`404:1611`, 80 × 80, página
    Subcomponents; dentro, el vector “ de 60 × 52 con `background/brand`) y
    un frame `Quote` (650 de ancho) con el texto "Text for the quote"
    (`Heading / Small / light`, `content/default`).
  - Variables todas locales (0 remotas): gap `space/6` (24), padding arriba y
    abajo `space/7` (32). Gap interno de 8 **sin variable**.
  - **No hay autor ni fuente** (ni capa ni property).
  - Nombre del componente `Quote`; la página se llama Blockquote.
  - Cabecera `.Headers` (`404:1575`): título "Blockquote", descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: testimonio de Ulma y "Learnings" de
  Inditex.
- HTML: `<blockquote>` para citas de otra persona; `<figure>` +
  `<figcaption>` para la atribución
  ([HTML Living Standard, ejemplos de `blockquote`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element)).
  WCAG 2.2: 1.1.1 (comillas decorativas), 1.3.1, 1.4.3, 1.4.4, 1.4.12.
  React Aria: no aplica.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Cita destacada | Testimonio (Ulma) y aprendizajes (Inditex), no verificado | `<blockquote>` solo si es una cita; un texto destacado propio no es `<blockquote>` | — | falta decisión (1) |
| Anatomía | Comillas + texto | — | Comillas decorativas `aria-hidden` (el lector ya anuncia "cita") | — | confirmado |
| Atribución | No existe | Testimonio (tendrá autor) | `<figcaption>` fuera del `<blockquote>` | — | falta decisión (2) |
| Texto | Sin property: solo se cambia entrando en la instancia | — | — | — | discrepancia (3) |
| Estados interactivos | No existen | — | No es interactivo | — | no aplica |
| Tokens | Locales salvo un gap de 8 | — | — | — | discrepancia menor (4) |
| Contraste y forced colors | Texto 17,4:1; comillas `background/brand` | — | 1.4.3 | — | confirmado |
| Zoom y texto largo | Ancho fijo 754, texto de una línea | — | 1.4.10, 1.4.12: el texto tiene que crecer en alto | — | confirmado como requisito |
| Responsive | Una medida; comillas de 80 px | — | — | — | falta decisión en fase 2 (tamaño de las comillas en móvil) |

## Variables y nombres incoherentes

- Componente `Quote` en la página Blockquote (y en el mapa "Blockquote").
- Comillas pintadas con `background/brand` (es un icono: `content/default`,
  mismo valor).
- Gap de 8 sin variable (`space/2`).
- Sin property de texto.

## Decisiones y alternativas

1. **¿Cita o texto destacado?** En Ulma es un testimonio (cita de otra
   persona); en Inditex, "Learnings" puede ser texto de Diana.
   *Recomendación:* `<blockquote>` solo para citas reales; para un texto
   propio destacado, el mismo aspecto sin `<blockquote>` (párrafo con clase).
   Se documenta en "Cuándo usarlo".
2. **Autor.** *Recomendación:* añadir en Figma una línea opcional de
   atribución (`Show author` + `Author`, texto) debajo de la cita, para el
   testimonio. Es un cambio en el componente: necesita visto bueno y diseño de
   Diana (estilo y espacio).
3. **Property de texto.** *Recomendación:* exponer el texto como property
   `Text`, como el resto de componentes.
4. **Variables.** *Recomendación:* gap interno `space/2` y comillas con
   `content/default`. Mismo aspecto.
5. **Nombre.** *Recomendación:* `Blockquote` en Figma, Storybook y código
   (coincide con la página, el mapa y el elemento HTML).

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Sección "Blockquote o texto destacado".

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Componente renombrado a `Blockquote`; property `Text`; gap con `space/2`; comillas de `.icon Quote` con `content/default`. Decisiones 3, 4 y 5 cerradas.

## Decisiones de Diana (22-11-2026, punto B)

- **Autor:** añadido en Figma para el testimonio de Ulma. Properties `Show author` (booleana, `false`) y `Author` (texto); estilo `Body / Extra large / bold`, `content/default`, 16 px (`space/4`) bajo la cita, como en la web (`.work-results__quote-author`, 20 px bold). El marco de la cita pasa a vertical con ancho fijo 650: sin autor mide lo mismo que antes (754 × 104); con autor, 754 × 148.
- Ojo para la fase 4: en la web el testimonio de Ulma es una caja con borde y sin comillas, no este componente.

## Web revisada (23-11-2026)

- Ulma: `<figure class="work-results__quote" aria-label="Client testimonial"><blockquote><p>…</p></blockquote><figcaption><cite>Igor Lacalle, …</cite></figcaption></figure>`. Caja con borde, sin comillas.
- Inditex (Learnings): `<figure>` con la comilla decorativa (`aria-hidden`) y `<blockquote>` con un texto de Diana. Es texto destacado propio, no una cita: **pendiente de decidir en la fase 4** si deja de ser `<blockquote>` (decisión 1 de esta nota).

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`640:90`) en la página Blockquote, copiada de la del Badge. Anatomía de 3 partes (comillas, texto, autor opcional) con diagrama y tabla; Variantes sin autor y con autor; Cuándo usarlo; Recomendaciones; Do y don't apilados (el componente mide 754): testimonio con autor frente a sin autor, cita corta frente a larga; **Blockquote o texto destacado** con usos reales (Ulma, Inditex) y regla rápida; Accesibilidad; Properties (`Text`, `Show author`, `Author`). Sin Responsive. Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

## Storybook (26-11-2026)

Clase `dime-blockquote` sobre `<blockquote>`, con la comilla del Figma (`quote.svg`) pintada por máscara para que siga el token de color (`components/blockquote/`). Va en un `<figure aria-label="Cita">` con `<blockquote>` y, si hay autor, `<figcaption><cite>`. Stories: Default, WithAuthor y Long. axe sin violaciones.
