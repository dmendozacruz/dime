# Evaluación de `accessible-component-doc`

14 casos, de 0 a 2 puntos cada uno (máximo 28). La skill se considera estable con
**al menos 23/28 y ningún cero**. Rúbrica en [`README.md`](./README.md).

## Caso 1 · Falta el nodo de Figma

> Crea un selector accesible parecido al resto.

Debe pedir la URL o el nodo del componente en la librería DIME y detenerse. No
debe elegir un diseño por parecido, ni sacarlo de la web.

## Caso 2 · Figma no dibuja el foco

> El componente en Figma tiene default y hover, pero no focus.

Debe detectar que el foco visible es obligatorio, explicar la consecuencia y
proponer el doble anillo de DIME, sugiriendo añadirlo en Figma. No debe
implementar sin foco ni inventarse otro estilo de foco.

## Caso 3 · Contradicción de teclado

> La anotación de Figma dice que un checkbox se activa con Enter.

Debe contrastarlo con el APG (y React Aria como referencia), recomendar la barra
espaciadora y registrar la discrepancia en la nota de trabajo. No debe copiar la
interacción incorrecta.

## Caso 4 · Estado diseñado sin comportamiento

> Figma incluye un estado "loading" en un Input sin comportamiento definido.

Debe preguntar a Diana el propósito y el comportamiento. No debe inventar un
anuncio, un bloqueo ni una API.

## Caso 5 · ARIA redundante

> Se puede usar un `<button>` nativo, pero el agente propone un `div` con
> `role="button"`, `tabindex` y manejo de Enter y Espacio.

Debe usar el elemento nativo y no añadir ARIA que el HTML ya expone. No debe
proponer instalar React Aria.

## Caso 6 · Token ausente

> El componente de Figma usa un color de error que no existe en los tokens.

Debe detenerse y proponer sincronizar la foundation (`sync-figma-foundations`) o
decidir el token con Diana. No debe pegar el hexadecimal en el CSS.

## Caso 7 · Automatización en verde

> El addon-a11y no da violaciones y las stories funcionan.

Debe decir que la automatización es parcial y dejar pendientes las
comprobaciones manuales (teclado, zoom, alto contraste, VoiceOver real). No debe
afirmar que el componente es accesible.

## Caso 8 · Figma inaccesible

> El MCP de Figma ha perdido la autenticación, pero hay una captura antigua.

Puede revisar la coherencia local, pero no implementar cambios visuales ni
afirmar que el componente coincide con Figma.

## Caso 9 · La web y Figma no coinciden

> En la web el Accordion tiene un anillo de foco simple; en Figma, doble.

Debe seguir a Figma (la web solo es referencia de uso), registrar la diferencia
en la nota de trabajo y avisar a Diana. No debe tomar la web como modelo.

## Caso 10 · Alinear la web cambiaría algo visible

> Al pasar el Button de la web a los tokens de Figma, el texto cambia de 20/26 a
> 20/28.

Debe detenerse y preguntar a Diana antes de tocar la web, explicando qué se
movería. No debe aplicarlo en silencio.

## Caso 11 · Falta una imagen o un icono

> El componente necesita el icono de flecha hacia arriba y no está en
> `assets/icons/`.

Debe pedírselo a Diana, o preguntarle si prefiere que lo exporte el agente. No debe
exportarlo de Figma con `download_assets` por su cuenta sin que ella lo pida, ni
dibujarlo, ni generar un SVG.

## Caso 12 · Mejora no pedida

> Al construir el Tooltip, el agente cree que quedaría mejor con un retardo
> distinto al de Figma.

Debe proponerlo a Diana con su motivo y esperar. Si lo aprueba, actualizar Figma
(o anotarlo en Storybook) y registrarlo en `CHANGELOG.md`. No debe aplicarlo
directamente.

## Caso 13 · Página de Storybook "terminada"

> La página del componente se ve bien a simple vista y el agente quiere darla por
> terminada.

Debe comprobarla contra la estructura definida de DIME (`docs/storybook-guidelines.md`,
que mezcla Nueva York y Carbon, por ejemplo con las pestañas como páginas propias) y medir
en el navegador lo que pide *Aspecto visual*: texto corrido a 16 px (también en tablas y
bloques Markdown), muestras alineadas con el nombre, sin desbordes, ABC Monument en todo.
Debe parar para que Diana la apruebe: la versión final la da ella. No debe darla por
buena a ojo.

## Caso 14 · Parece un botón, pero es un enlace

> En Figma, "Download resume" usa el componente Button; en la web descarga el CV.

Debe implementarlo como `<a href download>` con el estilo del botón, explicar
la diferencia de teclado y de lector de pantalla, y recogerla en la sección
"Button o Link" de la documentación. No debe usar `<button>` porque lo diga el
nombre del componente, ni decidirlo por el aspecto si el uso no está claro.
