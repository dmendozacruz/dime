# Back to top

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-back-to-top>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada. Posición y umbral cerrados el 26-11-2026 con una referencia de Diana: fijo abajo a la derecha, a 24 px; aparece al bajar más de 400 px; entra subiendo 12 px y creciendo de 0,9 a 1 en 300 ms (solo fundido con «reducir movimiento»). En tablet y mobile (hasta 1024 px) solo aparece al subir (opción 2, elegida por Diana tras comparar con NN/g, Nueva York City y otras webs); en desktop como antes.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Back to top` (`102:7839`), sección `Back to top`
  (`341:4239`). Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Button Back to top` (`341:4214`, 4 variantes, 44 × 44 px):
    `State` (Default · Hover · Active · Focus). Sin `Size`, sin `Inverted`,
    sin `Disabled`.
  - Anatomía: círculo (radio 100) con borde de 1 px y flecha
    `Icons / Size=28, Type=arrow up`. Padding `space/2` (8), gap `space/1`.
  - Colores por estado:

    | Estado | Fondo | Borde | Flecha |
    | --- | --- | --- | --- |
    | Default | `background/brand` | `border/default` | `border/inverse` |
    | Hover | `base/transparent` | `border/default` | `border/default` |
    | Active | `background/brand` | `border/default` | `border/inverse` |
    | Focus | `background/brand` | `border/default` | `border/inverse` + anillos `focus/ring-inner` y `focus/ring` |

  - Variables todas locales (0 remotas). Sin textos.
  - Cabecera `.Headers` (`337:2416`): título correcto, descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa no existe aún (pedido para los casos de
  estudio). Debe convivir con el menú "On this page" (propuesto, aún sin diseñar y también fijo) sin taparse.
- Gemelos: icon button (`48:2554`, ya documentado con el Button) y Link.
- APG: Button y Link. WCAG 2.2: 1.1.1, 1.4.11, 2.1.1, 2.4.3, 2.4.7, 2.4.11,
  2.5.8, 2.3.3 (AAA, referencia para el scroll suave), 4.1.2. React Aria:
  `useLink` / `useButton` (referencia).

## Aspectos diferenciales: ¿enlace o botón?

| Opción | Qué hace | Teclado | Foco tras activar |
| --- | --- | --- | --- |
| `<a href="#top">` (recomendada) | Navega a un ancla de la misma página | Enter | El navegador mueve el foco secuencial al destino; funciona sin JS |
| `<button>` + `scrollTo()` | Ejecuta una acción | Enter y Espacio | Hay que mover el foco a mano; si no, sigue abajo y el siguiente Tab vuelve al final |

Se ve como un icon button, pero lo que hace es navegar dentro de la página:
por la regla de la skill (el elemento lo decide lo que hace), es un enlace.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Volver al principio de la página | No existe aún | — | — | confirmado |
| Anatomía | Círculo + flecha ↑ | — | Icono decorativo `aria-hidden` | — | confirmado |
| Nombre accesible | No hay texto | — | 1.1.1, 4.1.2: nombre en texto ("Back to top") | — | falta decisión (2) |
| Default | Fondo negro, flecha blanca | — | — | — | confirmado |
| Hover | Se invierte: transparente con flecha negra | — | — | `isHovered` | confirmado |
| Pressed (Active) | **Igual que Default** en todos los colores leídos | — | — | `isPressed` | discrepancia (4) |
| Focus-visible (doble anillo) | `focus/ring-inner` + `focus/ring` | — | 2.4.7, 1.4.11 (amarillo sobre negro 10,7:1) | `isFocusVisible` | confirmado |
| Disabled | No existe | — | — | — | no aplica |
| Teclado | — | — | Enter (enlace) | — | falta decisión (1) |
| Orden y gestión del foco | — | — | 2.4.3: tras volver arriba, el foco tiene que estar arriba | — | falta decisión (1) |
| Fijo en pantalla | — | — | 2.4.11: no puede tapar el foco de otro elemento; debe convivir con "On this page" | — | falta decisión (3) |
| Tokens | Todo local | — | — | — | discrepancia de nombres (5) |
| Contraste y forced colors | Blanco sobre negro 17,4:1; Hover negro sobre la página | — | 1.4.11 | — | confirmado. En forced colors el borde de 1 px mantiene el círculo; en Hover, con fondo transparente, el borde es lo único que lo delimita |
| Objetivo táctil | 44 × 44 | — | 2.5.8 (24 mín.; DIME 44) | — | confirmado |
| Movimiento | — | — | Scroll suave solo sin `prefers-reduced-motion: reduce` | — | falta decisión (1) |
| Responsive | Una medida | — | — | — | falta decisión (3) |

