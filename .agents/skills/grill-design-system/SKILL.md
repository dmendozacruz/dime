---
name: grill-design-system
description: Descubrir antes de ejecutar en DIME — investiga, pregunta a Diana las decisiones de una en una (máximo 5, con una respuesta recomendada), resume acuerdos, dudas e hipótesis, y documenta antes de implementar. Úsala al empezar o retomar cualquier cambio de foundation, token, componente, patrón, integración con Figma o flujo de trabajo cuando haya al menos dos ambigüedades reales de propósito, alcance, fuente de verdad o vocabulario (p. ej. el menú "On this page", los radios que faltan en Figma, las pestañas de Storybook), aunque Diana no lo pida. No la uses en lo trivial o de un solo paso.
---

# Dar forma a un cambio de DIME

Muchas tareas fallan no por mala ejecución, sino porque se empieza a construir
antes de entender el propósito, el alcance y qué es cierto. Esta skill impone
**investigar → preguntar → resumir → documentar → planificar**, y deja un rastro
de decisiones que cualquier agente (o Diana dentro de unas semanas) pueda leer.

## Cuándo usarla

Úsala si puedes nombrar **al menos dos ambigüedades reales** que cambiarían lo
que se construye. Si no puedes, no la necesitas: actúa directamente (un texto,
un ajuste obvio, una respuesta puntual).

Si el componente ya está diseñado en Figma y no hay decisiones abiertas, usa
directamente `accessible-component-doc`.

## 1. Orientarse e investigar

Leer `AGENTS.md`, `CONTEXT.md`, `docs/design-system-map.md`, `docs/decisions.md`
y el código relacionado (en este repositorio y, si toca la web, en
`../mi-portfolio`). No cargar documentación que no afecte a la tarea.

Buscar los hechos en el repositorio, en la librería DIME (MCP oficial de Figma,
solo lectura), en la web y en documentación oficial actual. **Nunca preguntar un
hecho que se pueda comprobar.** Pedir permiso a Diana antes de investigar en la
web si no es evidente que lo quiere.

Etiquetar la certeza de cada dato:

- `Verificado`: comprobado en una fuente fiable (indicar cuál).
- `No verificado`: hipótesis o dato sin confirmar.

Marcar como *(interpretación nuestra)* lo que sea decisión o andamiaje propio y
no un hecho de la fuente. **No inventar** nombres, valores ni comportamientos
para rellenar: es el fallo más caro.

## 2. Preguntar (grilling)

**Máximo 5 preguntas, de una en una.** Es un techo, no una cuota: si a la
tercera ya está lo esencial, se para ahí.

Orden de impacto (lo que más condiciona va primero):
**propósito → alcance → fuente de verdad → vocabulario → relaciones**.

En cada turno:

1. explicar en lenguaje llano qué no está claro y qué consecuencia tiene cada
   opción (visual, accesibilidad, esfuerzo);
2. recomendar una opción y justificarla, sin presentar un menú neutro de
   opciones;
3. esperar la respuesta de Diana antes de la siguiente.

Las decisiones de diseño (layout, aspecto, variantes nuevas) son de Diana y se
resuelven en Figma; no se resuelven en código por inferencia. Para la
documentación en Storybook, la referencia de composición ya está decidida: el
design system de Nueva York (ver *Aspecto visual* en
`docs/storybook-guidelines.md`); no se vuelve a preguntar.

## 3. Resumir y confirmar

Antes de escribir ningún archivo, devolver a Diana el entendimiento compartido en
tres bloques:

- **✅ Acuerdos**: lo decidido, en frases claras.
- **🔶 Dudas**: lo que queda abierto (no bloquea, pero tiene que constar).
- **🧪 Hipótesis**: lo pendiente de comprobar, con su etiqueta de certeza.

Esperar su confirmación explícita. Ese "sí" es la prueba de que se construye
sobre lo mismo.

## 4. Documentar

Tras la confirmación, con fechas absolutas (nunca "hoy" o "ayer"):

- Términos nuevos o aclarados → `CONTEXT.md` (solo glosario).
- Capas, inventario y estado → `docs/design-system-map.md`.
- Evidencia de Figma → `docs/figma-evidence.md`.
- Si habrá implementación → una única nota en `docs/work/<cambio>.md` con
  objetivo, evidencia, decisiones, dudas, plan y validación.
- Decisión global, difícil de revertir o fruto de un trade-off real → nueva
  entrada `D-0xx` en `docs/decisions.md`. Se añade, no se reescribe: si una
  decisión cambia, se añade otra que la sustituye.

## 5. Planificar y ejecutar

Antes de editar código, presentar:

- fuentes consultadas y sus límites;
- decisiones pendientes;
- pasos en orden (respetando el proceso por capas de `AGENTS.md`:
  Figma → Storybook → web);
- cómo se comprobará el resultado.

Esperar confirmación. Si el trabajo es un componente, pasar a
`accessible-component-doc` con las decisiones ya cerradas. Si no, implementar
el cambio mínimo en pasos verificables, comprobarlo en el navegador real y
actualizar la nota de trabajo. Parar tras cada página o componente para que Diana
lo revise.

## Detenerse

Detenerse y pedir decisión si las fuentes discrepan, falta acceso a Figma, la
evidencia no permite afirmar el alcance o un resultado automático necesita
juicio humano. No inventar para poder continuar.

## Cierre

Resumir qué quedó documentado y dónde, qué hipótesis `No verificado` y dudas
siguen abiertas, y cuál es el siguiente paso.
