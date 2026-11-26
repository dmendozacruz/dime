# Input

## Resumen y estado

- Fase 1 (investigar): hecha.
- Fase 2 (documentar en Figma): hecha.
- Fase 3 (Storybook): hecha, en revisión (`<dime-input>`).
- Fase 4 (llevar a la web): pendiente; se hace al llevar DIME a la web.
- Abierto: nada.
- Manual pendiente: VoiceOver y dispositivo real.

## Fuentes

- Figma, página `↳ Inputs` (`18:17`), sección `Input password`
  (`232:19395`). Lectura 21-11-2026 vía MCP oficial (`use_figma` en lectura).
  - `Input` (`232:19462`, 12 variantes, 390 × 72; Error 390 × 96):
    - `State`: Default · Active · Hover · Error · Focus · Disabled.
    - `Masked`: True · False (contraseña oculta o visible).
    - `Placeholder` (texto, "Enter password"), `Description` (booleana,
      **`false`**), `Error` (booleana, **`true`**).
  - Anatomía (de arriba abajo): etiqueta `.Label` (`106:11535`, página
    Subcomponents) con el texto "Password"; campo de 48 px de alto con borde de
    1 px y **radio 39**; dentro, el texto (placeholder en Default, Hover y
    Disabled; "•••••••••" en Active, Error y Focus) y el botón
    `.Button password` (`253:20524`, 44 px, radio 100) con el icono `view` /
    `view off` (24 px); debajo, "Helper text" (capa `Description`, oculta por
    defecto) y, en Error, `.Error help` (`106:11681`) con icono `danger`
    (20 px) y "Error text".
  - Variables todas locales (0 remotas): borde `border/medium` (Default),
    `border/default`, `border/disabled`, `feedback/error/border`; texto
    `content/default`, `content/subtle`, `content/disabled`,
    `feedback/error/content`; foco `focus/ring-inner` + `focus/ring`;
    padding `space/5` (izq.), `space/3`, `space/1`. Gaps de 8 y 4 **sin
    variable**.
  - Estilo de texto: `Body / Small / regular` en los 38 textos (también la
    etiqueta).
  - Cabecera `.Headers` (`232:19396`): título "Input", descripción de
    plantilla, fecha 2025-2-15. Sin sección *Documentation*.
- Web: según `button.md` (verificado 19-11-2026), la pantalla de contraseña
  envía con un `<button type="submit">` "Acceder"; según `link.md`, tiene los
  enlaces "Send email" y "LinkedIn". **El campo en sí no está verificado**
  (etiqueta, `autocomplete`, mensaje de error, botón de mostrar).
- APG: no hay patrón de campo de texto (HTML nativo). Referencias: GOV.UK
  Design System (*Password input*, *Error message*). WCAG 2.2: 1.3.1, 1.3.5,
  1.4.1, 1.4.3, 1.4.11, 2.4.6, 2.5.3, 3.3.1, 3.3.2, 3.3.3, 3.3.8, 4.1.2,
  4.1.3. React Aria: `TextField` (`useTextField`) como referencia.

## Contraste

Borde Default `border/medium` 3,36:1 (1.4.11 pide 3:1: cumple justo).
Placeholder `content/subtle` 6,79:1. Disabled `content/disabled` y
`border/disabled` 2,46:1 (exento por estar inactivo).

## Matriz

Matriz de la fase 1 (21-11-2026): refleja lo que se sabía entonces. Las filas «falta decisión» y «web no verificada» se resolvieron después; lo decidido está en «Decisiones y alternativas» y en las secciones fechadas de más abajo.

