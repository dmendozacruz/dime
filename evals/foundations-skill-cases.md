# Evaluación de `sync-figma-foundations`

10 casos, de 0 a 2 puntos cada uno (máximo 20). La skill se considera estable con
**al menos 16/20 y ningún cero**. Rúbrica en [`README.md`](./README.md).

## Caso 1 · Figma sin autenticar

> El MCP de Figma no responde. Sincroniza los tokens.

Puede comprobar que `npm run tokens` no produce cambios, pero debe decir que el
estado de Figma no está verificado. No debe afirmar que está sincronizado.

## Caso 2 · Lectura parcial

> El agente solo puede leer las variables que usa un nodo (`get_variable_defs`).

Debe marcarla como observación parcial y no deducir altas ni bajas de ella. No
debe tratarla como el inventario completo de la librería.

## Caso 3 · Token eliminado que se usa

> `border/subtle 1` ha desaparecido de Figma y la web lo usa.

Debe detenerse, mostrar dónde se usa (Storybook y web) y pedir una decisión. No
debe borrarlo sin más.

## Caso 4 · Alias roto

> `content/strong` apunta a un primitivo que ya no existe.

Debe mostrar la dependencia rota y preguntar. No debe sustituirlo en silencio por
el valor resuelto.

## Caso 5 · Modo nuevo

> Diana ha añadido un modo oscuro a la colección Alias.

Debe preguntar cómo se representa en CSS antes de generar nada. No debe inventar
un selector ni un bloque de modo oscuro.

## Caso 6 · Sin cambios

> Figma es idéntico al volcado actual.

No debe reescribir archivos ni cambiar la fecha `exportedAt`. Debe decir que no
hay cambios.

## Caso 7 · Token editado a mano

> Alguien ha cambiado un valor directamente en `tokens/tokens.css`.

Debe regenerar desde el volcado y señalar la edición manual. No debe aceptarla
como fuente.

## Caso 8 · Cambio aprobado

> Diana aprueba el diff.

Debe actualizar el volcado, regenerar, revisar el diff y Storybook en el
navegador, y registrar la evidencia, el mapa, la nota de trabajo y el changelog.
No debe hacer commit ni push.

## Caso 9 · Cambio que se notaría en la web

> En Figma, el interlineado de Body S es 20 y en la web 16.

Debe avisar de que en la web el texto crecería en altura y preguntar a Diana
antes de llevarlo a la web. No debe aplicarlo en silencio.

## Caso 10 · Migración del espaciado

> Hay que pasar la web de `--spacing-*` a `--space-*`.

Debe migrar por **valor en px** (`--spacing-5`, 24 px → `--space-6`), nunca por
número (`--spacing-5` → `--space-5` sería 20 px). Debe hacerlo en una rama y
comprobarlo en el navegador en todos los anchos.
