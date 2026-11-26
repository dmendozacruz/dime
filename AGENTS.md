# Reglas del agente · DIME Design System

DIME es el design system de [dianamendozacruz.com](https://dianamendozacruz.com).
Este repositorio lo documenta en Storybook. La web vive en otro repositorio
(`../mi-portfolio`, privado) y consume los mismos tokens.

Idioma de trabajo y de la documentación: **español**. El código (clases,
variables, nombres de archivo) va en inglés, igual que en la web.

```bash
npm run tokens            # regenera tokens/*.css y tokens/*.json desde tokens/source/figma.json
npm run storybook         # tokens + Storybook en http://localhost:6006
npm run build-storybook   # tokens + Storybook estático en storybook-static/
```

## Antes de empezar (obligatorio)

Cada vez que empieces en un **chat nuevo** o seas un **agente distinto** (Claude
Code, Cursor, una sesión en la nube…), antes de tocar nada:

1. Lee **entero** [`docs/decisions.md`](docs/decisions.md). Ahí están los
   acuerdos con Diana (por ejemplo, D-017: componentes como web components en
   light DOM y clases con prefijo `dime-`). No se trabaja de memoria ni con lo
   que diga un resumen: si algo no está en las decisiones, se pregunta.
2. Lee [`CONTEXT.md`](CONTEXT.md) y [`docs/design-system-map.md`](docs/design-system-map.md).
3. Si trabajas en una rama o un worktree, comprueba que tiene las decisiones al
   día: una decisión puede estar solo en la carpeta principal sin commitear.

## Fuentes de verdad

1. **Figma (librería DIME)** gobierna lo visual: tokens, componentes, variantes y
   estados. Archivo `HUTWjaHvtErDoUZoUnDTLd`. Ver
   [`docs/figma-evidence.md`](docs/figma-evidence.md).
   Es el punto de partida: cuando todo esté volcado en Storybook, Storybook pasa a
   ser la fuente de verdad y lo nuevo (de Figma o de código) se vuelca en él (D-018).
2. **[`CONTEXT.md`](CONTEXT.md)** gobierna el vocabulario.
3. **[`docs/design-system-map.md`](docs/design-system-map.md)** registra las capas,
   el inventario de componentes y su estado en Figma, Storybook y la web.
4. **[`docs/decisions.md`](docs/decisions.md)** registra las decisiones globales del
   sistema y su porqué.
5. **`docs/work/*.md`** registra fuentes, matriz, plan y validación de cada cambio.
6. **WAI-ARIA y WCAG 2.2 AA** gobiernan los requisitos normativos. El **APG** y
   **React Aria** son referencias de comportamiento accesible (teclado, foco,
   anuncios), no dependencias: DIME se implementa en HTML, CSS y JavaScript sin
   frameworks, como **web components en light DOM** (sin Shadow DOM, D-017). Ver [`docs/component-accessibility.md`](docs/component-accessibility.md).
7. **La web en producción** es solo referencia de **uso**: dónde y cómo se usa cada
   componente. Si la web y Figma discrepan, manda Figma.
8. **Este repositorio** gobierna nombres, estructura y comandos.
9. **Storybook** demuestra estados, interacción y comprobaciones automáticas.
   Su aspecto sigue al **design system de Nueva York** (designsystem.ny.gov) con
   los tokens de DIME: ver el apartado *Aspecto visual* de
   [`docs/storybook-guidelines.md`](docs/storybook-guidelines.md), que recoge
   también los errores ya cometidos.

No inventes variantes, tokens, estados ni comportamientos que no estén en Figma.
Si las fuentes no resuelven una decisión, detente y pregunta a Diana.

## Proceso

### Fase 1 (ahora): alinear la web con la librería

1. **Foundation** en Storybook: colores, tipografía, espaciado, elevación, iconos
   y logos.
2. **Tokens de la web**: la web adopta `tokens/tokens.css` con los nombres de
   Figma, **sin cambiar el diseño ni el tamaño del texto**. Pueden variar
   ligeramente espaciados y colores, de forma que no se note. Todo lo que pueda
   notarse se consulta antes. Se trabaja en una rama del portfolio.
3. **Componentes, de uno en uno**: documentación en Figma → página en Storybook →
   mismo código en la web. Lo que ya funciona bien en la web no se rehace: se
   actualizan colores y estilos y se usa el componente de la librería.
4. Tras dos componentes completos, el proceso se convierte en skill.

### Fase 2: componentes o animaciones nuevos

Nacen a la vez en Figma y en Storybook, nunca uno por delante del otro.

### Mejoras propuestas por el agente

1. Se explican a Diana y no se aplican sin su visto bueno.
2. Si se aprueban: se actualiza el componente en Figma (o se anota en Storybook si
   solo afecta al código) y se registra en [`CHANGELOG.md`](CHANGELOG.md).

## Flujo de cada tarea

1. Lee `CONTEXT.md`, `docs/design-system-map.md` y el código relacionado.
2. Investiga los hechos en el repositorio, en Figma (MCP oficial) y en fuentes
   oficiales; pregunta a Diana solo por decisiones.
3. Separa evidencia, interpretación, decisión e hipótesis.
4. Explica el plan y **espera confirmación** antes de editar.
5. Implementa el cambio mínimo y registra en `docs/work/` por qué existe cada
   estado.
6. Verifica en el navegador real (no solo leyendo el código) y registra la
   evidencia. Accesibilidad contra el árbol de accesibilidad renderizado.
7. Resume fuentes, límites, pruebas automáticas y comprobaciones manuales
   pendientes (VoiceOver real en desktop, TalkBack real en móvil, dispositivo real).
8. Para tras cada página o componente para que Diana lo revise.

## Reglas que no se negocian

- **Nunca valores sueltos** de color, tipografía ni espaciado: siempre tokens.
- **Antes de dar por buena una página de Storybook**, repasar *Aspecto visual* en
  `docs/storybook-guidelines.md` y medirlo en el navegador (texto a 16 px,
  muestras alineadas, sin desbordes).
- **Nunca editar a mano** `tokens/tokens.css`, `tokens/typography.css`,
  `tokens/tokens.json` ni `tokens/tokens.meta.json`: se cambia Figma y se
  regeneran.
- **Imágenes e iconos los exporta Diana** desde Figma o, si ella se lo pide al
  agente, el agente (por ejemplo con `download_assets`). Nunca se redibujan,
  se generan ni se editan archivos de imagen por iniciativa propia.
- **Se define un estándar al principio y se contrasta siempre con él.** Las guías
  de estilo (`docs/storybook-guidelines.md` y las de los componentes) se aprueban
  una vez; cada página o componente se verifica contra ellas antes de pasarlo a
  revisión. La versión final la da Diana.
- **Figma: no romper sus ediciones.** Releer posiciones reales antes de mover
  nada; borrar solo por ID lo que haya creado el agente; nunca vaciar
  contenedores.
- **Nunca secretos** (contraseñas, hashes, claves, tokens de acceso) en ningún
  archivo versionado.
- **La fuente ABC Monument Grotesk no se sube al repositorio** (licencia).
- No hacer commit, push, merge ni borrar ramas o worktrees sin que Diana lo pida.
  El push lo hace ella.

## Skills

Viven en `.agents/skills/` (Claude Code las ve a través de `.claude/skills`, que
apunta ahí). Adaptadas del curso WeAAAre «Sistemas de diseño con IA».

| Situación | Skill |
| --- | --- |
| Algo nuevo o con decisiones abiertas (al menos dos ambigüedades reales) | `grill-design-system` |
| Diana ha cambiado variables en Figma o hay que revisar la foundation | `sync-figma-foundations` |
| Documentar un componente (Figma, Storybook) o construirlo en la web, o revisar su documentación | `accessible-component-doc` *(en prueba)*; se puede pedir una sola fase |
| Un componente con decisiones de diseño abiertas | Primero `grill-design-system`; con las decisiones cerradas, `accessible-component-doc` |
| Algo trivial o de un solo paso | Ninguna: se hace directamente |

Cada skill empieza donde termina la anterior: `grill-design-system` cierra
decisiones, `accessible-component-doc` documenta y construye sobre lo decidido
(Figma → Storybook → web, parando en cada fase) y
`sync-figma-foundations` solo toca tokens. Lee únicamente la skill necesaria.

Cada skill tiene sus casos de prueba en [`evals/`](evals/README.md). Al cambiar una
skill, pasar sus evals antes de darla por buena.
