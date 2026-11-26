# Documentación en Storybook (fase 3)

Para **diseño y desarrollo**. Recoge todo lo de Figma, ampliado, más el código.
Composición y aspecto: `docs/storybook-guidelines.md` (apartado *Aspecto
visual*) y las referencias de [`referencias.md`](referencias.md); mirar cómo resuelve
Nueva York la página del componente equivalente antes de maquetarla.

## Componente

En `components/<componente>/`: HTML, CSS y JS sin frameworks, solo tokens de
DIME. Empaquetado según D-017:

- Con comportamiento (teclado, abrir y cerrar, estados): **web component en
  light DOM**, `<dime-<componente>>`, que envuelve el HTML nativo y le añade el
  comportamiento. **Nunca Shadow DOM.** El HTML funciona y se lee aunque el
  script no cargue; el script solo mejora.
- El script del componente se registra con `customElements.define` y se importa
  en `.storybook/preview.js` para que las stories lo muestren.
- Sin comportamiento (Button, Link, Label, Divider, Card…): **clase CSS sobre
  el elemento nativo** (`<a class="dime-link">`, `<button class="dime-button">`),
  sin envoltorio ni etiqueta propia.

- Elemento nativo según lo que hace (aspectos diferenciales de la fase 1).
- Botones solo con icono: nombre accesible humano, nunca el nombre del icono.
- Foco con el doble anillo de DIME.
- Stories: estado principal, cada estado aplicable, contenido límite e
  interacción crítica (con `play`, consultando por rol y nombre).
- `parameters.a11y.test = "error"`.

## Páginas: tres pestañas (D-014)

Cada pestaña es una página propia con barra de navegación arriba.

- **Uso**: lo de Figma ampliado — anatomía, cuándo usarlo, recomendaciones,
  do y don't, aspectos diferenciales.
- **Código**: componente en vivo, variantes con su código, propiedades,
  tokens usados, JavaScript e historial de cambios.
- **Accesibilidad**: teclado, roles y estados, patrón APG / React Aria,
  aspectos diferenciales en código (`<a>` frente a `<button>`), resultado
  automático y comprobaciones manuales pendientes.

## Comprobar

- Texto a 16 px (también en tablas y Markdown), muestras alineadas con su
  nombre, sin scroll horizontal, ABC Monument en todo.
- Reiniciar Storybook si se han movido o renombrado archivos.
