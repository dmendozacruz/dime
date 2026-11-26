# Divider

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Divider` (`19:21`), sección `Divider` (`114:13410`).
  Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Divider` (`114:13404`, 2 variantes): `Type` (**black** · **inverse**;
    por defecto black). Sin más properties.
  - Cada variante es un vector de línea de 1 px de alto: `Type=black`
    148 px de ancho, color `border/default`; `Type=inverse` **149 px**,
    color `border/inverse`. Sin auto layout.
  - Variables todas locales (0 remotas).
  - Hay un rectángulo `back surface` (`113:13397`) en la sección para mostrar
    la versión inverse sobre oscuro.
  - Cabecera `.Headers` (`337:2201`): **título "Tooltip"** (copiado),
    descripción de plantilla, fecha 2025-2-15. Sin sección *Documentation*.
  - Se usa dentro del `Footer` (`Divider / Type=inverse`).
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: separadores del acordeón y del footer.
- WAI-ARIA: `<hr>` tiene rol `separator` (se anuncia); un borde CSS no se
  anuncia. WCAG 2.2: 1.3.1, 1.4.11 (solo si la línea es necesaria para
  entender el contenido). React Aria: `Separator` (`useSeparator`),
  referencia.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Línea separadora | Acordeón y footer (no verificado) | `<hr>` si separa temas; borde CSS si es decoración | `Separator` | falta decisión (1) |
| Anatomía | Línea de 1 px | — | — | — | confirmado |
| Variantes | `Type` black · inverse | — | — | — | discrepancia de nombre (2) |
| Estados interactivos | No existen | — | No es interactivo | — | no aplica |
| Orientación | Solo horizontal | — | `aria-orientation` solo si fuera vertical | `orientation` | confirmado (horizontal) |
| Tokens | `border/default`, `border/inverse` | — | — | — | confirmado |
| Contraste y forced colors | 17,4:1 sobre su fondo | — | 1.4.11 no obligatorio si es decorativo | — | confirmado. En forced colors `<hr>` y bordes se mantienen |
| Ancho | Fijo 148 / 149 | — | — | — | discrepancia menor (3) |
| Responsive | — | — | — | — | confirmado: ocupa el ancho del contenedor (en código) |

## Variables y nombres incoherentes

- `Type=black` frente a `Type=inverse`: uno nombra un color y el otro un uso.
  El resto de DIME usa `Inverted` (false · true) en Button y Link.
- Anchos distintos entre variantes (148 y 149).
- Cabecera con el título "Tooltip".
- Capas `Line 3 (Stroke)` y `Line 151 (Stroke)`.

## Decisiones y alternativas

1. **¿Se anuncia o no?** *Recomendación:* dos usos en código — `<hr>` cuando
   separa bloques de contenido distintos (p. ej. el footer del resto) y borde
   CSS (o `<hr aria-hidden="true">`) cuando es decoración dentro de un
   componente (filas del acordeón). Figma no cambia.
2. **Nombre de la variante.** *Recomendación:* `Inverted` (false · true),
   igual que Button y Link. Las instancias conservan el valor si se renombra
   bien (el del footer usa `inverse`).
3. **Ancho.** *Recomendación:* mismo ancho en las dos variantes y, si se
   convierte a frame con auto layout, ancho "fill" para que se estire con el
   contenedor.

## Para la fase 2

- Cabecera: título "Divider", descripción oculta y fecha del día.
- Documentación corta (componente pequeño), pero con su sección
  *Documentation* (regla de `figma-doc.md`).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Cabecera con el título "Divider"; `Type` black · inverse → `Inverted` false · true; las dos variantes miden 148 px. Las instancias del Footer se estiran con su contenedor y no cambian. Decisiones 2 y 3 cerradas.

## Fase 2 · Documentación en Figma (22-11-2026)

- Web revisada: no hay ningún `<hr>`; las líneas del acordeón (`border-bottom`) y la del copyright del footer (`border-top`, `border-inverse`) son bordes de CSS, es decir, decoración. Coincide con la decisión 1 (C aprobado).
- Sección *Documentation* (`627:816`) en la página Divider, a la derecha de su sección, duplicada de la del Link y adaptada:
  - Cabecera de documentación con el título "Divider" y su resumen.
  - **Anatomía:** diagrama con una parte (la línea), tabla de partes de una fila y dos grupos de ejemplos: Divider (fondo claro) y Divider inverted (fondo oscuro).
  - **Cuándo usarlo**, **Recomendaciones de uso** y **Accesibilidad** con texto propio.
  - **Do y don't:** separar contenido y copyright (hazlo) frente a una línea tras cada elemento de una lista corta (evítalo); Inverted sobre fondo oscuro (hazlo) frente a la versión normal, que no se ve (evítalo).
  - **Separador o decoración** (aspectos diferenciales): tabla con qué hace, código, teclado, lector de pantalla y usos reales de la web, y la regla rápida "si quitas la línea y se entiende igual, es decoración".
  - **Properties:** `Inverted` (false · true, por defecto false).
  - **Responsive:** igual en los tres tamaños, con aviso.
- Cabecera del componente: fecha 22-11-2026 y descripción oculta.
- Sin textos sin estilo (salvo el del icono de estado de la plantilla `.Headers`).
- Pendiente común: la categoría de la cabecera de documentación dice "CONTENT" (heredada).
- Estado: en revisión por Diana.

## Revisión de Diana (23-11-2026)

Aprobada. Diana quitó la sección Responsive: el Divider no cambia entre breakpoints y no aporta nada. Regla para los siguientes: en componentes que no cambian entre breakpoints, sin sección Responsive. Doc Figma: ✅.

## Storybook (26-11-2026)

Clase `dime-divider` sobre `<hr>`, sin JS (`components/divider/`). Stories: Default, Inverted y Decorativo (no se anuncia). axe sin violaciones.