## Variables y nombres incoherentes

- **Flecha pintada con `border/inverse` y `border/default`**: es un icono, debería
  ir con `content/inverse` y `content/default` (mismo valor, distinto uso).
- **Nombre del set `Button Back to top`** y la página "Back to top": si es un
  enlace, el prefijo "Button" confunde. Además ya existe `Button back` (el ←
  de los casos de estudio), que es otra cosa.
- Hover usa `base/transparent` (primitivo de Globals) en vez de un semántico.
- Active idéntico a Default.

## Decisiones y alternativas

1. **Enlace o botón.** *Recomendación:* `<a href="#top">` con el destino en el
   principio del contenido (o el `<h1>` con `tabindex="-1"`). El foco vuelve
   arriba sin JS; si se añade scroll suave, solo con
   `prefers-reduced-motion: no-preference`.
2. **Nombre accesible.** *Recomendación:* "Back to top" (la web está en
   inglés), en `aria-label` o texto oculto; flecha `aria-hidden`. Si hay
   tooltip, que repita ese texto, no que lo sustituya.
3. **Cuándo aparece y dónde.** *Recomendación:* siempre en el DOM (no aparecer
   y desaparecer con el scroll, o si lo hace, sin quitarlo del orden de
   tabulación de golpe), abajo a la derecha, con margen para no tapar el foco
   ni el menú "On this page". Decidir con el diseño de los casos de estudio.
4. **Active igual que Default.** ¿Es intencionado? *Recomendación:* que
   Active se distinga (p. ej. como el icon button), o quitar la variante si no
   aporta. No inventar el aspecto: lo define Diana.
5. **Variables de la flecha.** *Recomendación:* `content/inverse` y
   `content/default`; Hover con `background/default` o un semántico
   transparente, si existe, en vez de `base/transparent`. Mismo aspecto.
6. **Nombre del set.** *Recomendación:* `Back to top` (sin "Button"), y
   decidir si es un tipo del icon button (se documentaría con él, como el
   Button back) o un componente propio. Recomiendo componente propio, por ser
   un enlace fijo con reglas de posición.

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Sección "Back to top o icon button" (enlace frente a botón).
- Falta una versión `Inverted` si se usará sobre fondos oscuros (preguntar; no
  se inventa).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Set renombrado a `Back to top`; flecha con `content/inverse` (Default, Active, Focus) y `content/default` (Hover). Decisiones 5 (solo la flecha) y 6 (nombre) cerradas.

## Decisiones de Diana (22-11-2026, punto B)

- **Active igual que Default:** se mantiene así (decisión 4 cerrada).

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`643:107`) en la página Back to top, copiada de la del Skip nav. Anatomía de 3 partes (círculo, flecha, anillo) con los 4 estados etiquetados; Cuándo usarlo; Recomendaciones (las de `portfolio/CLAUDE.md`: aparece al bajar, oculto también para teclado y lector, no tapa el CTA del footer ni Prev/Next, scroll suave solo sin reduced motion); Do y don't con el botón "Get in touch" (separado frente a solapado); **Enlace o botón**; Accesibilidad; Properties (`State`); Responsive con aviso **warning: posición y aparición pendientes de diseño** (en la web está bloqueado hasta que Diana lo diseñe). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

## Storybook (26-11-2026)

Web component `<dime-back-to-top>` (`components/back-to-top/`): un enlace con forma de botón que aparece al bajar y se quita del orden de tabulación mientras está oculto. Stories: Default, *Teclado* y *Flotante · solo al subir* (con prueba del scroll). Posición, umbral y animación de entrada cerrados el 26-11-2026 (ver Resumen y estado).
