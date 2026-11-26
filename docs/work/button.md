# Button

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha y aprobada por Diana.
- Fase 3 (Storybook): hecha, en revisión.
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: la etiqueta de categoría de la cabecera de documentación dice «CONTENT» (heredada del Accordion).
- Manual pendiente: VoiceOver y dispositivo real, incluido el Button back al tocar (sin hover).

## Fuentes

- Figma, página Buttons (`18:14`), sección `133:17057`. Lectura 2026-11-19.
  - `Button` (`48:2481`, 30 variantes): `Width` (default · large),
    `Size` (small 40 px · large 48 px), `State` (Default · Hover · Active ·
    Disabled · Focus), `Inverted` (True · False), `Text`, `Show icon`,
    `Show text`.
  - `Button back` (`48:2534`, 8 variantes): `State` (Default · Hover · Focus ·
    Active), `Inverted`. Al pasar el ratón se expande a "← Button".
  - `icon button` (`48:2554`, 16 variantes): `State` (Default · Hover · Active ·
    Focus), `Inverted`, `Size` (medium 44 px · large 52 px). Flecha ↓.
  - Cabecera con texto de plantilla y fecha antigua (2025-2-15).
- Web (`../mi-portfolio`):

  | Aspecto | Qué hace | En código |
  | --- | --- | --- |
  | Resume / Download resume | Descarga el CV | `<a download>` (`.btn`) |
  | Get in touch (footer) | Abre el correo | `<a href="mailto:">` (`.footer__cta-btn`) |
  | Back (←) | Vuelve a otra página | `<a>` (`.dm-button-icon`) |
  | Flecha de scroll (↓) | Baja a una sección | `<a href="#…">` (`.dm-button-scroll`) |
  | Acceder (contraseña) | Envía el formulario | `<button type="submit">` |

- APG: Button y Link. WCAG 2.2: 1.4.3 (excepción de inactivos), 2.1.1,
  2.4.4, 2.4.7, 2.5.3, 2.5.8, 4.1.2.

## Decisiones de Diana (2026-11-19)

- Se documentan los 3 sets juntos; icon button y Button back como tipos.
- `Type` renombrado a `Width` en Figma; `show text` → `Show text`.
- Sección "Button o Link" desde la accesibilidad.
- **Disabled** se mantiene: hoy no se usa, pero se aplicará cuando el destino o
  la acción no estén disponibles (p. ej. el CV no se puede descargar). En
  `<button>`: `disabled`. En enlace con aspecto de botón: sin `href`,
  `aria-disabled="true"`. En los dos casos sigue recibiendo el foco y lleva el
  motivo cerca.
- Botones solo con icono: nombre accesible en texto, no el del icono.
- **Button back:** en la web se sustituirá por el de la librería, pero su
  nombre accesible tiene que mantenerse fijo aunque el texto visible aparezca
  al pasar el ratón.

## Fase 2 · Documentación en Figma (2026-11-19)

Hecha el 2026-11-19. Sección
  `535:810` en la página Buttons (copia de la del Accordion adaptada):
  Anatomía con diagrama de 4 partes sobre la variante Focus y 12 tipos y
  estados, Cuándo usarlo, Recomendaciones, Do y don't con instancias reales,
  Button o Link, Accesibilidad, Properties (9 filas + nota del Button back) y
  Responsive. Cabecera del componente: fecha 19-11-2026 y descripción de
  plantilla oculta, como en el Accordion.
- Revisión de Diana (2026-11-19): aprobada. Único ajuste: etiquetas de estado
  centradas bajo cada ejemplo y ejemplos separados 48 px (`space/9`). Con esto
  la skill queda validada.

## Notas para la skill

- **Funcionó:** la fase 1 sacó todas las decisiones antes de escribir;
  documentar los 3 sets juntos encaja en la estructura; la sección de
  aspectos diferenciales se rellena con la tabla de la web.