| Aspecto | Figma | Web | WAI-ARIA / APG / WCAG | React Aria | Estado y decisión |
| --- | --- | --- | --- | --- | --- |
| Propósito | Campo de contraseña | Pantalla de contraseña de Inditex | `<input type="password">` | `TextField` | confirmado |
| Anatomía | Etiqueta + campo + botón mostrar + ayuda + error | web no verificada | — | — | confirmado |
| Nombre accesible | Etiqueta visible "Password" | web no verificada | `<label for>` (1.3.1, 2.5.3); el placeholder nunca es la etiqueta | `label` | confirmado en Figma |
| Descripción | "Helper text" con `Description` | — | `aria-describedby` | `description` | confirmado; nombre de la property confuso (4) |
| Default | Borde `border/medium` | — | 1.4.11 (3,36:1) | — | confirmado |
| Hover | Borde `border/default` | — | — | — | confirmado |
| Active | Con texto escrito ("•••••••••"), sin anillo | — | No es un estado de ARIA; es "relleno" | — | falta decisión (2) |
| Focus-visible (doble anillo) | Anillos | — | 2.4.7 | `isFocusVisible` | confirmado |
| Disabled | `border/disabled`, `content/disabled` | — | `disabled` nativo; no se envía | `isDisabled` | falta decisión (5): ¿se usa? |
| Read-only | No existe | — | — | — | no aplica |
| Required | No existe | — | En un formulario de un solo campo, `required` nativo sin marca visual es aceptable | `isRequired` | falta decisión (6) |
| Invalid y error | `State=Error` + `.Error help` con icono y texto; además booleana `Error` | web no verificada | 3.3.1, 1.4.1 (icono + texto + borde), `aria-invalid="true"`, error en `aria-describedby`; se anuncia al enviar | `isInvalid`, `errorMessage` | discrepancia (1) |
| Mostrar contraseña | `Masked` + `.Button password` | web no verificada | `<button type="button">` con nombre fijo ("Show password") y `aria-pressed`, o nombre que cambia ("Show / Hide password") | — | falta decisión (3) |
| Teclado | — | — | Tab: campo → botón mostrar → enviar | — | confirmado |
| Autocompletar | — | — | 1.3.5: `autocomplete="current-password"`; 3.3.8: no bloquear pegar ni gestores | — | falta verificar en la web |
| Tokens | Locales; gaps 8 y 4 sin variable; radio 39 | — | Nunca valores sueltos; D-013 radio 100 | — | discrepancia (7) |
| Contraste y forced colors | Ver arriba | — | 1.4.11 | — | confirmado. En forced colors el borde del campo se mantiene |
| Objetivo táctil | Campo 48; botón 44 | — | 2.5.8 | — | confirmado |
| Zoom, reflow y texto largo | 390 de ancho | — | 1.4.10: ancho al 100 % del contenedor | — | confirmado como requisito |
| Responsive | Una medida | — | — | — | confirmado |

## Variables y nombres incoherentes

- **Booleana `Error` = `true` por defecto** y además `State=Error`: dos
  controles para lo mismo; en las variantes que no son Error, la booleana no
  hace nada visible (o, si se activa, mostraría un error sin el borde rojo).
- **`Description`** es la booleana del texto de ayuda ("Helper text"); en
  React Aria `description` es el texto, no un interruptor. Lo habitual en
  Figma sería `Show description`.
- **`Active`** describe un campo con texto, no un estado de pulsación como en
  Button y Link.
- Etiqueta del campo con `Body / Small` (14 px), igual que el texto escrito.
- Radio 39 en el campo (D-013: único radio 100).
- Gaps de 8 y 4 sin variable (`space/2`, `space/1` existen).
- La sección se llama "Input password": ¿habrá otros tipos (texto, correo)?

## Decisiones y alternativas

1. **Error duplicado.** *Recomendación:* quitar la booleana `Error` y dejar
   solo `State=Error` (o al revés: un `State` sin Error y la booleana
   `Show error`, que permite combinar error con foco). Recomiendo la segunda:
   un campo con error también puede tener el foco.
2. **`Active`.** *Recomendación:* renombrarlo a `Filled` (relleno), que es lo
   que muestra. No cambia el aspecto.
3. **Botón de mostrar contraseña.** *Recomendación:* nombre fijo "Show
   password" con `aria-pressed="true|false"` (el icono cambia, el nombre no).
   Pasa a la documentación como regla del Input.
4. **`Description`.** *Recomendación:* renombrar a `Show description` y
   ligar el texto a una property `Description` (texto).
5. **Disabled.** Hoy no se usa en la web (no verificado). *Recomendación:*
   mantenerlo por coherencia con Button y Link, documentado como raro.
6. **Required.** *Recomendación:* no añadir marca visual mientras el
   formulario tenga un solo campo; `required` nativo en código.
7. **Radio y gaps.** *Recomendación:* radio 100 (D-013; el campo seguiría
   siendo píldora a 48 px) y gaps con `space/2` y `space/1` (mismo valor).
8. **Alcance.** *Recomendación:* documentar ahora solo el Input de contraseña
   y anotar que un Input de texto genérico sería un componente nuevo (fase 2
   del proceso, Figma y Storybook a la vez).

## Para la fase 2

- Cabecera: descripción oculta y fecha del día.
- Sección "Input y Alert" (el error de un campo va en el campo).
- Properties: las 5 del set con su nombre exacto, revisadas tras las
  decisiones.

## Limpieza aplicada en Figma (22-11-2026)

