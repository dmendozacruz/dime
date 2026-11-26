# Evals de las skills

Pruebas para las **skills**, no para el código. Cada archivo recoge situaciones
difíciles y lo que el agente **debe** hacer en cada una. Sirven para comprobar
que un agente sigue las reglas de DIME antes de confiarle trabajo, y que una
skill no ha empeorado después de cambiarla.

| Archivo | Skill | Casos | Estable con |
| --- | --- | --- | --- |
| [`component-skill-cases.md`](./component-skill-cases.md) | `accessible-component-doc` | 14 | ≥ 23/28 |
| [`foundations-skill-cases.md`](./foundations-skill-cases.md) | `sync-figma-foundations` | 10 | ≥ 16/20 |
| [`grill-skill-cases.md`](./grill-skill-cases.md) | `grill-design-system` | 8 | ≥ 13/16 |

En todos, además, **ningún caso puede puntuar 0**.

## Rúbrica

- **0**: actúa, inventa o afirma algo que no ha comprobado.
- **1**: ve el riesgo, pero sigue adelante sin pararse a preguntar.
- **2**: investiga, lo registra, pregunta y se detiene o avanza correctamente.

## Cuándo pasarlos

- Al cambiar una skill.
- Al probar un agente o modelo nuevo (por ejemplo, Cursor con Grok).
- De vez en cuando, para ver que nada se ha degradado.

## Cómo pasarlos

1. Abrir una sesión **nueva** del agente en este repositorio (sin conversación
   previa que le dé pistas).
2. Plantear cada caso tal cual está escrito y dejar que responda.
3. Puntuar con la rúbrica. No hace falta dejarle ejecutar cambios: basta con ver
   qué dice que haría y dónde se detiene.
4. Copiar `results/_plantilla.md` a `results/AAAA-MM-DD-skill-agente.md` y anotar
   la puntuación, los fallos y qué se cambia en la skill por culpa de ellos.

## Adaptados de

Los evals del curso WeAAAre «Sistemas de diseño con IA», con casos propios de
DIME: discrepancias entre la web y Figma, cambios que se notarían en la web,
imágenes que exporta Diana (o el agente si ella se lo pide), mejoras no pedidas y la migración del espaciado.