- **Faltaba:** comprobar los **nombres accesibles reales** en el HTML de la web
  antes de escribirlos (el agente puso "Back" y era "Back to The Work
  section"). Añadir a la fase 1.
- **Faltaba:** duplicar la documentación de un componente ya hecho como base
  es lo más rápido y mantiene los estilos; decirlo en `figma-doc.md`.
- **Faltaba:** al añadir contenido, la **sección** de Figma no crece sola y
  recorta (pasó en el Accordion). Comprobar el alto de la sección al final.
- **Faltaba:** la cabecera principal lleva la descripción oculta (va en la de
  documentación). Decirlo explícitamente.
- **Encontrado en el componente** (no corregido, decide Diana):
  · ~~variables `spacing/*` de la librería antigua~~ → corregido el
    2026-11-19 a petición de Diana: 163 enlaces pasados a las locales del
    mismo valor (`space/1`–`4`, `interaction/line-height/large`,
    `focus/ring`); 0 variantes cambian de tamaño, 0 enlaces remotos quedan.
    Ojo para otros componentes: `spacing/5` vale 24 y `space/5` vale 20, así
    que no se puede cambiar por número a partir del 5;
  · ~~Focus y Active con texto `medium`~~ → corregido el 2026-11-19 a
    petición de Diana: todos los estados en `regular` (14 textos). Ya no
    cambia el ancho entre estados. En los links sí se mantiene `medium`,
    porque no tienen fondo ni borde que marque el estado;
  · la etiqueta de categoría de la cabecera de documentación dice "CONTENT"
    (heredada del Accordion).

## Fase 3 · Storybook (25-11-2026)

Hecha mientras Diana no estaba (le pidió seguir con el resto tras revisar el Link). En revisión.

- Código: `components/button/button.css` (solo tokens, sin JS) y `button.stories.js`, con los tres sets juntos: Button (`48:2481`), icon button (`48:2554`) y Button back (`48:2534`). Iconos en línea desde `public/icons` con `components/shared/icons.js`.
- HTML: `.button` en `<button type="button">` o en `<a href>` (mismo aspecto); `--large`, `--full` (Width large), `--inverted`. `.icon-button` (`--large`, `--inverted`) con `aria-label`. `.button-back` es un `<a>` con `aria-label` fijo y el texto visible con `aria-hidden`.
- Medidas comprobadas en el navegador: Button 40 y 48 px de alto (el borde va por dentro, como en Figma: se resta del relleno), Width large a todo el ancho, icon button 44 y 52 px, Button back 44 × 44 px que en Hover y Active muestra el texto.
- axe sin violaciones en las 15 stories. Las pruebas *Teclado* (Enter y Espacio activan) y *Button back · nombre fijo* pasan. Páginas sin texto por debajo de 16 px, sin scroll horizontal y sin referencias a la web.
- **Revisado por Diana (25-11-2026):**
  - **Disabled:** solo cuando la acción no se puede realizar (p. ej. no hay CV que descargar). Va `aria-disabled="true"`, no `disabled`, para que siga recibiendo el foco.
  - **icon button inverted large:** el fondo negro en Default y Active era un error de Figma; Diana lo pasó a transparente. Queda por corregir el Focus large inverted, que en Figma sigue con `background/brand`.
  - **Hover del icon button:** no se cambia el color (`background/subtle`); en la documentación el panel es gris y la muestra de Hover lleva fondo blanco para que se vea (en Figma igual).
  - **Rebote:** `--bounce` hace rebotar la flecha 4 px, 3 veces de 1,5 s (4,5 s) y se para: por debajo de los 5 s de WCAG 2.2.2. Con «reducir movimiento» no rebota. La web rebota 6 px sin parar y solo se quita con «reducir movimiento» (no cumple 2.2.2 en sentido estricto); se corrige al llevar DIME a la web.
  - **Active del Button:** igual que Default, por decisión de Diana. No se ve cambio al pulsar.
- Pendiente manual: VoiceOver y dispositivo real (el Button back al tocar, sin hover).
- **Texto largo (26-11-2026):** se quita la story «Texto largo» (un botón que baja a dos líneas es un mal uso) y pasa a la sección Do y don’t de la página de Uso, con la recomendación de texto corto en una sola línea.