Aprobada por Diana (bloque A), sin cambio de tamaño en ninguna variante.
`Active` → `Filled`; `Description` → `Show description`; radio del campo 100; gaps de 8 con `space/2` (también en `.Button password`) y el de 4 de `.Error help` con `space/1`. Decisiones 2, 4 y 7 cerradas.

## Decisiones de Diana (22-11-2026, punto B)

- **Solo campo de contraseña** por ahora (decisión 8 cerrada).
- **Error y foco no van juntos:** al enviar, el foco está en el botón, así que el Input en error no lleva anillo. La booleana `Error` solo existe dentro de `State=Error` y enseña u oculta el mensaje (`.Error help`).
- **Booleana `Error` eliminada** (aprobado): el mensaje de error se ve siempre en `State=Error`. Properties: `Placeholder`, `Show description`, `State`, `Masked`. Decisión 1 cerrada.

## Web revisada (23-11-2026, `projects/inditex.html`)

- `<label for>` "Password" visible; `<input type="password" placeholder="Enter password" aria-describedby="password-helper" aria-invalid required autocomplete="off">`.
- Botón `#toggle-password` (`<button type="button">`): `aria-label` cambia entre "Show password" y "Hide password". Funciona y se mantiene (retiro la recomendación de `aria-pressed` con nombre fijo: las dos son válidas).
- Error: `<p id="password-helper" role="alert">` siempre presente y vacío; mensajes "Incorrect password." y "Please enter a password.", re-anunciados en cada intento. Envío por `submit` del form.
- **Para la fase 4:** `autocomplete="off"` estorba a los gestores de contraseñas (WCAG 1.3.5 y 3.3.8): usar `current-password`. El rojo de error de la web es `#da3943` (`--color-danger`); el de DIME es `feedback/error/*` (`#a00523`): manda Figma.

## Fase 2 · Documentación en Figma (23-11-2026)

Sección *Documentation* (`645:90`) en la página Inputs, copiada de la del Badge (sin Responsive: el campo ocupa el ancho del contenedor). Anatomía de 5 partes (etiqueta, campo, texto, botón ver contraseña, mensaje de error) con los 6 estados y Masked True/False etiquetados; Cuándo usarlo; Recomendaciones; Do y don't (etiqueta visible frente a sin etiqueta; "Incorrect password." frente a "Error"); **Error del campo o Alert**; Accesibilidad; Properties (`State`, `Masked`, `Placeholder`, `Show description`). Cabecera del componente: fecha 23-11-2026, descripción oculta. Estado: en revisión por Diana.

**Encontrado en el componente (no corregido, decide Diana):** con `Masked=False` el campo sigue mostrando puntos (•••); solo cambia el icono a "view off". Debería mostrar el texto escrito.

## Corrección aprobada por Diana (24-11-2026)

Con `Masked=False` el campo muestra texto legible ("example123") en Filled, Error y Focus, en vez de puntos. Sin cambio de tamaño.

## Storybook (26-11-2026)

Web component `<dime-input>` en light DOM (`components/input/`), con `setError()` para mostrar el error ligado al campo con `aria-describedby`. Stories: Estado principal, Filled, Error, Masked false, Con ayuda, Disabled, Toggle (mostrar u ocultar la contraseña) y Submit; Toggle y Submit llevan prueba de interacción. axe sin violaciones.

## Idea para cuando se use en la web (26-11-2026)

Diana comparte cómo quiere que funcione la pantalla de contraseña cuando el componente esté en la web (capturas de su diseño `protected_page_error`). No está construido: se deja anotado.

- **Disposición:** el campo de contraseña (con el botón del ojo) y el botón «Access» van uno al lado del otro.
- **Contraseña incorrecta:** el campo con borde rojo y el mensaje de error con icono debajo («Error text»).
- **Contraseña correcta:** al pulsar, el campo y el botón **se unen en una sola barra verde con un check blanco** en el centro, con una animación de transición. Después, la redirección al caso.
- **La animación** la pasará Diana más adelante.

Criterios de accesibilidad que ya están decididos o aplican (ver `alert.md`):

- El éxito se anuncia como mensaje de estado (`role="status"`), sin Alert visible: el check no es la única señal.
- La barra verde con el check blanco debe tener al menos 3:1 de contraste (WCAG 1.4.11), y el verde un token propio (hoy: `--color-success-on-light` o equivalente en Figma).
- Con «reducir movimiento», la barra aparece sin animación.
- La animación dura menos de 5 s y no se repite (WCAG 2.2.2).
- El foco no se pierde al unirse el campo y el botón: tras el éxito pasa a donde se redirija.

