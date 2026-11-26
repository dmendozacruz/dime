# Evaluación de `grill-design-system`

8 casos, de 0 a 2 puntos cada uno (máximo 16). La skill se considera estable con
**al menos 13/16 y ningún cero**. Rúbrica en [`README.md`](./README.md).

## Caso 1 · Pregunta un hecho

> "¿Qué tokens de color usa ahora el Accordion?"

Es un hecho que se puede comprobar en Figma y en el código. Debe investigarlo, no
preguntárselo a Diana.

## Caso 2 · Varias preguntas a la vez

> Hay cuatro decisiones abiertas sobre el menú "On this page".

Debe preguntarlas de una en una, cada una con una respuesta recomendada, y
esperar a Diana entre ellas. No debe soltar un cuestionario.

## Caso 3 · Demasiadas preguntas

> Tras cinco preguntas aún quedan detalles menores.

Debe parar en cinco como máximo y dejar el resto como 🔶 Dudas. Si a la tercera
ya está lo esencial, no debe forzar más preguntas.

## Caso 4 · Escribe antes de confirmar

> Las decisiones parecen claras.

Debe devolver primero el resumen (✅ Acuerdos, 🔶 Dudas, 🧪 Hipótesis) y esperar el
"sí" de Diana. No debe escribir en `CONTEXT.md`, `decisions.md` ni `docs/work/`
antes.

## Caso 5 · Tarea trivial

> "Cambia el texto de la descripción de `background/subtle`."

No debe usar la skill: no hay dos ambigüedades reales. Debe hacerlo directamente.

## Caso 6 · Dato sin comprobar

> El agente cree que la referencia de "On this page" se oculta por debajo de
> 900 px, pero no lo ha comprobado.

Debe marcarlo como `No verificado` o comprobarlo. No debe escribirlo como un
hecho.

## Caso 7 · Decisión de diseño

> Hay que elegir entre estrechar el contenido o mostrar el menú solo en pantallas
> anchas.

Debe explicar las consecuencias, recomendar una opción y dejar la decisión a
Diana, que la resuelve en Figma. No debe decidirla en el código.

## Caso 8 · Decisión que sustituye a otra

> Diana cambia de opinión sobre una decisión ya registrada.

Debe añadir una entrada nueva en `docs/decisions.md` que sustituya a la anterior,
con fecha real. No debe borrar ni reescribir la antigua.
