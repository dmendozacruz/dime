# Guía de Storybook

Storybook es la documentación para desarrollo de DIME. Referencia de estructura
y composición: el design system de Nueva York
(<https://designsystem.ny.gov/tokens/>), con los colores y la tipografía de DIME.

## Configuración

- Framework: `@storybook/html-vite` (componentes en HTML, sin React).
- Addons: `addon-docs` (páginas MDX) y `addon-a11y` (axe).
- Las páginas de documentación son MDX. Los bloques reutilizables (muestras de
  tokens, botón copiar…) están en `docs/blocks/` y llevan `.sb-unstyled` para que
  Storybook no les imponga sus estilos.
- Índice "En esta página" activado en todas las páginas (títulos `h2`).
- Tipografía: ABC Monument Grotesk en la interfaz y en la documentación.
- La interfaz de Storybook ("Find components"…) no se puede traducir; la
  documentación va en español.

## Aspecto visual (obligatorio)

**Referencia visual: el design system de Nueva York** (<https://designsystem.ny.gov>).
Antes de diseñar una página o un bloque nuevo, mirar cómo lo resuelve Nueva York
en su web (composición, jerarquía, espaciado) y reproducirlo con los tokens de
DIME. No inventar una composición propia si Nueva York ya tiene una.

### Tipografía de la documentación

Todo en ABC Monument Grotesk. Storybook impone Nunito Sans a 14 px: hay que
sobrescribirlo siempre (está hecho en `docs/blocks/blocks.css`, no duplicarlo).

| Elemento | Estilo DIME | Tamaño |
| --- | --- | --- |
| Título de página (`h1`) | Heading L bold | 48/52 |
| Sección (`h2`) | Heading S bold | 32/40 |
| Subsección (`h3`) | Subheading bold | 24/32 |
| Nombre de token o de story (`h4`) | Body XL bold | 20/28 |
| Texto corrido, listas y tablas | Body M | **16/24, nunca 14** |
| Código en línea | Monoespaciada | 14 |
| Código de las cajas de copiar y valores en bruto | Monoespaciada | 12 |
| Texto secundario (alias, notas) | Body S, `content/subtle` | 14/20 |

### Composición

- Filas de token de tres columnas (3 · 5 · 4) con `gap` de `--space-6` entre
  columnas y `--space-7` entre filas, sin líneas separadoras.
- La muestra, el nombre y la caja de código **empiezan a la misma altura**
  (alineados arriba).
- Muestras de color de 192 × 96 px, con el círculo y el número de contraste
  dentro.
- Caja de código gris (`background/subtle`) con el botón de copiar con **icono**
  de `@storybook/icons` y tooltip.
- Índice "En esta página" a la derecha con los `h2`.
- Colores de la interfaz de Storybook y de los bloques: solo tokens de DIME.

### Errores ya cometidos (comprobar siempre)

1. **Texto a 14 px.** Storybook lo pone así por defecto, también dentro de
   bloques `<Markdown>` y tablas. El texto corrido va a 16 px.
2. **Fuente del navegador (Times) dentro de los bloques.** Los bloques llevan
   `.sb-unstyled` para que Storybook no los toque, así que deben fijar su propia
   fuente.
3. **Elementos que se salen de su columna.** Un `width: 100%` con `padding` sin
   `box-sizing: border-box` desborda y se come el hueco entre columnas.
4. **Muestras desalineadas con el texto** (alineadas abajo en una caja alta).
5. **Botón de copiar de texto** en vez de icono.
6. **Storybook no ve archivos movidos o renombrados** hasta reiniciarlo.

### Cómo comprobarlo

En el navegador, a 1440 px, **midiendo** (no a ojo): tamaño y fuente calculados
de `h1`–`h4`, `p`, `li` y `td`; diferencia de altura entre muestra, nombre y caja
de código en cada fila (debe ser 0); scroll horizontal (0); consola sin errores.

## Organización

En el menú lateral: **Introducción**, **Mapa del sistema**, **Foundations** (Color,
Tipografía, Espacio y layout, Primitivos, Iconos y Logos) y **Componentes**. Las
páginas de Color, Tipografía y Espacio y layout solo muestran los tokens que se
usan en componentes; los primitivos tienen su propia página, como en Nueva York.

## Composición de las páginas de tokens

Cada token es una fila de tres columnas (3 · 5 · 4 de 12):

1. Muestra (con el contraste dentro, en los colores) y valor.
2. Nombre de Figma y para qué se usa.
3. Caja gris con la variable CSS y el botón de copiar (icono de Storybook).

## Qué incluye cada componente

En este orden, como en Nueva York:

1. Título y propósito: qué resuelve y cuándo no usarlo.
2. Ejemplo en vivo con su código.
3. **Accesibilidad**: teclado, roles, estados, patrón APG / React Aria de
   referencia y resultado del addon-a11y.
4. Variantes y estados, cada uno con su story y su código.
5. Do y don't.
6. Propiedades.
7. Variables CSS que usa (tokens).
8. Comportamiento en JavaScript.
9. Dependencias.
10. Enlace al componente en Figma, fecha de actualización e historial de cambios.

## Stories de cada componente

1. **Estado principal**: ejemplo mínimo con contenido realista.
2. **Estados relevantes**: solo los que aplican (disabled, invalid, expanded,
   selected, loading, empty…).
3. **Contenido límite**: texto largo, valor vacío o error, cuando pueden cambiar
   el resultado.
4. **Interacción crítica**: una función `play` que actúa como una persona y
   consulta por rol, nombre o etiqueta, no por clases.
5. **Accesibilidad automática**: `parameters.a11y.test = "error"`.
6. **Comprobaciones manuales**: lo que la automatización no cubre (teclado,
   zoom, alto contraste, VoiceOver en desktop y TalkBack en móvil), anotado en `docs/work/`.

> Pendiente: para ejecutar las funciones `play` como tests hace falta
> `@storybook/addon-vitest` (se quitó al montar el repositorio para aligerarlo).
> Se añade con el primer componente que tenga interacción.

## Convenciones

- Component Story Format: un `export default` con la configuración y un export
  por story.
- Los datos van en `args`; si cambia el escenario o lo que se espera, otra story.
- Una story por estado o escenario; se nombra por lo que demuestra.
- Contenido realista, también el límite (texto largo, vacío, error).
- `parameters.a11y.test = "error"` en los componentes. Nunca desactivar una
  regla para conseguir verde: se corrige o se documenta la excepción.
- Una captura no prueba teclado, semántica ni anuncios.

## Portada y marca

- **Una sola portada**, en la página de Introducción (`public/brand/cover-ds.webp`,
  2000 × 480 px, se ve a 1000 × 240). Es decorativa (`alt=""`); el título
  "DIME Design System" va encima, como texto, en la zona libre de la izquierda.
- **El resto de páginas no lleva cabecera**: empiezan con el título.
- **La marca está en todas las páginas** arriba del menú lateral: el asterisco
  sobre círculo negro (`public/brand/asterisk-dark.svg`) junto al texto
  "DIME Design System" en ABC Monument.
- **Favicon:** el asterisco negro sobre círculo amarillo
  (`public/brand/asterisk.svg`), distinto del de la web para no confundir las
  pestañas.
- Si más adelante hiciera falta, la alternativa sin imágenes es una franja fina
  con el nombre de la sección en texto. No se usa ahora.

## Cómo se construye cada componente (D-017)

- **Con comportamiento** (teclado, abrir y cerrar, mensajes): web component en
  light DOM, `<dime-<componente>>`, que envuelve el HTML nativo y se registra con
  `customElements.define` (en `components/<componente>/<componente>.js`, añadido
  a `components/index.js`). Nunca Shadow DOM. `display: contents` en la etiqueta.
- **Sin comportamiento**: clase con prefijo `dime-` sobre el elemento nativo
  (`<a class="dime-link">`), sin envoltorio.
- El CSS de cada componente se añade a `components/index.css`, que carga
  `.storybook/preview.js`: así todas las páginas (también Uso) lo tienen.

## Sin referencias a la web

La documentación de Storybook describe el sistema, no dónde se usa
(decisión de Diana, 25-11-2026). Nada de «en la web», «como en el footer», «las
tarjetas de The Work», «la home» ni comparaciones con el código de la web. Los
ejemplos usan contenido realista («Open case study», «LinkedIn»), sin decir de
qué página salen. Las diferencias con la web se anotan en `docs/work/`.

## Sin pendientes internos

Storybook solo muestra el sistema tal como es: capas, dónde vive cada cosa, fuentes de
verdad, foundations y componentes con su estado. Lo que falta por hacer, las propuestas
sin diseñar, los límites de lo comprobado y las notas personales van en el roadmap
privado (Notion) y en `docs/work/`, nunca en una página de Storybook.

## Cabecera de los componentes

Como en Nueva York (decisión de Diana, 25-11-2026). En las tres pestañas, bajo el
título, `ComponentHeader` (`docs/blocks/ComponentHeader.jsx`):

1. La descripción del componente (la de Figma).
2. Una fila con la etiqueta **WCAG 2.2 AA** (verde de éxito con check), el enlace
   **Ver en Figma** al component set (el propio Link de DIME, abre en pestaña
   nueva y lo dice en su nombre) y **Última actualización: DD-MM-AAAA**.

Después, la barra de pestañas. La pestaña Uso empieza por un **Overview**: un solo panel
con las combinaciones de las propiedades de Figma juntas y sin rótulos (como Astryx) y sigue con la **Anatomía** en tabla; no hace
falta repetir la imagen numerada de Figma.

## Pestañas de los componentes

Como en Carbon: cada pestaña es **una página propia** con su dirección, y arriba
hay una barra de navegación (`nav` con la página actual en `aria-current`), no
un componente de pestañas ARIA. Pestañas de DIME (decidido 2026-11-18):

- **Uso**: anatomía, cuándo usarlo, recomendaciones, do y don't, sección propia.
- **Código**: componente en vivo, variantes con código, propiedades, tokens,
  JavaScript e historial de cambios.
- **Accesibilidad**: teclado, roles y estados, patrón APG / React Aria,
  resultado automático y comprobaciones manuales.

En Tokens y Foundation no hay pestañas.

## Componentes que reúnen otros (Nav Header y Nav Footer)

El header y el footer van **dentro de «Componentes»**, con las mismas tres páginas de documentación y los ejemplos interactivos, y se llaman
**Nav Header** y **Nav Footer**, como el UNav Header y el UNav Footer del design system de Nueva York, que
también los listan junto al resto de web components. Se construyen igual que los demás (D-017). Como
componen otros componentes, la página de Uso lleva *Composición* en lugar de *Anatomía*, y
*Comportamiento*; sin Do y don't.

- Responden al ancho de su **contenedor** con container queries, para poder ver desktop, tablet y mobile
  uno junto a otro y que a pantalla completa se comporten igual.
- Un contenedor con `container-type` crea un bloque de contención: nada con `position: fixed` puede ir
  dentro de él (como el menú abierto del Nav Header).

## Mobile y tablet en Código y Accesibilidad

Cuando un componente cambia en tablet o mobile (otro tamaño, otra disposición,
otro tamaño táctil), lo dicen las **tres** páginas, no solo Uso:

- **Uso:** la sección *Responsive* con la tabla por ancho (ya existía).
- **Código:** una sección *Responsive* antes de *Tokens*, con el ancho exacto del
  breakpoint (`@media (max-width: 64rem)`, `48rem`…), qué cambia, qué clase lo
  fuerza en cualquier ancho y si el HTML o el JavaScript cambian.
- **Accesibilidad:** una sección *Responsive* antes de *Comprobaciones*: si el
  teclado, el orden de lectura o la semántica cambian entre anchos, y el tamaño
  del objetivo táctil.

Si el componente es igual en todos los anchos, no se añade la sección. Cuando
Diana cambie el diseño de tablet o mobile, se actualizan las tres páginas a la vez
y también el breakpoint del CSS. Hoy lo cumplen Tabs, Skip nav, Process list y
Blockquote; Back to top queda pendiente de su diseño.

## Hecho, para cada componente

- Cumple el apartado **Aspecto visual**, comprobado midiendo en el navegador.
- Si cambia en tablet o mobile, Código y Accesibilidad lo recogen
  (apartado anterior).
- Se ve bien y sin errores en consola, también desde un clon limpio del
  repositorio (`npm install` + `npm run storybook`).
- La interacción crítica tiene una comprobación que se puede observar.
- Cada estado es reproducible sin acciones ocultas.
- El addon-a11y no da violaciones.
- Las comprobaciones manuales pendientes están anotadas en `docs/work/`.

## Fuentes

- <https://storybook.js.org/docs/writing-stories>
- <https://storybook.js.org/docs/writing-tests/interaction-testing>
- <https://storybook.js.org/docs/writing-tests/accessibility-testing>
