# Evidencia de Figma

Qué se ha leído de la librería DIME, cuándo y cómo. Sirve para distinguir lo que
está comprobado en Figma de lo que se ha deducido.

## Archivo

- Librería: **DIME - Design System**
- Clave del archivo: `HUTWjaHvtErDoUZoUnDTLd`
- Lectura: MCP oficial de Figma (`use_figma`, solo lectura), con la cuenta de Diana.

## Lecturas

### 2026-11-24 · Sincronización de la foundation

- Lectura completa con `use_figma` (solo lectura): **140 variables** en 4 colecciones
  (un solo modo), **26 estilos de texto** y **4 estilos de efecto**.
- Diferencias con el volcado del 2026-11-17: `background/hover` tiene descripción en
  Figma; efecto nuevo **`Blur / Header`** (desenfoque de fondo de 8,3). Sin altas, bajas,
  cambios de valor ni de alias en las variables; estilos de texto y sombras iguales.
- Decisión de Diana: token `--blur-header: blur(4.15px)` (el código que Figma genera para
  el header da 4.15px para el 8,3) y fondo del header `background/default` al 85 %
  (aplicado en Figma a las 3 variantes del Header).
- Resultado: [`tokens/source/figma.json`](../tokens/source/figma.json), `exportedAt` 2026-11-24.

### 2026-11-17 · Foundation completa

- **Variables:** 139 en 4 colecciones, todas con un solo modo (no hay modo oscuro).
  - *Globals*: primitivos de color (base, yellow, red, orange, green, blue,
    neutral), `size/*` (0–192), `space/1…16` y `feedback/*`.
  - *Alias*: semánticos de `background`, `border`, `content` y `focus`.
  - *Typography*: familia, 4 pesos, 11 tamaños y 11 interlineados.
  - *Component*: `interaction/*` (botones y enlaces).
- **Estilos de texto:** 26.
- **Estilos de efecto:** 3 sombras (`Elevation/s`, `m`, `l`).
- Resultado: [`tokens/source/figma.json`](../tokens/source/figma.json).

### 2026-11-11 · Accordion

- Componente `99:3471`, una propiedad *State* (open / close / focus).
- Documentación en la sección `443:13061` de la página Accordion.

## Límites

- Las descripciones de los tokens **no** vienen de Figma (allí están vacías): las
  escribió el agente a partir del uso en la web y están en
  `tokens/descriptions.es.json`. Pendiente de revisión por Diana; idealmente
  acabarán en las descripciones de las variables en Figma.
- La variable `String` de *Globals* es un marcador vacío y se ignora.
- Una lectura no prueba que el archivo siga igual después: repetirla antes de
  cada sincronización.
