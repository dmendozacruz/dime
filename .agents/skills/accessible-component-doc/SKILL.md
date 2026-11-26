---
name: accessible-component-doc
description: Documenta y construye un componente accesible de DIME a partir de su nodo en la librería de Figma, por fases y con una parada de Diana entre cada una — investigar, documentación reducida en Figma (solo diseño), documentación completa en Storybook (diseño y desarrollo, con código) y el mismo código en la web. Úsala para documentar un componente, revisar o actualizar su documentación (properties nuevas, slots, variantes), crearlo o alinear el de la web con la librería (Accordion, Button, Link, Tabs…). Se puede lanzar una sola fase ("revisa la doc del Accordion en Figma"). Reconcilia Figma con WAI-ARIA/APG, WCAG 2.2, React Aria como referencia y los tokens de DIME, sin inventar diseño ni comportamiento.
---

# Documentar y construir un componente accesible de DIME

> Validada con el Button el 19-11-2026 (revisión de Diana). Lo que falle con
> otros componentes se corrige aquí.

Una sola investigación alimenta dos documentaciones de distinta profundidad:

| | Figma | Storybook |
| --- | --- | --- |
| Para quién | Diseño | Diseño **y** desarrollo |
| Extensión | Reducida, simple | Completa: lo de Figma ampliado + código |
| Detalle | [`references/figma-doc.md`](references/figma-doc.md) | [`references/storybook-doc.md`](references/storybook-doc.md) |

Referencias visuales y de comportamiento (Nueva York, Carbon, Bella, NN/g, MDN…), como apoyo y no como fuente de verdad: [`references/referencias.md`](references/referencias.md).

## Entrada

El nodo o URL del componente en la librería DIME (`HUTWjaHvtErDoUZoUnDTLd`) y
qué fase se pide. Si falta el nodo, pedirlo y parar: no sustituirlo por una
captura, por memoria ni por un componente parecido. Si no se dice la fase,
empezar por la 1 y avanzar parando en cada una.

## Fase 1 · Investigar (común)

Leer `AGENTS.md`, `CONTEXT.md`, `docs/design-system-map.md`,
`docs/component-accessibility.md` y, si existe, `docs/work/<componente>.md`.
Crear o actualizar esa nota de trabajo con lo que se encuentre.

1. **Figma (MCP oficial, solo lectura)**: component sets de la página (si hay
   varios relacionados, p. ej. Button, icon button y Button back, se
   documentan juntos salvo que Diana diga otra cosa), properties con su nombre
   y tipo exactos, variantes, estados, slots, variables y estilos. Estado de la
   documentación existente: secciones, huecos, texto de plantilla, fecha.
2. **La web** (`../mi-portfolio`): dónde se usa, con qué etiqueta HTML, sus
   **nombres accesibles reales** (`aria-label`, texto), su CSS y JS, y qué
   funciona bien. Es referencia de **uso**; el diseño manda Figma
   (D-001).
3. **WAI-ARIA y APG**, **React Aria** (referencia, no dependencia: D-009) y
   **WCAG 2.2 AA** (solo los criterios que aplican).
4. **Variables de librerías antiguas**: listar las variables ligadas al
   componente que vienen de otra librería (`remote`: `spacing/*`, `DM/*`,
   `!-nys/*`…). Cada una se cambia por la variable local con el **mismo
   valor**, no por el mismo número (`spacing/5` vale 24 y `space/5` vale 20).
   Si no hay equivalente local, preguntar a Diana. Al terminar, comprobar que
   no queda ninguna remota y que ninguna variante cambia de tamaño. Las capas
   ocultas que sobran las borra Diana; el agente solo las señala.
5. Completar la matriz de [`references/source-matrix.md`](references/source-matrix.md)
   en la nota de trabajo (`confirmado`, `discrepancia`, `falta decisión`,
   `no aplica`).

No preguntar hechos que se puedan comprobar. HTML nativo antes que ARIA.

### Aspectos diferenciales (obligatorio)

Identificar en qué se diferencia el componente de su gemelo, **sobre todo
cuando el aspecto no coincide con el comportamiento en código**:

