import { icon } from "../shared/icons.js";

const ICON = { info: "information", success: "check-circle", warning: "warning", error: "danger" };

/** HTML del Alert. El rol no va aquí: lo lleva la región que lo contiene. */
export const alertHTML = ({ type = "error", title = "Title", content = "Message that explains what happened and what to do.", showContent = true } = {}) =>
  `<div class="dime-alert dime-alert--${type}">${icon(ICON[type], "dime-alert__icon")}<div class="dime-alert__content"><p class="dime-alert__title">${title}</p>${showContent ? `<p class="dime-alert__text">${content}</p>` : ""}</div></div>`;
