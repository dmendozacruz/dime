# Tooltip

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-tooltip>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Tooltips` (`19:18`), sección `Tooltip` (`337:2090`).
  Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Tooltip` (`102:11509`, 4 variantes): `Position` (Top · Bottom · Left ·
    Right; por defecto Top). Top y Bottom 126 × 39; Left y Right 129 × 36.
    Sin property de texto.
  - Anatomía: caja negra (`background/brand`, sin radio) con el texto
    "Tooltip message" (`Body / Small / regular`, `content/inverse`) y una
    flecha (`Pointer`, vector de 6 × 3) en el lado que indica `Position`.
  - **Espaciados sin variable**: padding 12 × 8 (hay `space/3` y `space/2`)
    y gap 10.
  - Variables de color todas locales (0 remotas).
  - Cabecera `.Headers` (`337:2058`): título "Tooltip", descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: candado de la tarjeta de Inditex.
  Según `link.md` (verificado 20-11-2026), el enlace de esa tarjeta ya dice
  "(password protected)" en su nombre accesible.
- APG: [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
  (`role="tooltip"`, `aria-describedby`, aparece con hover **y** foco, Escape
  lo cierra). WCAG 2.2: **1.4.13** (contenido con hover o foco: descartable,
  se puede pasar el ratón por encima, persistente), 1.4.3, 2.1.1, 4.1.2.
  React Aria: `Tooltip` / `TooltipTrigger` (referencia: solo aparece con foco
  de teclado o hover, nunca con toque; el disparador tiene que ser
  enfocable).

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Texto breve junto a un elemento | Candado de Inditex (no verificado) | APG Tooltip | `Tooltip` | falta decisión (1) |
| Anatomía | Caja + texto + flecha | — | Flecha decorativa | — | confirmado |
| Nombre / descripción | Texto sin property | — | El disparador lo referencia con `aria-describedby` | — | discrepancia (3) |
| Disparador | — | Candado (no enfocable, según el mapa) | 2.1.1: debe poder abrirse con el teclado | Disparador enfocable | discrepancia (1) |
| Aparecer / desaparecer | No hay estados (solo `Position`) | — | 1.4.13: Escape lo cierra, no desaparece al pasar el ratón por encima, sigue hasta que se quita el foco o el hover | — | confirmado como requisito |
| Posición | Top · Bottom · Left · Right | — | Debe recolocarse si no cabe (reflow 1.4.10) | — | confirmado |
| Tokens | Colores locales; padding y gap sin variable | — | Nunca valores sueltos | — | discrepancia (4) |
| Contraste y forced colors | Blanco sobre negro 17,4:1 | — | 1.4.3. En forced colors la caja pierde el fondo: hace falta un borde | — | falta decisión (5) |
| Objetivo táctil | — | — | No aplica al tooltip; sí al disparador | — | no aplica |
| Movimiento | — | — | Aparición sin animación o solo sin reduced motion | — | confirmado como requisito |
| Responsive | — | — | En táctil no hay hover | — | falta decisión (1) |

## Variables y nombres incoherentes

- Sin property de texto (`Text`).
- Padding 12 × 8 y gap 10 sin variable.
- Página "Tooltips" (plural), set "Tooltip".

## Decisiones y alternativas

1. **¿Hace falta el tooltip del candado?** El enlace de la tarjeta ya dice
   "(password protected)" en su nombre accesible, pero eso no lo ve quien usa
   ratón o pantalla. *Recomendación:* sustituirlo por texto visible junto al
   candado (p. ej. "Password protected" con el Label o el subtítulo), que
   funciona en móvil, teclado y lector sin tooltip. Si se quiere mantener una
   ayuda emergente, que sea un **Toggletip** (botón ⓘ con nombre). El Tooltip
   se reserva para dar nombre a botones solo con icono (icon button).
2. **Si se mantiene el Tooltip.** *Recomendación:* seguir el APG y React Aria:
   aparece con hover y foco del disparador, Escape lo cierra, el contenido no
   tiene enlaces ni botones, retraso corto al aparecer.
3. **Property de texto.** *Recomendación:* exponer el texto como `Text`.
4. **Espaciados.** *Recomendación:* `space/3` × `space/2` (mismo valor); el
   gap de 10 no hace falta con un solo hijo.
5. **Forced colors.** *Recomendación:* en código, borde transparente de 1 px
   (se vuelve visible en alto contraste). No cambia el aspecto normal ni
   Figma.

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Sección "Tooltip o Toggletip" (aspectos diferenciales).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Padding con `space/3` × `space/2` en las 4 variantes; property `Text`. Decisiones 3 y 4 cerradas.

## Decisiones de Diana (22-11-2026, punto B)

- **Diana quiere que el texto no se vea** (ocupa mucho) y que salga "Password protected" con el tooltip.
- Web: el tooltip aparece con `:hover` y `:focus-within` de la tarjeta (`styles.css`, `.project-card__tooltip`), así que con teclado se ve al llegar a la tarjeta; es decorativo (`aria-hidden`) y el lector lo oye en el nombre del enlace ("…(password protected)").

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`642:107`) en la página Tooltips, copiada de la del Skip nav. Anatomía de 3 partes (caja, texto, flecha) con las 4 posiciones en dos grupos; Cuándo usarlo; Recomendaciones (retraso de 400 ms al entrar, como la web); Do y don't (dos palabras frente a un texto largo); **Tooltip o Toggletip** con el uso real (candado de Inditex, decorativo) y regla rápida; Accesibilidad; Properties (`Position`, `Text`); Responsive (con el dedo no aparece). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

**Para la fase 4:** comprobar WCAG 1.4.13 en la tarjeta de Inditex: el tooltip (variante Left) tiene que poder cerrarse con Escape sin mover el ratón ni el foco si tapa contenido de la tarjeta. Hoy es decorativo (`aria-hidden`) y aparece con `:hover` y `:focus-within`.

## Escape y WCAG 1.4.13 (cerrado, 26-11-2026)

El tooltip se cierra con Escape sin mover el ratón ni el foco, tanto con foco de teclado como con solo ratón (escucha de teclado a nivel de documento mientras está visible). Comprobado en Storybook con la prueba *En su elemento*.

## Storybook (26-11-2026)

Web component `<dime-tooltip>` (`components/tooltip/`) con las cuatro posiciones (Top, Bottom, Left, Right) y un ejemplo *En su elemento*. Escape lo cierra sin mover el ratón ni el foco, también con solo ratón (WCAG 1.4.13). El tooltip es complementario: el nombre accesible del elemento no depende de él. axe sin violaciones.
