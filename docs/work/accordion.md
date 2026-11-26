# Accordion

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-accordion>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma: componente `99:3471` (State: open / close / focus), documentación en la
  sección `443:13061`. Lectura 2026-11-11.
- Web: Core Skills de la home (`index.html`, `js/main.js` initAccordion,
  `css/styles.css` .accordion).
- APG: <https://www.w3.org/WAI/ARIA/apg/patterns/accordion/>
- React Aria: Disclosure / DisclosureGroup.
- WCAG 2.2: 1.3.1, 2.1.1, 2.4.7, 2.4.11, 2.5.8, 4.1.2.

## Matriz

| Aspecto | Figma | Web | APG / React Aria | Decisión |
| --- | --- | --- | --- | --- |
| Cabecera | 80 px, Body XL bold | 80 px, 20/28 bold | Botón con `aria-expanded` | Igual |
| Panel | Body M | `role="region"` + `aria-labelledby`, `inert` cerrado | Región opcional | Igual |
| Icono +/− | Decorativo | `aria-hidden` | — | Igual |
| Foco | **Doble anillo** | Anillo simple (`outline 2px`) | Foco visible | **Pasar a doble anillo** (Diana, 2026-11-17) |
| Abierto + foco | La variante focus no lo representa | Posible | — | Anotado en la documentación de Figma |
| Encabezado | — | El botón no está dentro de un `h3` | El APG lo recomienda | Pendiente de decidir |
| Título | Property `Text` (`01.  Title`) | Texto en el HTML | Nombre accesible del botón | Igual |
| Contenido libre | Slot opcional (`Show slot` + `Slot`), debajo del texto, 16 px | No existe | El panel admite cualquier contenido | Añadido en Figma (Diana, 2026-11-18). En código: un contenedor opcional dentro del panel, sin ARIA extra |

## Cambios en Figma · 2026-11-18

- Properties nuevas en el set `99:3471`: `Show slot#529:0` (BOOLEAN, false) y
  `Slot#529:4` (SLOT). Diana eligió slot aparte y oculto frente a convertir todo
  el panel en slot.
- En las 3 variantes, `Content` pasa de horizontal a vertical (gap `space/4`,
  alto hug) y lleva un frame `Slot` (`529:794` open, `529:799` close,
  `529:800` focus), ancho completo, alto mínimo 48 px. Sin activar, el
  componente mide lo mismo que antes (137 / 81 / 81 px) y las 10 instancias
  de la página no cambian.
- Comprobado con una instancia temporal (borrada): con contenido el panel crece
  y el divisor queda debajo; cerrar oculta el slot y al reabrir se conserva.
- Documentación: filas `Text`, `Show slot` y `Slot` en Properties, parte 4 de
  Anatomía actualizada y fecha 18-11-2026 en la cabecera.

## Cambios en Figma · 2026-11-19

- Subcomponente nuevo `.Slot` (`534:14`, página Subcomponents): relleno del
  slot con borde discontinuo `border/default`, fondo `background/subtle`,
  padding `space/4`, texto Body/Small/regular `content/default` y property
  `Label` ("Contenido del slot"). Sin radio (D-013). Reutilizable en otros
  componentes con slot.
- Una instancia de `.Slot` es el contenido por defecto del slot en las 3
  variantes: al activar `Show slot` se ve el hueco. Sin activar, el Accordion
  sigue midiendo 137 / 81 / 81 px.
- Documentación: cuarto ejemplo en Estados, "Abierto con slot · Show slot:
  true"; fecha 19-11-2026.
- En la página hay una instancia suelta con el slot activo (`531:4716`) que no
  creó el agente; se ha dejado.

## Storybook (26-11-2026)

Web component `<dime-accordion>` en light DOM, sobre `<button aria-expanded>` y una región (`components/accordion/`). Stories: Default, Open, WithSlot, LongTitle y *Teclado* (Tab entre cabeceras; Enter y Espacio abren y cierran). axe sin violaciones. Las cuatro páginas (Uso, Código, Accesibilidad, Ejemplos) existen y enlazan al nodo de Figma.