- El elemento HTML lo decide lo que hace, no cómo se ve: con forma de botón,
  si navega, descarga o abre un `mailto:` es `<a>`; si ejecuta una acción en
  la página es `<button>`. Cambia el teclado (Enter frente a Enter y Espacio),
  lo que anuncia el lector de pantalla y en qué lista lo encuentra.
- Gemelos típicos: Button / Link, Accordion / Tabs, Tooltip / Toggletip,
  Tabs / navegación, Alert / mensaje de estado.
- Anotar en la matriz qué etiqueta lleva hoy cada uso en la web.
- Si no está claro, **preguntar a Diana**. No decidirlo por el aspecto.

Va siempre documentado: en Figma en una sección propia ("Button o Link") y en
Storybook en Uso y en Accesibilidad.

### Cerrar decisiones

Preguntar a Diana **de una en una y con recomendación** (ver
`grill-design-system`) cuando:

- un nombre de property confunde (p. ej. `Type` que era el ancho → `Width`);
- hay un estado con implicaciones de accesibilidad (p. ej. `Disabled`);
- Figma no tiene un estado que el patrón exige (el foco nunca se omite: doble
  anillo de DIME, y se propone añadirlo en Figma);
- Figma contradice semántica, teclado, foco o validación accesibles;
- falta un token y habría que inventar un valor;
- el nombre accesible, el error o el contenido no están definidos;
- el componente necesita algo que no existe (un slot, un subcomponente);
- alinear la web cambiaría algo que se nota;
- el agente quiere proponer una mejora (D-012: visto bueno, Figma y
  `CHANGELOG.md`).

Cualquier cambio en el **componente** de Figma necesita su visto bueno antes.

## Fase 2 · Documentación en Figma (solo diseño)

Seguir [`references/figma-doc.md`](references/figma-doc.md): estructura, fecha
DD-MM-AAAA, Anatomía, aspectos diferenciales, Properties, slots. Reducida: nada
de código ni especificaciones de desarrollo.

**Parar** para que Diana la revise.

## Fase 3 · Storybook (diseño y desarrollo)

Antes de escribir código (web component en light DOM, D-017), presentar el
HTML/API propuesto, las stories y el plan
de pruebas, y **esperar aprobación**. Después seguir
[`references/storybook-doc.md`](references/storybook-doc.md): componente en
`components/<componente>/` y sus tres páginas (Uso, Código, Accesibilidad).

**Parar** para que Diana la revise.

## Fase 4 · Web

Cuando la migración de la web a Astro esté unida a `main`, en una **rama** de
`../mi-portfolio`: llevar el mismo código (la etiqueta y su script). La web es
Astro: páginas en `src/pages/`, componentes compartidos en `src/components/`,
CSS en `public/css/` (editar el `.css`; ya no hay `.min.css` ni `clean-css-cli`,
el build minifica solo; prefijos `-webkit-` siempre ANTES de la propiedad
estándar) y scripts en `public/js/` con `is:inline`. Servidor: `npm run dev`.
Ver el `CLAUDE.md` de la web. Comprobar
las páginas donde se usa a 360, 390, 768, 1024, 1280, 1440 y 1920 px. Sin
commit ni push salvo que Diana lo pida.

## Validar e informar (en cada fase)

- Figma: releer lo escrito (textos, filas, fecha) y una captura de la sección.
  Instancias de prueba fuera de la documentación y borradas por ID; no tocar
  nodos que no haya creado el agente.
- Storybook y web: navegador real (teclado, foco con doble anillo, estados,
  consola), página medida contra *Aspecto visual* de
  `docs/storybook-guidelines.md`, árbol de accesibilidad renderizado (Chromium
  y WebKit), addon-a11y sin violaciones (barrera, no certificación).
- Pendiente manual, siempre: VoiceOver real (desktop, macOS) y TalkBack real (móvil, Android) y dispositivo real (Diana).

Registrar decisiones y nodos en `docs/work/<componente>.md`, los cambios en
`CHANGELOG.md` y el estado en `docs/design-system-map.md`. Informar por separado
de fuentes, decisiones de Diana, comprobaciones hechas y pendientes, y riesgos.
No afirmar accesibilidad completa porque axe esté en verde, ni que coincide con
Figma si el MCP no pudo leer el nodo.
