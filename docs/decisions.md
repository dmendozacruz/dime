# Decisiones del sistema

Decisiones globales de DIME y su porqué. Las de un componente concreto van en
`docs/work/[componente].md`. Formato: fecha, decisión, motivo y consecuencias.
Una decisión no se borra: si cambia, se añade otra que la sustituye.

## D-001 · Figma es la fuente de verdad · 2026-11-11 · precisada por D-018

**Decisión:** la librería DIME en Figma manda en tokens y componentes. La web
solo es referencia de uso.
**Motivo:** Diana diseña y mantiene el sistema en Figma; la web acumuló valores
sueltos durante su construcción.
**Consecuencia:** si la web y Figma discrepan, se cambia la web (o se pregunta).

## D-002 · Documentación en español · 2026-11-11

**Decisión:** Figma y Storybook se documentan en español. El código (clases,
variables) sigue en inglés.
**Motivo:** preferencia de Diana; nada obliga a que coincidan con el idioma del
código.

## D-003 · Repositorio propio · 2026-11-11 · sustituida en parte por D-023

**Decisión:** DIME vive en `dmendozacruz/dime-design-system`, separado del
portfolio. Privado hasta terminarlo; después, público para enseñarlo.
**Motivo:** el repositorio del portfolio es privado y su historial contiene una
contraseña antigua; cada uno se publica en Vercel por su cuenta.

## D-004 · Los tokens se generan, no se escriben · 2026-11-17

**Decisión:** `scripts/build-tokens.mjs` genera `tokens.css`, `typography.css`,
`tokens.json` (W3C) y `tokens.meta.json` a partir del volcado de Figma.
**Motivo:** que Figma, Storybook y la web no puedan divergir por una edición a
mano.

## D-005 · Nombres de los tokens = nombres de Figma · 2026-11-17

**Decisión:** el nombre CSS sale del de Figma, sin prefijo de sistema:
`content/default` → `--color-content-default`, `space/6` → `--space-6`,
`size/body-l` → `--font-size-body-l`.
**Motivo:** que diseño y código hablen igual.
**Consecuencia:** la web cambia de nombres (`--color-content-1` →
`--color-content-default`, `--spacing-*` → `--space-*`). Ojo: la numeración del
espaciado **no** coincide (`--spacing-5` = 24 px, `--space-5` = 20 px), así que la
migración se hace por valor en px, nunca por número.

## D-006 · Tamaños en rem · 2026-11-17

**Decisión:** tamaños, espaciados e interlineados en `rem`, con el valor en px
comentado.
**Motivo:** el texto crece si la persona aumenta el tamaño de letra del
navegador; además es lo que ya usa la web.

## D-007 · Estilos de texto como clases · 2026-11-17

**Decisión:** cada estilo de texto de Figma es una clase
`.text-[nivel]-[peso]` (`.text-body-l-regular`). Los tokens sueltos se usan solo
si un estilo completo no encaja.

## D-008 · La fuente no se sube · 2026-11-17 · precisada por D-024

**Decisión:** los `.woff2` de ABC Monument Grotesk están en `.gitignore`. En
local se copian desde el portfolio; en producción se cargarán desde
dianamendozacruz.com.
**Motivo:** la licencia no permite redistribuirla, y el repositorio será público.

## D-009 · HTML sin frameworks; React Aria como referencia · 2026-11-17 · sustituida por D-017

**Decisión:** los componentes se escriben en HTML, CSS y JavaScript, como la web.
React Aria y el APG se usan como referencia de comportamiento accesible, no se
instalan.
**Motivo:** meter React en la web solo por la accesibilidad pesaría más y
complicaría el código, cuando ese comportamiento se puede escribir sin él.

## D-010 · Composición de Storybook como Nueva York · 2026-11-17

**Decisión:** la estructura y composición de las páginas siguen
designsystem.ny.gov, con los colores y la tipografía de DIME.

## D-011 · Proceso por capas · 2026-11-17

**Decisión:** primero la Foundation en Storybook, después los tokens de la web (en
una rama, sin cambiar el diseño) y después los componentes de uno en uno
(Figma → Storybook → web). Tras dos componentes, el proceso se convierte en
skill.
**Motivo:** los componentes dependen de los tokens; hacerlo todo en Storybook y
luego todo en la web dejaría los dos desalineados durante semanas.

## D-012 · Mejoras y changelog · 2026-11-17

**Decisión:** toda mejora que proponga el agente necesita el visto bueno de
Diana. Si se aprueba, se actualiza Figma (o se anota en Storybook si solo es de
código) y se registra en `CHANGELOG.md`.

## D-013 · Un solo radio, sin token · 2026-11-18

