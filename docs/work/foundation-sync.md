# Foundation · sincronización con Figma

## Resumen y estado

- Volcado de Figma y generador de tokens (`npm run tokens`): hechos.
- Storybook: Colores, Tipografía, Espaciado, Layout, Iconos y Logos.
- Abierto: textos de uso de las elevaciones y de algunos colores (los escribió el agente; Diana los confirma).

## Fuentes

- Figma: lectura completa del 2026-11-17 (ver `docs/figma-evidence.md`).
- Web: `mi-portfolio/css/tokens.css` (nombres y valores antiguos).
- Referencia de documentación: designsystem.ny.gov/tokens.

## Diferencias detectadas entre Figma y la web

| Aspecto | Figma | Web | Decisión |
| --- | --- | --- | --- |
| Nombres | `content/default`, `space/6` | `--color-content-1`, `--spacing-5` | Nombres de Figma (D-005) |
| Grises | `neutral/*` (#f7f7f7, #dbdbdb, #5b5b5b…) | #fafafa, #f5f5f5, #e4e4e4, #504d49… | Figma; diferencia casi imperceptible, se revisa en la rama de la web |
| Rojo de error | `feedback/error/content` #a00523 | #da3943 | Figma |
| Colores de proyecto | No existen | `--color-ulma`, `--color-preply`, `--color-shori`, `--color-iplace` | Salen del CSS; el color de cliente vive en las imágenes |
| Espaciado | 4–192 en 16 pasos (incluye 120) | Incluye 100, 104, 116 y 148 | Cada uso pasa al valor más cercano de Figma |
| Interlineados | Body S 20, Subheading 32, Body XL 28, Heading L 52, Label M 20 | 16, 28, 26, 48, 18 | **Por confirmar con Diana** contra sus diseños antes de tocar la web |
| Radios | Un único radio de 100 px en botones y etiquetas, sin token | Pill 100 px; la etiqueta (tag) usa 2 px | Sin token (D-013). Al alinear la web, revisar la etiqueta contra Figma |
| Sombras | `Elevation/s`, `m`, `l` | Valores sueltos | Elevation de Figma |

## Abierto: textos de uso por confirmar

- El uso de cada nivel de elevación (`Elevation/s`, `m`, `l`): los textos de
  `tokens/descriptions.es.json` los escribió el agente.
- Los textos de uso de los colores, sobre todo `background/strong`.

## Hecho

- Volcado de Figma y generador de tokens (`npm run tokens`).
- Storybook: Colores y Tipografía.

## Validación

- Colores y Tipografía revisados en el navegador a 1440 px: sin errores en
  consola ni scroll horizontal; ABC Monument en todo el texto; foco del botón
  copiar con doble anillo.
- Manual pendiente: revisión visual de Diana.

## Sincronización del 2026-11-24 (skill `sync-figma-foundations`)

- **Figma:** 140 variables, 26 estilos de texto, 4 efectos. Cambios: descripción de `background/hover` y efecto nuevo `Blur / Header`.
- **Investigación (Diana pidió mirar Material Design):** Material 3 no tiene tokens de desenfoque (su elevación son niveles sin sombra ni color y usa `scrim` en los modales). Fluent 2 lo trata como material (Acrylic: desenfoque + tinte + ruido, con variables en Figma) y Apple como materials por grosor; los dos lo quitan en alto contraste o si se reduce la transparencia.
- **Decisiones de Diana:** token `--blur-header: blur(4.15px)` y fondo del header al 85 % (`background/default`, opacidad de la pintura en Figma).
- **Código:** `scripts/build-tokens.mjs` separa sombras y desenfoques (radio de Figma ÷ 2, como el código que Figma genera para el header); `tokens.json` lo guarda con `$extensions.dime = "backdrop-filter"`; `tokens.meta.json` gana `blurs`; descripción en `descriptions.es.json`.
- **Storybook:** sección "Desenfoque" en Foundations › Espacio y layout, con muestra, código y respaldo sólido con `prefers-reduced-transparency`.
- **Verificación:** `npm run tokens` (140 variables, 3 sombras, 1 desenfoque, 26 estilos); `storybook build` sin errores; Playwright a 1440 px: `--blur-header` = `blur(4.15px)`, panel `rgb(255 255 255 / 0.85)`, texto 16 px en ABC Monument, 0 px de scroll horizontal. Únicos errores de consola: 404 de los archivos de la fuente, que no se suben al repositorio por licencia (D-008), igual en todas las páginas.
- **Web:** sin tocar. En la fase 4 el header usa `var(--blur-header)` en lugar de `blur(4.15px)` y el respaldo sólido.


## Revisión de la foundation (24-11-2026, a petición de Diana)

- **Tokens:** al día con Figma tras la sincronización (140 variables, 26 estilos de texto, 3 sombras, 1 desenfoque). Las páginas Color, Tipografía, Espacio y layout y Primitivos se generan desde `tokens.meta.json`, así que no quedan valores antiguos en ellas.
- **Nombres antiguos en textos escritos a mano, corregidos:** `border/subtle 2` → `border/subtle` (Color.mdx, `CONTEXT.md`, tema de Storybook), `content/strong` → `content/subtle` (pautas de Storybook, tema), `focus/ring base` → `focus/ring-inner` (`CONTEXT.md`) y el comentario `border/strong` → `border/medium` del borde de los campos del tema (el valor #8c8c8c no cambia). Los colores en hexadecimal del tema coinciden con los tokens.
- **Iconos exportados (`public/icons`, 22 tipos a 20 px):** los nombres coinciden con la librería, pero **`Size=20, Type=menu.svg` dibuja un «+»** (el error corregido en Figma el 19-11): la librería tiene dos líneas horizontales. **Diana tiene que volver a exportarlo.** Solo están los de 20 px; faltan 24 y 28 si se usan.
- **Pendiente en Storybook (sin cambios):** las páginas Iconos y Logos de Foundations y la de Layout y grid siguen sin hacer (⏳ en el mapa).

## Revisión completa de Foundations (24-11-2026)

| Foundation | Figma | Repositorio / Storybook | Estado |
| --- | --- | --- | --- |
| Color | 140 variables | Páginas Color y Primitivos generadas del volcado | ✅ al día |
| Tipografía | 26 estilos | Página Tipografía | **Corregido:** la sección "Button" filtraba estilos que ya no existen (renombrados a `Interaction / …` el 20-11) y salía vacía. Pasa a "Interaction" y muestra los 6 estilos (comprobado en el navegador) |
| Espacio, tamaños, radios, elevación, desenfoque | Variables y 4 efectos | Página Espacio y layout | ✅ al día (desenfoque añadido hoy) |
| Layout y grid | 4 estilos de grid: mobile (4 col, gutter 16, margen 24), tablet (8, 16, 32), desktop (12, 24, 120), header desktop (12, 24, 64), con gutter y margen ligados a variables | Sin página (⏳). Los estilos de grid no entran en el volcado | Pendiente: página en Storybook. En la web el gutter del header es 20 (Figma 24) |
| Iconos | 22 tipos × 3 tamaños (20, 24, 28) | `public/icons`: 22 tipos a 20 px; sin página (⏳) | **`menu` desactualizado** (dibuja un «+»): Diana lo vuelve a exportar. Faltan 24 y 28 si se usan |
| Logos | `Logo` (6 clientes), `Name Diana`, `brand Asterisk`, `Icon interactive` (Default, hover) | `public/logos`: los 10 archivos; sin página (⏳) | Exportados completos. Nombres de archivo distintos de Figma en `Icon Asterisk.svg` (en Figma `brand Asterisk`) y `state=Default/hover.svg` (`Icon interactive`) |

## Iconos y logos: exportación y nombres (24-11-2026)

- **Icono `menu` vuelto a exportar** a petición expresa de Diana (excepción a la regla de que exporta ella): SVG generado por Figma con `exportAsync` (`SVG_STRING`) del componente `Size=20, Type=menu`, sin dibujarlo a mano y sin `download_assets`. Son las dos líneas del botón de menú, idénticas al SVG del hamburger de la web.
- **Un solo tamaño basta:** 20, 24 y 28 son el mismo dibujo en la misma proporción (comprobado en Figma: `arrow left` 0,485 y `close` 0,8 del ancho en los tres tamaños; trazo 1 → 1,2 → 1,4 px). El SVG de 20 px se escala con CSS.
- **Nombres de archivo** en minúsculas y con guiones, sin el prefijo de las variantes de Figma:
  - `public/icons/<tipo>.svg` (p. ej. `Size=20, Type=arrow left.svg` → `arrow-left.svg`).
  - `public/logos/`: `inditex`, `ulma`, `ibercaja`, `santander`, `comunidad-madrid`, `feci`, `name-diana`, `brand-asterisk`, `icon-interactive-default`, `icon-interactive-hover`.
  - Nada del repositorio apuntaba a los nombres antiguos.
- **Erratas que vienen de Figma**, corregidas en el nombre del archivo: `arrow cicle down` → `arrow-circle-down.svg` y `substract` → `subtract.svg`. Corregidas también en Figma (24-11-2026, aprobado por Diana): `Type` del set `Icons` (`171:18285`) con `arrow circle down` y `subtract` en los 3 tamaños; 66 variantes, ninguna perdida. Las instancias se mantienen.
