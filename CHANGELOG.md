# Changelog

Cambios notables de DIME, por versión. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/); versión semántica
(ver Gobernanza en Storybook). Cada entrada es corta: qué cambió y a qué afecta. El detalle de
lo hecho hasta la 0.1.0, con los ids de Figma, está en
`docs/work/historial-de-cambios.md` en el repositorio.

## [Sin publicar]

Lo que cambie a partir de ahora va aquí y, al publicarlo, pasa a una versión
nueva y sube `version` en `package.json`: la cabecera de Storybook la muestra.

### Corregido

- **Iconos · Color:** la página explica cómo se colorean de verdad los iconos (en línea, heredando
  el color del componente) y deja la máscara solo para el icono que va como imagen. Decisión
  D-028.

## [0.1.0] - 2026-11-26

Primera versión pública.

### Añadido

- **Tokens** generados desde Figma (`npm run tokens`): colores, tamaños, espaciado, tipografía,
  interacción, elevación y el desenfoque de la cabecera, en CSS y en W3C Design Tokens. Los
  nombres son los de Figma.
- **Foundations** en Storybook: Color, Tipografía, Espacio y layout, Primitivos, Iconos (22),
  Logos y Layout y grid.
- **16 componentes**, documentados en Figma y construidos con tokens, cada uno con tres
  páginas de documentación (Uso, Código y Accesibilidad) y los ejemplos interactivos: Accordion, Alert, Back to top, Badge,
  Blockquote, Button (con icon button y Button back), Card, Divider, Input, Link, Nav Footer,
  Nav Header, Process list, Skip nav, Tabs y Tooltip.
- **Web components en light DOM** para lo que tiene comportamiento y clases `dime-` sobre el
  elemento nativo para el resto (D-017).
- **Nav Header y Nav Footer** responden al ancho de su contenedor. El menú de tablet y mobile se
  abre con un círculo que crece desde el botón y, sin JavaScript, los enlaces se ven en línea.
- **Back to top**: aparece al bajar más de 400 px y entra subiendo y creciendo; en tablet y
  mobile solo aparece al subir.
- **Pruebas**: cada story se ejecuta en Chromium (interacción y axe), y `npm run gate` las
  encadena con la comprobación de tokens, la de estructura y el build, en CI.
- **Storybook**: Introducción, Primeros pasos, Identidad, Gobernanza (Resumen, El gate y Cómo se
  trabaja), Changelog y Mapa del sistema; la versión aparece en la cabecera.
- **Publicación** en GitHub Pages, con la fuente de respaldo.
- **Proceso**: decisiones D-001 a D-026, notas por componente en `docs/work/`, reglas del agente
  (`AGENTS.md`), vocabulario (`CONTEXT.md`) y skills con sus evals.

### Cambiado

- Los componentes pasan de funciones `init…` a web components en light DOM o clases con prefijo
  `dime-` (D-017).
- La web ([dianamendozacruz.com](https://dianamendozacruz.com)) se migra a **Astro** (20 al 23 de
  noviembre de 2026), sin cambios visibles: mismo DOM, mismos estilos calculados y mismo árbol de
  accesibilidad, comparados página a página. Es la base para llevar DIME a la web y para añadir
  otro idioma (`/es/`), porque el contenido pasa a ser componentes y páginas reutilizables.
- Nav Footer y Nav Header pasan a ser componentes dentro de Componentes, no un grupo aparte.
- La fuente de verdad pasa de Figma (punto de partida) a Storybook, donde se vuelca lo que nace en Figma o en código
  (D-018).
- Figma: variables de librerías antiguas pasadas a locales, nombres coherentes (páginas en
  singular, estilos de texto), todos los textos con estilo del archivo, `feedback/*` en Alias.
- La documentación de Figma deja de comparar un componente con otro.
- Card: pasa a ser una Card estándar con un placeholder (fondo gris con un icono de imagen); las imágenes de proyectos dejan de ser variantes del código y se retiran del repositorio. En Figma, `Type=Placeholder` nuevo y las variantes con imágenes se mantienen.

### Corregido

- Anillo de foco (26-11-2026): el código coincide con Figma, que tiene 2 px de hueco, 2 px de anillo negro y 2 px de anillo amarillo (antes, 3 px negro pegado al componente y 3 px amarillo). Aplicado a todos los componentes con foco y a las muestras de la documentación; el hueco toma el fondo oscuro en los componentes `--inverted` y en el menú del Nav Header (`--dime-focus-gap`). D-027.
- Accesibilidad: `role="list"` en Process list, Accordion y la lista de Badge; el Tooltip se
  puede mantener (1.4.13) y cerrar con Escape también con solo ratón; el Nav item en foco lleva
  subrayado y peso Medium como en Figma; el rebote del icon button dura menos de 5 s (2.2.2).
- Icono de menú que dibujaba un «+»; Input con `Masked=False` que seguía mostrando puntos; icon
  button inverted con el fondo equivocado.
- La prueba de teclado del Accordion, que fallaba sin que nadie lo viera.
- Valores sueltos de CSS pasados a tokens; el toggle del Nav Header ya no depende del orden de
  carga.
