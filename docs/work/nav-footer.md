# Nav Footer (antes Footer)

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Footer ` (`490:2626`, el nombre lleva un espacio al final),
  sección `Documentacion` (`490:2937`). Lectura 21-11-2026 vía MCP oficial
  (`use_figma` en lectura).
  - `Footer` (`490:2692`, 6 variantes): `Type` (home · page) ×
    `Breakpoint` (desktop · tablet · mobile).

    | Variante | Medida |
    | --- | --- |
    | home · desktop | 1440 × 674 |
    | home · tablet | 769 × 648 |
    | home · mobile | 390 × 648 |
    | page · desktop | 1440 × 221 |
    | page · tablet | **760** × 313 |
    | page · mobile | 390 × 385 |

  - Contenido (home desktop): título "Let’s talk!" (`Display / bold`), frase
    "If you think we can build something great together, feel free to reach
    out." (oculta en page mobile), dos `Link` large inverted ("LinkedIn",
    "Github", icono `link right`), `Button` small inverted "Get in touch" con
    flecha, `Divider / Type=inverse` y "© 2026 Diana Mendoza · Made with Claude
    Code". En **page mobile** el texto es "© 2026 Diana Mendoza · Made with
    Claude" (falta "Code").
  - Fondo `background/brand`, textos `content/inverse`. Variables todas
    locales (0 remotas).
  - **Valores sin variable**: padding 120 (hay `space/13`), 146 arriba (no hay
    token), gap 84 (no hay token), 7 y 10.
  - 6 textos con **estilo mixto** (el copyright combina estilos).
  - Cabecera `.Headers` (`490:2889`): título "Footer", descripción de
    plantilla, fecha 2025-2-15. La sección se llama "Documentacion" pero
    contiene el componente, no la documentación.
- Web: el repositorio no es accesible desde esta sesión. Verificado en notas
  anteriores: `link.md` — enlace del footer `.footer__action-link` "LinkedIn",
  `aria-label` "LinkedIn (opens in a new tab)"; `button.md` — CTA del footer
  "Let's talk" es un `<a href="mailto:">` (`.footer__cta-btn`). No verificado:
  el enlace de GitHub, el título, el copyright ni el landmark.
- CONTEXT.md define **patrón** como composición de componentes y pone "el
  footer compacto" como ejemplo.
- WAI-ARIA: `<footer>` de la página = landmark `contentinfo`. WCAG 2.2: 1.3.1,
  1.4.3, 1.4.10, 2.4.4, 2.4.6, 2.5.3, 3.2.4 (identificación coherente entre
  páginas). React Aria: no aplica.

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Cierre de página con contacto | Footer de la web | `<footer>` (contentinfo) | — | confirmado |
| ¿Componente o patrón? | Componente con variantes | — | — | — | falta decisión (1) |
| Anatomía | Título + frase + Links + Button + Divider + copyright | LinkedIn y CTA verificados | — | — | confirmado |
| Encabezado | "Let’s talk!" en `Display / bold` | web no verificada | 1.3.1, 2.4.6: ¿es un `<h2>`? | — | falta decisión (3) |
| CTA | Button "Get in touch" | "Let's talk", `<a href="mailto:">` (`button.md`) | Enlace con aspecto de botón | — | discrepancia (2) |
| Enlaces externos | LinkedIn, Github | LinkedIn "(opens in a new tab)" | Aviso de pestaña nueva en el nombre (decisión 4 del Link) | — | confirmado para LinkedIn; Github no verificado |
| Estados interactivos | Los de Link y Button | — | — | — | confirmado (heredados) |
| Copyright | Estilo mixto; truncado en page mobile | web no verificada | — | — | discrepancia (4) |
| Coherencia entre páginas | home y page | — | 3.2.4: mismos enlaces y nombres en todas | — | confirmado como requisito |
| Tokens | Locales; espaciados 120, 146, 84, 10, 7 sin variable | — | Nunca valores sueltos | — | discrepancia (5) |
| Contraste y forced colors | Blanco sobre negro 17,4:1 | — | 1.4.3 | — | confirmado |
| Objetivo táctil | Link large 48; Button small 40 / large 48 | — | 2.5.8 | — | confirmado |
| Zoom y reflow | 3 breakpoints | — | 1.4.10 | — | confirmado |
| Responsive | desktop · tablet · mobile | — | — | — | discrepancia menor: page tablet 760 frente a 769 |

## Variables y nombres incoherentes

- Página `Footer ` con espacio final; sección "Documentacion" (sin tilde) que
  no es la documentación.
- `Breakpoint` desktop · tablet · mobile aquí y L-XL · M · S en el Header.
- Texto de copyright distinto en page mobile.
- Gap 84 y padding 146 sin token equivalente en la escala (`space/12` = 96,
  `space/13` = 120, `space/14` = 128).
- Estilos de texto mixtos en un mismo texto.

## Decisiones y alternativas

1. **Componente o patrón.** CONTEXT.md pone el footer como ejemplo de patrón.
   *Recomendación:* tratarlo como **patrón** (composición de Link, Button y
   Divider): en Figma sigue como está, en Storybook va en un apartado
   "Patrones", y su documentación es más corta (qué componentes usa y cómo).
   Hay que cambiar o confirmar el vocabulario.
2. **Texto del CTA.** Figma dice "Get in touch"; la web, "Let's talk" (según
   `button.md`), y "Let’s talk!" es el título. *Recomendación:* que el CTA
   diga lo que hace (abre el correo): mantener el texto de la web o el de
   Figma, pero uno solo. Decide Diana; manda Figma (D-001) si no dice otra
   cosa.
3. **Título.** *Recomendación:* `<h2>` "Let’s talk!" (el footer es una
   sección con título).
4. **Copyright.** *Recomendación:* el mismo texto en todas las variantes
   ("Made with Claude Code") y un solo estilo de texto (o dos textos
   separados si se quieren dos estilos).
5. **Valores sueltos.** *Recomendación:* 120 → `space/13`; 146 y 84 sin
   equivalente: elegir `space/14` (128) o `space/15` (160) y `space/12` (96) —
   se nota, decide Diana —; 10 y 7 → `space/2` o `space/3`.
6. **Página tablet.** *Recomendación:* 769 de ancho como el resto de
   variantes tablet.

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Renombrar la sección del componente (no "Documentacion") y crear la de
  documentación.

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
Página sin el espacio final; padding de 120 con `space/13` (home desktop); copyright **"© 2026 Diana Mendoza · Made with Claude"** en las 6 variantes (decisión de Diana: "Claude Code" no cabe en móvil). El estilo mixto se mantiene: "Diana Mendoza" va en negrita a propósito. **Decisión de Diana: el Footer es un patrón** (decisión 1 cerrada).

## Decisiones de Diana (22-11-2026, punto B)

- **CTA:** "Get in touch" en Figma y en la web (`.footer__cta-btn`, `mailto:`); "Let’s talk!" es el título. La nota de `button.md` que decía "Let's talk" era un error. Decisión 2 cerrada.
- **Espaciados con token** (aprobado): padding superior de home desktop 146 → `space/15` (160) sin que nada se mueva (el contenido va alineado abajo con alto fijo 630 y usa el hueco libre); Content center de page desktop 7 → `space/2` y gap 10 → `space/2`. El gap de 84 ya no existía (Diana editó el Footer).

## Decisión de Diana (24-11-2026)

- El Footer se documenta **como patrón**, igual que el Header: qué componentes lo forman (Link, Button, Divider) y cómo se combinan.

## Web revisada (24-11-2026)

- Home: `<footer class="site-footer" id="contacto" aria-label="Contacto">` con `<h2>` "Let's talk!", frase, `<ul>` con LinkedIn ("LinkedIn (opens in a new tab)") y GitHub (`hidden`, oculto de momento), "Get in touch" (`<a href="mailto:">`) y copyright "Made with Claude Code".
- Casos de estudio: `site-footer--compact` con `aria-label="Contact"` y título en `<p>`.
- **Para la fase 4:** el nombre de la zona debería ser el mismo en todas las páginas y en inglés ("Contact"); el título compacto podría ser `<h2>` como en la home; el copyright pasa a "Made with Claude" como en Figma.

## Fase 2 · Documentación en Figma como patrón (24-11-2026)

Estructura de patrón aprobada por Diana: sin Do y don't ni tabla de Properties (están en cada componente). Sección *Documentation* (`673:107`) a la derecha de la del componente: **Composición** (footer móvil con 5 marcadores y tabla de componente y configuración: título, Link large inverted, Button inverted, Divider inverted, copyright); Variantes home y page a tamaño real en tablet y mobile (desktop, en la sección del componente: escalar las instancias rompía los estilos de texto); Cuándo usarlo; Recomendaciones; **Comportamiento** (home frente a casos de estudio); Accesibilidad; Responsive. Cabecera del componente: fecha 24-11-2026, descripción oculta. Estado: en revisión por Diana.

## Decisiones de Diana (24-11-2026)

- **Nombre de la zona:** "Contact" en todas las páginas (hoy la home dice "Contacto").
- **Título del footer compacto:** encabezado `<h2>`, como en la home (hoy es un `<p>`).
- Se aplican en la web en la fase 4, junto con el resto de la migración. La doc de Figma (tabla Comportamiento) ya documenta cómo debe quedar.

## Storybook (25-11-2026)

- Patrón en `patterns/footer/` (HTML y CSS, sin JavaScript), páginas Uso, Código y Accesibilidad en «Patrones/Footer». Usa Link large inverted, Button inverted y Divider inverted.
- Medidas comprobadas en el navegador contra Figma en las 6 variantes: completo 630 · 630 · 648 px y compacto 221 · 313 · 385 px; título, frase, enlaces y botón en las posiciones de Figma.
- Responde al ancho de su contenedor (container queries), no al de la ventana.
- Nombres de las variantes en Storybook: «Completo» (Figma `Type=home`) y «Compacto» (`page`), para no nombrar páginas.
- **Abierto:** el botón de contacto es un `<a href="mailto:">` con un correo de ejemplo; Github se muestra (Figma lo tiene; en la web está oculto de momento).

## Nombre y consistencia con Storybook (26-11-2026)

A petición de Diana, el Footer deja de ser «patrón» y se llama **Nav Footer**, como en Storybook (donde está dentro de Componentes, igual que el UNav Footer del design system de Nueva York). En Figma: página `↳ Nav Footer` (sin el asterisco), set `Nav Footer`, título de la cabecera de documentación y los textos que decían «patrón».
- La sección del componente en Figma se llama `Nav Footer` (antes `Documentacion`, que no era la documentación), y el título de su cabecera también.
