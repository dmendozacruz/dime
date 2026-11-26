# Contrato de accesibilidad de los componentes

DIME se implementa en **HTML, CSS y JavaScript sin frameworks**, igual que la web.
React Aria es una librería de React, así que **no se instala**: se usa como
referencia de comportamiento junto con el APG. Objetivo: WCAG 2.2 AA.

## Orden de investigación

1. Observar anatomía, variantes y estados del componente en la librería DIME.
2. Ver cómo se usa en la web (solo como referencia de uso).
3. Consultar el patrón del APG, si existe.
4. Consultar el componente equivalente de React Aria: teclado, foco, anuncios y
   los fallos conocidos de lectores de pantalla que resuelve.
5. Seleccionar los criterios de WCAG 2.2 que realmente aplican.
6. Comparar todo con el código y los tokens, y registrar la matriz en
   `docs/work/[componente].md`.

Figma define la intención visual; WAI-ARIA y WCAG son normas; el APG es una
guía; React Aria es una implementación de referencia. Ninguna sustituye a las
demás. Si discrepan, se registra y se pregunta a Diana.

## Contrato mínimo

### Semántica

- **HTML nativo primero.** Un `<button>` antes que un `div` con `role="button"`.
  Un `<input type="range">` antes que un `div` con `role="slider"` (VoiceOver en
  macOS no envía las flechas a los sliders hechos con ARIA).
- Nombre, rol, valor y estado accesibles en todo control.
- Etiquetas visibles; el placeholder nunca es la única etiqueta.
- Descripción y mensaje de error asociados al control (`aria-describedby`).
- Iconos decorativos con `aria-hidden="true"`.

### Teclado y foco

- Todo lo que se hace con ratón se puede hacer con teclado, con las teclas que
  espera el patrón.
- **Doble anillo de foco de DIME** en todo interactivo: anillo interior
  `--color-focus-ring-inner` y exterior `--color-focus-ring`.
- El foco nunca queda tapado por elementos fijos (WCAG 2.4.11).
- Lo que está oculto no recibe foco: `inert`, `hidden` o `visibility: hidden`;
  nunca solo `opacity: 0`.
- Al abrir y cerrar algo, el foco va a un sitio lógico y vuelve al disparador.
- Recibir el foco nunca cambia el contexto por sí solo (no abre, navega ni envía).
- No mover ni quitar el foco para simplificar una animación.

### Estados

- Solo los estados que están en Figma o que decide Diana.
- No confundir *disabled* con *read-only*, ni *invalid* con mostrar un mensaje.
- Un estado nunca se comunica solo con color.

### Apariencia resistente

- Solo tokens de DIME; ningún valor suelto.
- Contraste: texto 4.5:1 (3:1 si es grande); controles, estados y foco 3:1.
- Objetivos de al menos 24 × 24 px; en DIME, 44 × 44 px.
- Funciona al 200 % de zoom y a 320 px de ancho sin scroll horizontal, y con
  textos largos.
- Sigue siendo usable en modo de alto contraste (forced colors): el foco y los
  bordes no pueden depender solo de `box-shadow` o de un color de fondo.
- Animaciones solo si no hay `prefers-reduced-motion: reduce`.

### Anuncios

- Mensajes de error y estado en una región viva que ya existe en la página
  (`role="alert"` o `role="status"`), nunca creada en el momento.
- Para repetir el mismo mensaje: vaciar y volver a escribir con un pequeño
  retraso.

## Validación

- Árbol de accesibilidad **renderizado** (Chromium y WebKit), no solo el código:
  el navegador puede ignorar nodos que en el HTML sí están.
- Teclado real y foco visible en el navegador.
- addon-a11y de Storybook (axe) como barrera automática, **nunca** como
  certificación.
- Pendiente manual, siempre: VoiceOver real en desktop (macOS, Safari) y TalkBack real en móvil (Android, Chrome), y dispositivo real (los hace Diana).

## Fuentes

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Patrones APG: <https://www.w3.org/WAI/ARIA/apg/patterns/>
- Foco visible: <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible>
- Foco no tapado: <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum>
- Tamaño de objetivo: <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum>
- React Aria: <https://react-aria.adobe.com/getting-started>
