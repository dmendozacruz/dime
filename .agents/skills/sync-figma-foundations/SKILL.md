---
name: sync-figma-foundations
description: Lee las variables, estilos de texto y sombras de la librería DIME en Figma, las compara con el volcado versionado (tokens/source/figma.json) y, tras la aprobación de Diana, regenera los tokens y propaga los cambios a Storybook y a la web. Úsala cuando haya que importar, refrescar, auditar o verificar la foundation (colores, tipografía, espaciado, elevación), o cuando Diana diga que ha cambiado variables en Figma.
---

# Sincronizar la foundation de DIME con Figma

## Entrada

La librería DIME (`HUTWjaHvtErDoUZoUnDTLd`). Si el MCP oficial de Figma no puede
leerla, comprobar solo la coherencia local (`npm run tokens` sin cambios) y
decir claramente que el estado de Figma **no** está verificado.

## 1. Orientarse

Leer `AGENTS.md`, `CONTEXT.md`, `docs/figma-evidence.md`,
`docs/work/foundation-sync.md`, `docs/decisions.md` (D-004 a D-008),
`tokens/source/figma.json` y `scripts/build-tokens.mjs`.

## 2. Leer Figma (inventario completo)

Con `use_figma` y la Plugin API, **solo lectura**, leer de todas las colecciones
locales: nombre, colección, tipo, valor resuelto, alias y descripción de cada
variable; y todos los estilos de texto y de efecto.

- No usar `get_variable_defs` para sincronizar: solo devuelve las variables que
  usa un nodo, así que no prueba altas ni bajas. Sirve, como mucho, para una
  observación parcial que se marca como tal.
- Los estilos de texto y de sombra son valores compuestos: van a
  `textStyles` y `effects` del volcado, no se convierten en variables sueltas.
- Conservar el canal alfa de los colores (`#ffffff@0`).

## 3. Comparar sin sobrescribir

Preparar un volcado candidato con el mismo formato y orden que
`tokens/source/figma.json` y compararlo con el actual. Clasificar:

- altas, bajas y renombres;
- cambios de valor o de tipo;
- cambios de alias;
- modos nuevos (hoy no hay: un modo nuevo, p. ej. oscuro, es una decisión);
- estilos de texto o sombras nuevos o cambiados.

Comprobar además qué tokens que cambian o desaparecen **se usan** en Storybook
(`docs/`, `components/`) y en la web (`../mi-portfolio/public/css`). Mostrar el diff y
su impacto a Diana **antes** de escribir nada.

## 4. Preguntar decisiones

Detenerse y preguntar, de una en una y con recomendación, ante:

- un nombre que no encaja con la regla de nombres (D-005) o que colisiona;
- un alias roto;
- una baja de un token que se usa;
- un modo nuevo;
- un valor sin representación acordada (p. ej. radios, que hoy no existen);
- un cambio de valor que **se notaría** en la web (sobre todo tamaños de texto e
  interlineados: la web no debe cambiar de diseño sin que Diana lo apruebe).

## 5. Sincronizar

Tras la aprobación:

1. sustituir `tokens/source/figma.json` (actualizando `exportedAt`);
2. si hay tokens semánticos nuevos, añadir su texto de uso en
   `tokens/descriptions.es.json` (el script avisa de los que faltan);
3. `npm run tokens`;
4. revisar el diff de `tokens/` y abrir Storybook (Foundations › Color, Tipografía,
   Espacio y layout, Primitivos) para comprobar que se ve bien, sin errores en
   consola y cumpliendo *Aspecto visual* de `docs/storybook-guidelines.md`
   (reiniciar Storybook si se han movido o renombrado archivos);
5. actualizar `docs/figma-evidence.md`, `docs/design-system-map.md`,
   `docs/work/foundation-sync.md` y `CHANGELOG.md`.

### Propagar a la web (solo si Diana lo pide)

En una **rama** de `../mi-portfolio`: copiar `tokens.css`, migrar los nombres
antiguos **por valor en px, nunca por número** (la web es Astro: el CSS está
en `public/css/`, sin `.min.css` que regenerar) y verificar en el navegador a 360, 390, 768, 1024, 1280,
1440 y 1920 px que nada se mueve más de lo acordado. No hacer push.

## 6. Informar

Separar: acceso a Figma, cambios observados, decisiones de Diana, comandos
ejecutados, verificación en el navegador y límites. No afirmar que Figma está
sincronizado si solo se ha regenerado en local. No hacer commit, push ni merge.
