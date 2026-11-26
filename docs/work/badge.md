# Badge (antes Label)

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Label` (`18:16`), sección `Label` (`133:17053`). Lectura
  21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Label` (`133:17054`): **componente suelto, no set**. 70 × 28 px.
    Una property: `Text` (texto, "Label"). Sin variantes ni estados.
  - Descripción del componente en Figma: "Enabled assistive chip" (texto de
    Material Design, no de DIME).
  - Anatomía: texto `Label / Medium / medium`, borde de 1 px
    `border/medium`, texto `content/default`, padding `space/3` (12) ×
    `space/1` (4). **Radio 18 px** (con 28 px de alto se ve como píldora).
  - Variables todas locales (0 remotas). Sin fondo.
  - Se usa dentro de `card` (`102:7204`) y de `layout cards`.
  - Cabecera `.Headers` (`133:17030`): título correcto, descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: **no verificada en la fase 1** (revisada después, ver las secciones fechadas). Según el mapa: etiquetas B2B / B2C / SaaS del hero.
  Según `foundation-sync.md` y el mapa, en la web la etiqueta usa radio 2 px
  (por revisar contra Figma).
- APG: no hay patrón (no es interactivo). WCAG 2.2: 1.3.1, 1.4.3, 1.4.4,
  1.4.11 (solo si el borde transmite información), 1.4.12.
  React Aria: no aplica (su `TagGroup` es para etiquetas interactivas o
  eliminables; sirve de contraste: si un día fueran filtros, sería otro
  componente).

## Contraste

`content/default` sobre blanco 17,4:1. Borde `border/medium` 3,36:1 (no es
obligatorio: el texto se entiende sin el borde).

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Etiqueta de texto (categoría) | Etiquetas del hero (no verificado) | Texto estático | `TagGroup` solo si es interactivo | confirmado |
| Anatomía | Texto + borde píldora | web no verificada | — | — | confirmado |
| Nombre accesible | Es el propio texto | — | Si son varias, lista `<ul>` para que se anuncie cuántas hay (1.3.1) | — | falta decisión (2) |
| Hover, Pressed, Focus, Disabled, Selected | No existen | — | No es interactivo: no recibe foco | — | no aplica |
| Tokens | Locales; radio 18 | Radio 2 px (según mapa) | D-013: único radio 100 px | — | discrepancia (3) |
| Contraste y forced colors | 17,4:1 | — | 1.4.3 | — | confirmado. En forced colors el borde se mantiene |
| Objetivo táctil | 28 px de alto | — | No aplica si no es interactivo | — | no aplica |
| Zoom y texto largo | Hug | — | 1.4.4, 1.4.12: no cortar el texto; que salte de línea el grupo, no la etiqueta | — | confirmado |
| Mayúsculas | "Label" | B2B / B2C / SaaS | Escribir el texto normal y, si se quiere en mayúsculas, con CSS | — | confirmado |
| Responsive | Una medida | — | — | — | confirmado |

## Variables y nombres incoherentes

- **Nombre `Label`** choca con otras dos cosas del archivo: el subcomponente
  `.Label` (`106:11535`, la etiqueta de un campo del Input) y el componente de
  anotaciones de documentación (`102:3633`, instancias `.Label` en casi todas
  las páginas). Y en HTML `<label>` es la etiqueta de un campo de formulario.
- Descripción "Enabled assistive chip" heredada de Material.
- Radio 18 px en vez de 100 (D-013).
- No es un *set*: si algún día tiene variantes, habrá que convertirlo.

## Decisiones y alternativas

1. **Nombre.** *Recomendación:* `Badge` (o `Tag`) en Figma, Storybook y
   código, para no confundirlo con `<label>` ni con `.Label`. La página
   puede pasar a "Badge". Renombrar no rompe instancias.
2. **Varias etiquetas juntas.** *Recomendación:* en código, una lista
   (`<ul>` con cada etiqueta en `<li>`), sin `role` extra. Documentarlo en
   Storybook; en Figma solo "Úsalo en grupo, en fila, con `space/2`" si Diana
   lo confirma.
3. **Radio.** *Recomendación:* 100 px como dice D-013 (se ve igual a 28 px de
   alto) y que la web pase de 2 px a píldora en la fase 4. Es un cambio que
   se nota en la web: confirmar.
4. **Descripción del componente.** *Recomendación:* sustituir "Enabled
   assistive chip" por una descripción en español ("Etiqueta de texto para
   categorías; no es interactiva").

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Sección "Badge o Button" (no es interactivo; si se puede pulsar, es un Button
  o un Link).

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Componente, página y cabecera renombrados a **Badge**; descripción en español; radio 100. Decisiones 1, 3 (en Figma; la web, en la fase 4) y 4 cerradas.

## Web revisada (23-11-2026, `portfolio` rama `main`)

- Hero: `<ul class="tag-list" aria-label="Areas of focus">` con `<li class="tag"><span aria-label="Business to Business">B2B</span></li>` (B2B, B2C, SaaS). Tarjetas: `<span class="tag"><span aria-label="…">…</span></span>`.
- CSS `.tag`: 14/18 medium, mayúsculas por CSS, padding 4 × 12, borde 1 px `--color-border-2`, **radio 16 px** (no 2 px como decía el mapa).
- **Para la fase 4:** un `aria-label` en un `<span>` sin rol no se anuncia de forma fiable (en WAI-ARIA 1.2 el nombre está prohibido en elementos genéricos). Mantener la intención (que se oiga el nombre completo) con texto oculto visualmente: `<span aria-hidden="true">B2B</span><span class="visually-hidden">Business to Business</span>`, o `<abbr>` con el texto completo. Verificar con VoiceOver.
- Radio: la web pasa de 16 a 100 en la fase 4 (no se nota a 26 px de alto).

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`639:88`) en la página Badge, copiada de la del Divider (sin Responsive). Anatomía (texto y borde; un Badge y un grupo de tres), Cuándo usarlo, Recomendaciones, Do y don't (pocas palabras frente a una frase; clasifica frente a "Ver proyecto" que parece pulsable), **Badge o Button** con usos reales de la web y regla rápida, Accesibilidad (lista, sigla con nombre completo) y Properties (`Text`). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

## Storybook (26-11-2026)

Clase `dime-badge` sobre el elemento nativo, sin JS (`components/badge/`). Stories: Default, Sigla (con su significado completo), Grupo de badges (lista) y Wrap. Es texto estático: no recibe foco ni se anuncia como control. axe sin violaciones.
