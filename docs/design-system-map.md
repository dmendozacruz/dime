# Mapa del design system DIME

## Propósito y alcance

DIME unifica el diseño de dianamendozacruz.com y sirve de lenguaje común entre
la librería de Figma, la documentación de Storybook y el código de la web. Este
mapa dice qué existe, en qué estado está cada pieza y dónde vive.

## Capas

```text
Librería DIME en Figma (variables, estilos, componentes)
    ↓ se lee con el MCP de Figma y se guarda como
Volcado de Figma (tokens/source/figma.json)
    ↓ npm run tokens genera
Tokens (tokens.css · typography.css · tokens.json)
    ↓ los consumen
Componentes HTML + CSS + JS ──→ la web (mi-portfolio)
    ↓ se documentan y demuestran en
Storybook (Foundation, Componentes)
```

## Dónde vive cada cosa

| Pieza | Dónde |
| --- | --- |
| Diseño de tokens y componentes | Figma, archivo `HUTWjaHvtErDoUZoUnDTLd` |
| Documentación para diseño | Figma, sección *Documentation* de cada componente |
| Tokens generados | `tokens/` de este repositorio |
| Documentación para desarrollo | Storybook (`docs/` y `components/` de este repositorio) |
| Código en producción | Repositorio `mi-portfolio` (privado) |
| Decisiones globales | [`decisions.md`](./decisions.md) |
| Notas de cada cambio | [`work/`](./work/) |
| Historial publicado | [`CHANGELOG.md`](../CHANGELOG.md) |
| Pruebas de las skills | [`evals/`](../evals/README.md) |
| Cómo se publica Storybook | [`deployment.md`](./deployment.md) (sin publicar todavía) |

## Fuentes de verdad

El orden y el alcance de cada fuente están en [`AGENTS.md`](../AGENTS.md). Resumen:

| Para qué | Fuente |
| --- | --- |
| Lo visual: tokens, componentes, variantes y estados | **Figma**, la librería DIME. Es el punto de partida; cuando todo esté volcado, Storybook pasa a ser la fuente de verdad (D-018). |
| Los criterios de accesibilidad | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (W3C), nivel AA. |
| Roles, estados y propiedades ARIA | [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/) y [ARIA in HTML](https://www.w3.org/TR/html-aria/) (W3C): qué ARIA se permite en cada elemento. |
| El comportamiento accesible de cada patrón (teclado, foco, anuncios) | [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) (W3C) y React Aria, como referencias; no son dependencias. |
| El formato de los tokens | [Design Tokens](https://www.designtokens.org/) (W3C Community Group), para `tokens.json`. |
| Cómo se comporta cada elemento nativo | [MDN Web Docs](https://developer.mozilla.org) y el [estándar HTML](https://html.spec.whatwg.org), como referencias de apoyo. |
| Dónde y cómo se usa cada componente | La web en producción, solo como referencia de uso. |
| Que algo funciona | Storybook lo demuestra con pruebas y axe; no sustituye las pruebas manuales con lector de pantalla y en dispositivo real. |

Las referencias visuales (Nueva York, Carbon…) no son fuentes de verdad: están en la skill `accessible-component-doc`, en `references/referencias.md`.

Si las fuentes discrepan, se registra la contradicción y se pide una decisión a
Diana. No se corrige por inferencia ni se ocultan estados que la accesibilidad
exige.

## Foundation

| Foundation | Figma | Storybook | Web |
| --- | --- | --- | --- |
| Colores | ✅ | ✅ | ⏳ nombres antiguos (`--color-content-1`…) |
| Tipografía | ✅ | ✅ | ⏳ nombres antiguos; interlineados por confirmar |
| Espaciado | ✅ | ✅ | ⏳ escala antigua (`--spacing-1…13`) |
| Elevación | ✅ | ✅ | ⏳ sombras sueltas |
| Desenfoque (`--blur-header`) | ✅ 24-11-2026 | ✅ | ✅ mismo valor (`blur(4.15px)`, blanco al 85 %), aún sin token |
| Radios | ✅ 100 px, sin token (D-013) | ✅ | Pill 100 px; el Badge usa 16 px (pasa a 100 en la fase 4) |
| Layout y grid | ✅ 4 estilos de grid (mobile 4 col, tablet 8, desktop 12, header desktop 12) | ✅ 26-11-2026 | ✅ (header: gutter 20 en la web, 24 en Figma) |
| Iconos | ✅ 22 tipos × 3 tamaños (mismo dibujo escalado) | ✅ 26-11-2026; SVG de 20 px en `public/icons/<tipo>.svg` | ✅ |
| Logos | ✅ | ✅ 26-11-2026 | ✅ |

## Componentes

Leyenda: ✅ hecho · 🟡 en curso · ⏳ pendiente · — no aplica.
"Doc Figma" es la sección *Documentation* del componente en la librería.

| Componente | Figma | Doc Figma | Storybook |
| --- | --- | --- | --- |
| Accordion | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Alert | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Back to top | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Badge (antes Label) | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Button | ✅ | ✅ 19-11-2026 | ✅ 26-11-2026 |
| Icon button | ✅ | ✅ 19-11-2026 | ✅ 26-11-2026 (en la página del Button) |
| Button back | ✅ | ✅ 19-11-2026 | ✅ 26-11-2026 |
| Card | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Divider | ✅ | ✅ 23-11-2026 | ✅ 26-11-2026 |
| Nav Footer | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Nav Header | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Input | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Link | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Process list | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Blockquote | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Skip nav | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Tabs | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
| Tooltip | ✅ | ✅ 26-11-2026 | ✅ 26-11-2026 |
