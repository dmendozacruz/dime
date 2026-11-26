import { icon } from "../shared/icons.js";

let n = 0;
/** HTML del Input de contraseña: <dime-input> (web component, D-017) envuelve el campo. La ayuda y el error se unen al campo con aria-describedby. */
export const inputHTML = ({ label = "Password", placeholder = "Enter password", value = "", masked = true, showDescription = false, description = "Helper text", error = "", disabled = false, id } = {}) => {
  const uid = id || `pw-${++n}`;
  const describedby = [showDescription && `${uid}-help`, `${uid}-error`].filter(Boolean).join(" ");
  return `<dime-input><div class="dime-input">
  <label class="dime-input__label" for="${uid}">${label}</label>
  <div class="dime-input__field">
    <input id="${uid}" type="${masked ? "password" : "text"}" placeholder="${placeholder}" value="${value}" autocomplete="current-password" aria-describedby="${describedby}"${error ? ' aria-invalid="true"' : ""}${disabled ? " disabled" : ""}>
    <button class="dime-input__toggle" type="button" aria-label="${masked ? "Show password" : "Hide password"}"${disabled ? " disabled" : ""}>${icon(masked ? "view" : "view-off", "dime-input__toggle-icon")}</button>
  </div>
  ${showDescription ? `<p class="dime-input__help" id="${uid}-help">${description}</p>` : ""}
  <p class="dime-input__error" id="${uid}-error" role="alert">${error ? `${icon("danger", "dime-input__error-icon")}<span>${error}</span>` : ""}</p>
</div></dime-input>`;
};
