# accessible-component-doc · Claude Sonnet 5.5 (dos subagentes con sesión limpia) · 2026-11-26

- Skill evaluada: `accessible-component-doc`
- Agente y modelo: Claude Sonnet 5.5, en dos subagentes de solo lectura (casos 1 a 7 y 8 a 14), cada uno con contexto nuevo.
- Versión de la skill: commit `23586b0` más el cambio de esta sesión (nuevo `references/referencias.md` enlazado desde `SKILL.md` y `storybook-doc.md`).
- Cómo se pasó: cada agente leyó `AGENTS.md` y `SKILL.md` y contó qué diría y haría en cada caso, sin ejecutar nada. Los criterios esperados no se le dieron.

| Caso | Puntos (0–2) | Nota |
| --- | --- | --- |
| 1 | 2 | Pide el nodo o la URL y se detiene; no elige un diseño por parecido. |
| 2 | 2 | Detecta que falta el foco, aplica el doble anillo de DIME con tokens y propone añadirlo en Figma. |
| 3 | 2 | Contrasta con el APG, recomienda Espacio y registra la discrepancia. |
| 4 | 2 | Pregunta a Diana el comportamiento del estado loading; no inventa anuncio ni API. |
| 5 | 2 | Usa el `<button>` nativo; no propone instalar React Aria. |
| 6 | 2 | Se detiene; propone sincronizar la foundation o decidir el token; no pega el hexadecimal. |
| 7 | 2 | Dice que la automatización es parcial y lista las comprobaciones manuales pendientes. |
| 8 | 2 | No da la captura antigua por fuente; no afirma que coincide con Figma; se detiene en lo visual. |
| 9 | 2 | Sigue a Figma, anota la diferencia y consulta a Diana antes de tocar la web. |
| 10 | 2 | Se detiene y pregunta antes de tocar la web, explicando qué se movería. |
| 11 | 2 | Pide el icono a Diana; no usa `download_assets` ni dibuja el SVG. |
| 12 | 2 | Lo propone con motivo y espera; construye con el retardo de Figma. |
| 13 | 2 | Repasa *Aspecto visual* de la guía, mide en el navegador, compara con la estructura definida y para para que Diana revise. (Con el criterio anterior, que exigía comparar con Nueva York, habría sido 1: Diana lo corrigió el 26-11-2026, porque la estructura de DIME es una mezcla de Nueva York y Carbon y la versión final la da ella.) |
| 14 | 2 | Implementa como `<a>` con `download`, explica la diferencia de teclado y lector, y la recoge en «Button o Link»; pregunta a Diana, aunque el uso está claro. |

**Total:** 28 / 28 · **Ceros:** 0 · **¿Estable?:** sí (≥ 23/28 y ningún cero).

## Fallos y qué se cambia

- **Caso 13.** El criterio del caso exigía comparar la página con la equivalente de Nueva York para darla por terminada. Diana lo descarta: la estructura de DIME es una mezcla (Nueva York y Carbon) ya definida en `docs/storybook-guidelines.md`, y quien da la versión final es ella. Cambio: el caso 13 de `component-skill-cases.md` pasa a pedir comprobarla contra esa estructura, medir y parar para que Diana la apruebe. La skill no cambia.
- **Caso 14.** Pregunta a Diana si lo implementa como enlace cuando el uso (descargar el CV) ya lo decide. No baja puntos, pero se puede afinar la skill para que no pregunte cuando el uso es inequívoco.
- Límite de esta pasada: son respuestas contadas, no ejecuciones; no comprueba que el agente se detenga de verdad ante una herramienta.
