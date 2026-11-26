import { icon } from "../shared/icons.js";

let n = 0;
/** HTML del Accordion: <dime-accordion> (web component, D-017) envuelve la lista. Cada elemento: h3 > button + región con su panel. */
export const accordionHTML = ({ items = [{ title: "01.  Title", text: "Texto" }, { title: "02.  Title", text: "Texto" }, { title: "03.  Title", text: "Texto" }], open = [] } = {}) => {
  const u = `acc-${++n}`;
  return `<dime-accordion><ul role="list" class="dime-accordion">${items.map((it, i) => {
    const isOpen = open.includes(i);
    return `<li class="dime-accordion__item"><h3 class="dime-accordion__heading"><button class="dime-accordion__trigger" type="button" id="${u}-h${i}" aria-expanded="${isOpen}" aria-controls="${u}-p${i}"><span>${it.title}</span>${icon("add", "dime-accordion__icon dime-accordion__icon--closed")}${icon("subtract", "dime-accordion__icon dime-accordion__icon--open")}</button></h3><div class="dime-accordion__panel" id="${u}-p${i}" role="region" aria-labelledby="${u}-h${i}"${isOpen ? "" : " inert"}><div class="dime-accordion__panel-inner"><div class="dime-accordion__content"><p>${it.text}</p>${it.slot || ""}</div></div></div></li>`;
  }).join("")}</ul></dime-accordion>`;
};