**Decisión:** el único radio de DIME es 100 px (píldora), en botones y etiquetas.
No se crea token: se escribe en el CSS del componente con un comentario.
**Motivo:** un token para un único valor no aporta nada (decisión de Diana; así
está también en Figma).
**Consecuencia:** el resto de elementos va sin esquinas redondeadas. Si aparece un
segundo radio, se crea la escala de tokens.

## D-014 · Cabecera por sección y pestañas en componentes · 2026-11-18

**Decisión:** las páginas de Storybook llevan una cabecera de sección como Nueva
York (nombre de la sección + ilustración propia de cada sección, y opcionalmente
de cada componente). Los componentes se reparten en tres pestañas como Carbon
(Uso, Código, Accesibilidad), cada una como página propia con una barra de
navegación arriba.
**Motivo:** referencia de Nueva York y Carbon; una página por pestaña conserva
el índice "En esta página", los enlaces directos y una navegación accesible.

## D-015 · Solo una portada, en la Introducción · 2026-11-18

**Sustituye** la parte de cabeceras de D-014 (las pestañas de los componentes
siguen vigentes).
**Decisión:** una única portada en la Introducción; el resto de páginas sin
cabecera. La marca va en el menú lateral (asterisco + "DIME Design System") y como
favicon.
**Motivo:** Diana prefiere algo más sencillo que una cabecera con ilustración por
sección; las páginas de tokens y componentes van más directas.

## D-016 · Una sola skill para documentar y construir componentes · 2026-11-19

**Decisión:** `accessible-component-doc` sustituye a `build-accessible-component`
y al borrador de documentación en Figma. Va por fases (investigar, Figma,
Storybook, web) con una parada de Diana en cada una, y se puede pedir una sola.
**Motivo:** las dos investigaban lo mismo y se activaban con la misma petición;
la documentación de Storybook contiene la de Figma ampliada.
**Consecuencia:** Figma lleva solo información de diseño (reducida); Storybook,
diseño y desarrollo. El detalle de cada una vive en `references/`.

## D-017 · Web components sin Shadow DOM · 2026-11-22

**Decisión:** los componentes de DIME se construyen como **web components en
light DOM** (sin Shadow DOM), sin frameworks. El componente envuelve el HTML
nativo que ya existe y solo le añade el comportamiento: un `<dime-accordion>`
contiene los mismos `<button>` y paneles del acordeón actual. Sustituye a D-009
en lo que se refiere a cómo se empaqueta el código; React Aria y el APG siguen
siendo referencia de comportamiento, no dependencias.
**Motivo:** versatilidad. Una etiqueta y un script funcionan igual en HTML puro,
en Astro (al que migrará la web) y en React o Angular, así que el comportamiento
se escribe una sola vez.
**Por qué sin Shadow DOM:**
- El contenido está en el HTML aunque el script tarde o falle: mismo criterio
  que la web (enlaces nativos, nada depende del JS). Buscadores y lectores de
  pantalla lo ven desde el principio.
- Los estilos globales siguen aplicándose dentro: doble anillo de foco,
  `.visually-hidden`, `.a11y-hidden-group`.
- La accesibilidad no cambia: con Shadow DOM, `aria-labelledby`,
  `aria-controls` y `label for` no cruzan entre el componente y la página.
- Con Shadow DOM el contenido no aparece hasta que carga el JS (salto al
  cargar, peor Lighthouse) y Astro ya no lo genera en el servidor
  (`@astrojs/lit` no está en las versiones actuales). Los tokens sí lo
  atravesarían, pero no el resto del CSS.
**Consecuencias:**
- Storybook sigue con `@storybook/html-vite`: muestra web components si el
  script que los define se carga en `.storybook/preview.js`. Pasar a
  `@storybook/web-components-vite` (controles automáticos) es opcional.
- Orden: se crean en DIME y Storybook ahora y se llevan a la web cuando termine
  su migración a Astro (copiar la etiqueta y cargar el script).
- **Componentes sin comportamiento** (Button, Link, Label, Divider, Card…):
  clase CSS sobre el elemento nativo (`<a class="dime-link">`,
  `<button class="dime-button">`), sin envoltorio. Confirmado por Diana el
  22-11-2026: un `<dime-button>` no añade nada y anidar elementos interactivos
  complica la semántica.

## D-018 · La fuente de verdad pasa de Figma a Storybook · 2026-11-26

