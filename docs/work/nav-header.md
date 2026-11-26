# Nav Header (antes Header nav)

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-nav-header>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada. Sin JavaScript, los enlaces se ven en línea (`@media (scripting: none)`), y el menú se abre con un círculo que crece desde el botón (decidido el 26-11-2026, Diana eligió esa animación entre tres). Si el script falla al cargar con JavaScript activado, el botón no abre nada: caso raro, sin tratar.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Header nav` (`19:25`), sección `Header` (`337:2480`).
  Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura). Tres piezas:
  - **`Header`** (`102:7511`, 3 variantes): `Breakpoint` **L-XL** (1440 × 72)
    · **M** (769 × 72) · **S** (390 × **76**).
    - L-XL: logo `Name Diana`, `Nav item` con 4 ítems ("Home", "Works",
      "About me", "Contact"; el primero en Active) y un `Button` small con el
      texto de plantilla **"Button"** e icono `arrow right`. El `icon button`
      está oculto.
    - M y S: logo + `icon button` con icono `menu` (28 px; medium en M, large
      en S). Nav y Button ocultos. **No hay variante con el menú abierto ni
      icono de cerrar.**
    - Fondo `background/default` con **desenfoque de fondo (background blur)
      de 8,3 sin estilo ni variable**; en M hay además un relleno blanco
      **sin variable**.
    - Espaciados sin variable: gap 24 (M y S), 10 y 8.
  - **`Item`** (`102:11436`, 4 variantes, 64 × 56): `State` (Default · Hover
    · Active · Focus), `Text` ("Item"). Active y Focus en
    `Interaction / Medium / medium` (el ancho pasa de 64 a 65 px); Default y
    Hover en `regular`. Subrayado con `border/default`; foco con
    `focus/ring-inner` + `focus/ring`.
  - **`Nav item`** (`339:3021`, componente): fila de ítems con
    `Show Item 4` (`true`), `Show Item 5` y `Show Item 6` (`false`).
  - Variables todas locales (0 remotas). Estilos de texto en todos.
  - Cabeceras: `337:2448` (principal, título "Header", descripción de
    plantilla, fecha 2025-2-15), `337:2484` ("Header") y `337:2490` ("Nav
    items"), de subsección, con descripción de plantilla. Sin sección
    *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: header y menú móvil / tablet. Según
  el CHANGELOG (showcase de Layout y grids en Figma, 19-11-2026): hamburguesa a 1024 px desde
  el 01-10-2026 y header de tablet de 78 px — **no coincide** con los 72 px de
  la variante M.
- APG: [Disclosure navigation menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
  (no `role="menu"`, que es para menús de aplicación). Landmarks `banner` y
  `navigation`. `aria-current="page"`. WCAG 2.2: 1.3.1, 1.4.10, 1.4.11,
  2.1.1, 2.4.1, 2.4.3, 2.4.7, 2.4.11, 2.5.8, 4.1.2. React Aria: no tiene
  navegación de sitio; referencia `useDisclosure` para el botón del menú.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Cabecera con logo, navegación y CTA | web no verificada | `<header>` (banner) + `<nav aria-label>` | — | confirmado |
| Anatomía | Logo + ítems + Button (L-XL); logo + menú (M, S) | — | — | — | confirmado |
| Nombre accesible | Ítems con texto; botón de menú sin texto | web no verificada | `<nav aria-label="Main">`; botón de menú con nombre ("Menu") | — | falta decisión (3) |
| Logo | `Name Diana` | web no verificada | Enlace a inicio con nombre ("Diana Mendoza, home") | — | web no verificada |
| Default / Hover | Ítem normal / subrayado | — | — | — | confirmado |
| Active (página actual) | `medium` + subrayado | — | `aria-current="page"` (no solo estilo) | — | confirmado; ancho cambia 1 px (5) |
| Focus-visible (doble anillo) | Ítem Focus con anillos | — | 2.4.7, 1.4.11 | — | confirmado |
| Expanded (menú abierto) | **No existe** | Hay menú móvil / tablet (según mapa) | Botón con `aria-expanded`, `aria-controls`; Escape cierra y el foco vuelve al botón | `useDisclosure` | falta decisión (1) |
| CTA del header | `Button` con texto "Button" | web no verificada | — | — | falta decisión (2) |
| Orden y gestión del foco | — | — | Skip nav antes del header (2.4.1); al abrir el menú, el foco sigue en el botón y el primer Tab entra en la lista | — | confirmado como requisito |
| Header fijo | Fondo con blur | web no verificada | 2.4.11: si es fijo, `scroll-padding-top` para no tapar el foco | — | falta decisión (4) |
| Tokens | Blur sin estilo, relleno blanco y gaps sin variable | — | Nunca valores sueltos | — | discrepancia (6) |
| Contraste y forced colors | Texto 17,4:1; subrayado `border/default` | — | 1.4.3, 1.4.11; el Active no solo con peso | — | confirmado (subrayado + peso + `aria-current`) |
| Objetivo táctil | Ítem 56 px de alto; icon button 44 / 52 | — | 2.5.8 | — | confirmado |
| Zoom y reflow | Breakpoints | — | 1.4.10 a 320 px | — | confirmado |
| Movimiento | — | — | Animación del menú solo sin reduced motion | — | falta decisión (1) |
| Responsive | L-XL · M · S | Hamburguesa a 1024 px; header de tablet 78 px | — | — | discrepancia (7) |

## Variables y nombres incoherentes

- **`Breakpoint` L-XL · M · S** aquí; en `Footer` y `layout cards` el mismo
  concepto es `Breakpoint` / `Type` desktop · tablet · mobile.
- `Item` y `Nav item`: nombres genéricos (en el archivo hay `Tabs Items` y
  otros "Item").
- `Show Item 4/5/6`: el Tabs usa `Show item 3/4` (minúscula).
- Blur de fondo sin estilo de efecto (DIME tiene `Elevation / *` para sombras,
  no para blur) y relleno blanco sin variable en M.
- Alto de S (76) distinto de L-XL y M (72); el CHANGELOG dice tablet 78.
- Texto de plantilla "Button" en el CTA.

## Decisiones y alternativas

1. **Menú abierto.** Figma no tiene el estado abierto del menú móvil / tablet
   ni el icono de cerrar, y la web sí tiene menú. *Recomendación:* diseñarlo en
   Figma antes de la fase 2 (variante `Menu open` en M y S, con icono `close`)
   y seguir el patrón *Disclosure navigation* del APG: botón con
   `aria-expanded`, Escape cierra, el foco vuelve al botón.
2. **CTA del header.** ¿Qué dice y adónde lleva? *Recomendación:* copiar el
   texto real de la web (no verificado aquí) y, si abre el correo o navega, que
   sea un `<a>` con aspecto de botón (como el "Let's talk" del footer en
   `button.md`).
3. **Nombres accesibles.** *Recomendación:* `<nav aria-label="Main">`, botón
   de menú "Menu" (sin cambiar a "Close", el estado lo da `aria-expanded`),
   logo "Diana Mendoza, home". Confirmar contra el HTML de la web.
4. **¿Header fijo?** El blur sugiere que sí. *Recomendación:* si es fijo,
   `scroll-padding-top` igual al alto del header para cumplir 2.4.11.
5. **Ancho de Active y Focus.** Igual que se decidió en el Button (todos los
   estados en `regular`) o como en el Link (se mantiene `medium`).
   *Recomendación:* mantener `medium` en Active (marca la página actual, no
   hay fondo) y pasar Focus a `regular` si no es también la página actual,
   porque el foco ya se ve con el doble anillo.
6. **Valores sueltos.** *Recomendación:* gap 24 → `space/6`, 8 → `space/2`,
   10 → `space/2` o `space/3` (se nota 2 px); relleno blanco →
   `background/default`; el blur, crear un estilo de efecto o dejarlo
   documentado como excepción (decide Diana).
7. **Breakpoints.** *Recomendación:* renombrar a desktop · tablet · mobile
   como el Footer, y revisar el alto de tablet (72 en Figma, 78 según el
   CHANGELOG del Layout) y de móvil (76).

## Para la fase 2

- Cabeceras: principal con descripción oculta y fecha del día; las de
  subsección con su descripción real.
- Sección "Header nav o Tabs" (navegar entre páginas frente a cambiar de
  panel).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
`Breakpoint` L-XL · M · S → desktop · tablet · mobile; relleno blanco de tablet con `background/default`; gaps de 24 y 8 con `space/6` y `space/2`. Quedan el gap de 10, el blur y los altos (decisión B).

## Decisiones de Diana (22-11-2026, punto B)

- **Menú abierto (móvil y tablet):** existe en los diseños de Diana; falta traerlo a la librería (pendiente de cómo).
- **Botón del header:** corregido por Diana en Figma como está en la web.
- **Altos:** 72 en desktop y tablet, 76 en móvil (cambiados por Diana). Recomendación pendiente para móvil.
- **Blur:** en la web `backdrop-filter: blur(4.15px)` sobre blanco al 85 % (equivale al 8,3 de Figma). Recomendación pendiente: estilo de efecto.
- **Estilo de efecto `Blur / Header`** creado (desenfoque de fondo 8,3; en CSS `blur(4.15px)`) y aplicado a las 3 variantes. Junto a `Elevation / *`. Pendiente: llevarlo a los tokens con `sync-figma-foundations`.
- Alto móvil: 60 px (Diana bajó el botón de menú).

## Menú abierto · decisiones de Diana (22-11-2026)

- **Property `Menu` (Closed · Open) en el Header**, variantes de tablet y móvil. Nada de componente aparte.
- **Separación entre enlaces: 32 px (`space/7`)**, la de la web (Figma tenía 24).
- **Tablet:** el mismo menú que móvil, adaptado a 769 de ancho.
- **Animación:** se mantiene la de la web (hamburguesa → X 300 ms, panel con fundido y 8 px en 250 ms, enlaces en cascada 80–260 ms, nada con reduced motion). Los dos botones de cerrar superpuestos se quedan mientras la animación sea la misma.
- **Foco (requisito):** al abrir, el foco entra en el menú; al cerrar, vuelve al botón que lo abrió. La web ya lo hace (`js/mobile-menu.js`): foco al botón Close al abrir y al hamburger al cerrar, con trampa de foco, `inert` en el fondo y Escape.
- **Anillo de foco:** el bueno es el de Figma (doble anillo); en la web los enlaces del menú y el hamburger tienen un anillo simple de 2 px y se corrigen en la fase 4.
- Ojo: los enlaces del frame `Menu` (`617:8171`) usan un estilo de texto de una copia de la librería (`Heading/Large/bold`, remoto); al integrarlo se pasa al local `Heading / Large / bold`.

## Menú abierto · construido en Figma (22-11-2026)

- **`Item`** (`102:11436`): nueva variante `Type` (Nav · Menu). Las 4 de siempre pasan a `Type=Nav`. Nuevas: `Type=Menu, State=Default` (`624:119`) y `Type=Menu, State=Focus` (`624:124`): `Heading / Large / bold` local, `content/inverse`, fondo `background/brand`, sin padding ni subrayado; Focus con el mismo doble anillo (`focus/ring-inner` + `focus/ring`) que se estira con el texto. Solo Default y Focus (decisión de Diana: en móvil no hay hover y el pulsado sería igual que Default).
- **`Header`** (`102:7511`): nueva property `Menu` (Closed · Open). Las 3 de siempre pasan a `Menu=Closed`. Nuevas: `Breakpoint=mobile, Menu=Open` (`625:119`, 390 × 844) y `Breakpoint=tablet, Menu=Open` (`625:134`, 769 × 1024): fondo `background/brand`, barra de 60 px con el mismo padding que la cerrada y el `icon button` inverted con la X en la misma posición que la hamburguesa (322 px en móvil, 693 en tablet), y los 4 enlaces (`Item Type=Menu`) centrados con 32 px entre ellos (`space/7`). Sin logo, como en la web.
- La sección `Header` (`337:2480`) crece 1018 px y lo que había debajo (cabecera "Nav items", `Item`, `Nav item` y sus etiquetas) baja esa misma distancia, sin cambiar su colocación.
- El frame de trabajo de Diana `Menu` (`617:8171`) sigue en la página sin tocar; se puede borrar cuando ella quiera.
- La animación y el foco no se dibujan en Figma: van en la documentación (aviso con los tiempos) y en Storybook.

## Menú abierto · rehecho como componentes independientes (23-11-2026)

Diana detectó que la property `Menu` del Header y la variante `Type` del `Item` dejaban combinaciones que no existen (Desktop abierto, Menu + Hover): Figma salta a otra variante sin avisar. Decisión: componentes independientes, sin combinaciones vacías.

- **`Header`** (`102:7511`): vuelve a tener solo `Breakpoint` (desktop · tablet · mobile).
- **`Menu`** (`636:114`), nuevo: `Breakpoint` tablet (`625:134`) · mobile (`625:119`). Son las mismas variantes de ayer (mismo ID); la X sigue en el sitio de la hamburguesa (693,8 en tablet; 322,8 en móvil). Debajo del Header, con la etiqueta "Menú abierto".
- **`Item`** (`102:11436`): vuelve a sus 4 estados (Default · Hover · Active · Focus), sin `Type`.
- **`Menu item`** (`636:113`), nuevo: `State` Default (`624:119`) · Focus (`624:124`) y property `Text`. Los 8 enlaces del `Menu` siguen enlazados y con su texto. Debajo del `Item`, con etiquetas "Default" y "Focus".
- La sección se reajusta para dejar 96 px entre el `Menu` y el bloque "Nav items", como antes.

## Decisión de Diana (24-11-2026)

- El Header (con `Menu`, `Item`, `Menu item` y `Nav item`) se documenta **como patrón**, igual que el Footer.

## Web revisada (24-11-2026)

`<header class="site-header">` con el logo `<a href="/">Diana Mendoza</a>`, `<nav aria-label="Primary">` (Home con `aria-current="page"`, Works, About me, Contact), Resume (`<a download aria-label="Download resume">`) y el botón de menú (`aria-label` "Open menu" / "Close menu", `aria-expanded`, `aria-controls="menu-overlay"`). Fondo transparente arriba y blanco con `blur(4.15px)` al bajar; en tablet y móvil, desenfoque siempre y se esconde al bajar.

## Fase 2 · Documentación en Figma como patrón (24-11-2026)

Sección *Documentation* (`674:107`) a la derecha de la sección del Header, con la estructura de patrón aprobada (sin Do y don't ni Properties): **Composición** (header de tablet, navegación y Resume de desktop; 5 partes con componente y configuración: logo, Nav item / Item, Button, icon button, Menu / Menu item); Variantes: Header tablet y mobile, Menu abierto tablet y mobile, y los enlaces (Item y Menu item con sus estados); Cuándo usarlo; Recomendaciones; **Comportamiento** (desktop frente a tablet y móvil, con la animación de la web); Accesibilidad; Responsive (cambio a menú en 1024 px, altos 72 / 60 / 60). Cabecera del componente: fecha 24-11-2026, descripción oculta. Estado: en revisión por Diana.

## Fondo y desenfoque (24-11-2026)

Decisión de Diana: fondo `background/default` al 85 % (opacidad de la pintura, en las 3 variantes) con el efecto `Blur / Header`, como en la web. En código: `--blur-header` y respaldo sólido con `prefers-reduced-transparency`.

## Storybook (25-11-2026)

- Patrón en `patterns/header/` (CSS + web component `<dime-header>`, D-017), páginas Uso, Código y Accesibilidad en «Patrones/Header». Medidas comprobadas contra Figma: barra de 72 px en desktop y 60 en tablet y mobile; botón del menú en x = 693 (tablet) y 322 (mobile); menú abierto de 844 px con los 4 enlaces (48/52 bold, 32 px entre ellos).
- Comportamiento del menú: foco al botón de cerrar al abrir, resto `inert`, Tab atrapado, Escape y vuelta del foco al botón; verificado con el teclado en el navegador.
- **Abierto:**
  - ~~Logo como texto~~ → corregido (26-11-2026) a petición de Diana: es el vector `Name Diana` (`public/logos/name-diana.svg`) dentro del enlace, con `aria-label="Diana Mendoza, home"`.
  - **Nombres accesibles (decisión de Diana, 26-11-2026): se unifican al actualizar la web**, no antes. La web hoy usa otros nombres; entonces se elige un juego y se aplica en los dos sitios. Estado actual en Storybook: el botón del menú se llama «Menu» fijo y `aria-expanded` da el estado (recomendación de la decisión 3); la web usa «Open menu» / «Close menu» y `aria-label="Primary"` en la navegación (Storybook usa «Main»). Hay que elegir uno y unificar en la fase web.
  - **Botón de contacto:** «Resume» con `aria-label="Download resume"` y atributo `download`, como en la web.
  - **Bloqueo de scroll:** `overflow: hidden` en `<html>` mientras el menú está abierto (la web usa `position: fixed` en el body por iOS); si falla en iOS real, cambiar al de la web.

## Nombre y consistencia con Storybook (26-11-2026)

A petición de Diana, el Header deja de ser «patrón» y se llama **Nav Header**, como en Storybook (dentro de Componentes, igual que el UNav Header del design system de Nueva York). En Figma: página `↳ Nav Header` (sin el asterisco), set `Nav Header`, título de la cabecera de documentación y los textos que decían «patrón». Los subcomponentes (`Item`, `Nav item`, `Menu`, `Menu item`) mantienen su nombre.
- La sección del componente en Figma también se llama `Nav Header` (antes `Header`), con el título de su cabecera y el de la primera subsección. Las dos subsecciones («Nav Header» y «Nav items») tenían el texto de plantilla «Frame description text that’s just a little longer»: se oculta la descripción (y la categoría) para que sean como el resto de cabeceras, que no llevan introducción.
