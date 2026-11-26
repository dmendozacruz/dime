# Documentación en Figma (fase 2)

Para quien **diseña**. Simple y en español. Nada de código ni de
especificaciones de desarrollo: eso va a Storybook.

Usar los componentes de documentación, estilos de texto y variables del archivo
(`.Headers / Type=2 Section`, cuerpo alineado a `size/160`), sin colores ni
espaciados sueltos.

## Cómo empezar

Duplicar la sección *Documentation* de un componente ya documentado (p. ej. el
Accordion, `443:13061`) en la página del nuevo, a la derecha de su sección, y
adaptarla: así se heredan los componentes de documentación, estilos y
variables. Sustituir todas las instancias y textos del original.

## Estructura

1. **Cabecera del componente**: fecha de última actualización en formato
   **DD-MM-AAAA**, la del día del cambio. La descripción va oculta
   (`Show Description` = false): el resumen está en la de documentación.
   El enlace de la cabecera ya dice **"Open documentation"**; falta que lleve
   a la página del componente en
   Storybook (GitHub). Se cambia en todos los componentes al final, cuando
   Storybook esté publicado; mientras, no se toca.
   **Toda página de componente documentada lleva su sección *Documentation*
   con la cabecera de documentación** (`.Headers / Type=Header doc`), aunque
   el componente sea pequeño.
2. **Cabecera de documentación**: solo un resumen del componente. La categoría va oculta (`Show Category` = false): hay pocos
   componentes para agruparlos por categoría (decisión de Diana, 24-11-2026).
3. **Anatomía** (obligatoria): instancia con partes numeradas + tabla (Nº,
   Parte, Qué es, Estilo y token) + un ejemplo de **cada variante y estado**.
   Si hay slot, un ejemplo abierto con el slot activo.
   Los ejemplos van **por grupos**, como Nueva York: cada grupo con título
   (`Body / Large / bold`), una línea con lo que muestra (`Body / Medium /
   regular`) y una muestra con los estados en fila, cada uno con su etiqueta
   (`Label / Medium / medium`). La versión normal a la izquierda y la
   *inverted* a la derecha, sobre `background/brand` con etiquetas en
   `content/inverse`. Tamaños y anchos en un grupo propio. Los marcos de cada
   ejemplo ajustados al contenido (hug), para que no recorten el foco. La
   etiqueta de estado va **centrada** bajo su ejemplo (marco con alineación
   centrada y texto centrado), y los ejemplos separados con `space/9` (48 px)
   para que los pequeños (icon button, Button back) no queden pegados.
4. **Cuándo usarlo**: "Úsalo cuando" / "No lo uses cuando".
5. **Recomendaciones de uso**.
6. **Do y don't**: con instancias reales del componente y contenido de la web.
   La etiqueta lleva icono y palabra: `check` en `feedback/success/content`
   con "Hazlo" y `close` en `feedback/error/content` con "Evítalo" (24 px).
   El color nunca va solo.
7. **Aspectos diferenciales** si hay gemelo ("Button o Link", "Accordion o
   Tabs"): desde la accesibilidad, con una regla rápida y ejemplos reales de la
   web. Si el componente lo pide, una **guía de usabilidad**.
8. **Accesibilidad**: breve, lo mínimo que tiene que cumplir.
9. **Properties**: tabla (Propiedad, Tipo, Valores, Por defecto, Uso) con
   **todas** las properties del set y sus nombres exactos de Figma. Revisarla
   cada vez que Diana cambie una property.
10. **Responsive** (solo si el componente cambia entre breakpoints; si no,
    sin esta sección, como el Divider o el Badge): desktop (> 1024), tablet (769–1024) y mobile (≤ 768). La
    web no es nativa; si un componente lo fuese, Diana lo indicará.

## Avisos y anotaciones

Reglas rápidas, notas de diseño, aclaraciones ("el botón no cambia de tamaño
entre breakpoints", "nombre accesible del Button back"): una instancia del
componente **Alert** (`443:9196`) a ancho completo, `Type=info` para
información y `warning`, `success` o `error` si el aviso lo pide. Título corto
en `Title` y el resto en `Content`. No crear un componente de nota aparte.

## Accesibilidad de la documentación

La propia documentación tiene que ser accesible: texto con contraste AA (4.5:1,
3:1 los iconos y bordes que transmiten información), tamaños de los estilos del
archivo (nada por debajo de 14 px salvo etiquetas `Label`), y nunca el color
como única pista: los iconos van con su palabra.

## Slots

Si el componente necesita contenido libre:

- Slot nativo de Figma ligado a una property `Slot` y, si es opcional, a una
  booleana `Show slot` (por defecto `false`).
- Contenido por defecto: una instancia del subcomponente **`.Slot`**
  (`534:14`, página Subcomponents), para que el hueco se vea al activarlo.
- Con el slot desactivado, el componente mide lo mismo que antes; al activarlo,
  el contenedor crece (alto hug). Comprobar las dos cosas con una instancia de
  prueba y borrarla.
- Reflejarlo en Anatomía (ejemplo con el slot abierto) y en Properties.

## Errores ya cometidos

- Documentar en inglés: todo en español.
- Fecha en la cabecera de documentación o en formato ISO: va en la del
  componente, DD-MM-AAAA.
- Olvidar la Anatomía o mostrar solo un estado.
- Añadir una property y no pasarla a la tabla de Properties.
- Crear un slot vacío y oculto: no se ve en el componente (por eso `.Slot`).
- Escribir nombres accesibles de memoria: copiarlos del HTML de la web
  (`aria-label`), p. ej. "Back to The Work section", no "Back".
- Ligar variables sueltas a un texto (tamaño, interlineado, peso): rompe el
  **estilo de texto** de Diana. Los textos llevan siempre un estilo del archivo
  (`Interaction / Large / regular`, `Body / Large / regular`…), que ya contiene las
  variables. Para cambiar el peso o el tamaño, cambiar de estilo
  (`setTextStyleIdAsync`); para listas y textos nuevos, aplicar el estilo
  también. Al terminar, comprobar que ningún texto queda sin estilo. Los
  espacios no tienen estilos: ahí sí van variables (`space/*`).
- Dejar el texto de plantilla en las cabeceras de sección ("Frame description
  text that’s just a little longer"): cada `.Headers` lleva su descripción
  real, puesta con la propiedad `Description`, no editando el texto a mano.
- Borrar y volver a crear una propiedad de un componente compartido (p. ej.
  `Description` de `.Headers`): todas las instancias pierden su valor y vuelven
  a la plantilla en todo el archivo. Se renombra; si hay que crearla de nuevo,
  se rellenan todas las instancias justo después y se comprueba.
- Dar por terminada la sección sin mirar su alto: una *Section* de Figma no
  crece sola y recorta lo añadido. Ajustarla al contenido.