**Precisa** D-001.
**Decisión:** Figma es el punto de partida: hasta ahora todo se ha definido allí y el
código lo refleja. Cuando todo esté volcado en Storybook, **Storybook pasa a ser la
fuente de verdad**. A partir de entonces, lo que se cree en código y lo que se diseñe
en Figma se vuelca en Storybook: el flujo es en los dos sentidos (Figma a Storybook y
código a Storybook), con Storybook como referencia.
**Motivo:** Storybook reúne en un solo sitio el diseño documentado, el código que se
publica y las pruebas, así que es lo único que no puede desalinearse del código real.
Y hay cosas que se piensan mejor diseñando y otras que solo se resuelven escribiendo
código: obligar a pasar siempre por Figma, o siempre por el código, frena el trabajo.
**Consecuencias:**
- Mientras tanto, manda Figma (D-001). El cambio de etapa se anota aquí cuando todo
  esté volcado en Storybook.
- Cada cambio se anota en el `CHANGELOG.md` y se vuelca en Storybook (el volcado de
  Figma regenera los tokens; un cambio en código se documenta en su página).
- Si Figma y Storybook discrepan y no está claro cuál es el cambio nuevo, se pregunta.
- La sincronización sin la API Enterprise de Figma se probó en las dos direcciones.

## D-019 · Nav Header y Nav Footer son componentes y responden a su contenedor · 2026-11-26

**Decisión:** el encabezado y el pie son dos componentes más, con el nombre de Figma
(`Nav Header`, `Nav Footer`) y dentro de Componentes, no un grupo aparte de
«Patrones». Reúnen otros componentes (Link, Button, Icon button…) y cambian de
disposición con `@container`, según el ancho de su contenedor y no el de la
ventana.
**Motivo:** así es como lo hace Nueva York (UNav Header y UNav Footer) y evita
mantener una categoría para dos piezas. Con container queries, el mismo componente
se ve en desktop, tablet y mobile dentro de Storybook sin cambiar el tamaño del
navegador.
**Consecuencias:**
- `container-type` crea contención y rompe `position: fixed`: el menú abierto del
  Nav Header va fuera del contenedor y su interior es otro contenedor.
- El resto de componentes sigue con `@media`; las container queries solo se usan
  donde un componente reúne a otros.
- Figma lleva los mismos nombres y la misma estructura (D-001).

## D-020 · Nada se mueve solo más de 5 segundos sin control · 2026-11-26

**Decisión:** ningún movimiento que empiece solo dura más de 5 segundos (WCAG 2.2.2).
El rebote del icon button hace 3 ciclos de 1,5 s y se para (4,5 s); con «reducir
movimiento» no se mueve.
**Motivo:** pasados los 5 s, el criterio pide un control para pausar, y un botón
decorativo no debería necesitarlo.
**Consecuencia:** si algún componente necesita movimiento continuo, lleva un
control de pausa y se anota aquí. La web hoy rebota sin parar (6 px) y se corrige
cuando adopte el componente.

## D-021 · Tablet y mobile se documentan en Código y Accesibilidad · 2026-11-26

**Decisión:** si un componente cambia en tablet o mobile, las páginas de Código y de
Accesibilidad de Storybook lo cuentan: qué cambia, qué punto de ruptura y cómo
afecta al teclado, al foco y al área táctil.
**Motivo:** la accesibilidad cambia con el tamaño (no hay hover, aparecen menús, el
objetivo táctil importa) y solo la página de Uso lo cubría.
**Consecuencia:** una story por tamaño cuando el cambio es de disposición (por
ejemplo Nav Header: Desktop, Tablet y Mobile).

## D-022 · Sin pendientes ni límites en Storybook · 2026-11-26

**Decisión:** Storybook describe el sistema tal como es. Lo pendiente, las
propuestas y los límites van a Notion, y a `docs/work/` como historial.
**Motivo:** quien abre la documentación necesita saber qué ofrece el sistema, no el
estado interno del trabajo.
**Consecuencia:** una página de Storybook no lleva avisos de «pendiente de diseño»;
si algo no está decidido, se omite de la página y queda anotado en la nota del
componente.

## D-023 · Repositorio público con historial limpio, sin licencia de reutilización · 2026-11-26

**Sustituye** la parte de D-003 sobre publicar el repositorio actual.
**Decisión:** el repositorio público se crea de nuevo con un único commit, con el
nombre `dmendozacruz/dime` (hasta ahora `dime-design-system`: un nombre más corto, como
marca). No se mantienen dos repositorios:
el anterior se elimina de GitHub cuando el nuevo esté publicado y comprobado, y su
historial queda solo en la copia local. El código se ve y se puede consultar, pero
no lleva licencia de reutilización: todos los derechos reservados.
**Motivo:** el historial anterior contiene notas internas de trabajo que no hace
falta enseñar, y mantener dos repositorios a la vez es trabajo doble.
**Consecuencia:** los cambios posteriores van como commits normales sobre el
repositorio público.

## D-024 · Storybook en GitHub Pages con la fuente de respaldo · 2026-11-26

**Precisa** D-008.
**Decisión:** Storybook se publica en GitHub Pages
(`dmendozacruz.github.io/dime`) con un workflow que lo despliega en
cada push a `main`. La fuente no se publica: los tokens piden ABC Monument
Grotesk por su nombre y el sitio se ve con Helvetica Neue o Arial.
**Motivo:** gratis, en la misma plataforma que el repositorio y sin cuentas
nuevas. Con la fuente de respaldo el sitio funciona igual y nadie puede
descargarla desde él.
**Consecuencias:**
- El workflow quita las reglas `@font-face` al construir, para no pedir archivos
  que no existen.
- La página de Tipografía lo explica.
- Los recursos (`logos/…`, `icons/…`) se escriben sin barra inicial para
  funcionar bajo `/dime/`.
- La web de dianamendozacruz.com sigue sirviendo su propia fuente.

## D-025 · Una sola comprobación, el gate · 2026-11-26

**Decisión:** `npm run gate` es la comprobación que decide si algo se sube: los
tokens generados coinciden con Figma, cada componente tiene sus páginas y su nodo de
Figma, cada story pasa sus pruebas en un navegador real (interacción y axe) y
Storybook se construye. Una integración continua lo ejecuta en cada pull request.
**Motivo:** las pruebas existían pero no se ejecutaban solas: una prueba de teclado
del Accordion llevaba fallando sin que nadie lo viera.
**Consecuencias:**
- Las stories activan axe como error (`parameters.a11y.test = "error"`), y eso falla
  la ejecución.
- La comprobación manual con lector de pantalla y en dispositivo real la complementa,
  no la sustituye.

## D-026 · Versiones y changelog · 2026-11-26

**Precisa** D-012.
**Decisión:** DIME lleva versión semántica, en `package.json`, y la cabecera de
Storybook la muestra. El `CHANGELOG.md` va por versión. Mientras el sistema crezca
y la web no lo consuma, la versión es `0.x`.
**Motivo:** que quede constancia de cómo evoluciona: qué se añade, qué cambia y qué
se corrige en cada versión.
**Consecuencia:** al publicar una versión, lo de «Sin publicar» pasa a la nueva
sección y se sube `version`.

## D-027 · El foco lleva un hueco de 2 px, como en Figma · 2026-11-26

**Decisión:** el doble anillo de foco mide 6 px desde el borde del componente: 2 px de
hueco, 2 px de anillo interior oscuro y 2 px de anillo exterior amarillo. Es la
geometría de la variante Focus de los 12 componentes de Figma. En código se dibuja con
tres sombras (`box-shadow`) y un contorno transparente (`outline`) para el alto
contraste.
**Motivo:** el hueco separa el anillo del componente. Con el anillo pegado, el
interior oscuro se fundía con los componentes oscuros (el Button, el Back to top). WCAG
2.4.7 y 2.4.13 no exigen ni prohíben el hueco; Material (anillo de 3 px con 2 px de
separación) y las guías de accesibilidad como la de Sara Soueidan lo recomiendan.
**Consecuencias:**
- El hueco no es transparente: se rellena con el color de fondo, `--dime-focus-gap`
  (blanco por defecto). Sobre fondo oscuro (componentes `--inverted`, el menú del Nav
  Header) vale `--color-background-brand`.
- Un componente nuevo copia las tres sombras de cualquiera de los existentes.

## D-028 · El icono no lleva color propio: lo decide el componente que lo usa · 2026-11-28

**Decisión:** los iconos de `public/icons/` son de un solo color y no tienen un token
asociado. En código se inlinan y toman el color del texto que acompañan
(`currentColor`); cada componente fija ese color con su token (`content/default`,
`content/inverse`, el color del tipo en el Alert…). No hay tokens `icon-*`.
**Motivo:** un icono no es nada por sí solo: su color depende del componente donde va,
de su estado (hover, disabled, foco) y del fondo (claro u oscuro). Si el icono guardara
su color, cada cambio de estado obligaría a repetir esa lógica en el icono, y el icono
y su texto podrían acabar en colores distintos. Heredando, el icono siempre acompaña a
su etiqueta y el estado se escribe una sola vez, en el componente.
**Consecuencias:**
- El SVG exportado de Figma lleva `#1A1A1A` dentro; `components/shared/icons.js` lo
  cambia por `currentColor` al inlinarlo. Un icono nuevo se exporta igual y no hay que
  tocar nada.
- Un icono que va como imagen (`<img>`, fondo CSS) no hereda `currentColor`. Si además
  tiene que cambiar de color, se pinta con una máscara (`mask` + `background-color` con
  el token).
- Los iconos de varios colores no entran en este criterio: llevan sus colores dentro y
  no se tokenizan.

