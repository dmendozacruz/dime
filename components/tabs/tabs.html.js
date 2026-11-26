let n = 0;
/** HTML de Tabs: <dime-tabs> (web component, D-017) envuelve la barra y los paneles. `items` son las etiquetas; la primera empieza seleccionada. */
export const tabsHTML = ({ label = "Tabs", items = ["Item", "Item", "Item"], large = false, panels } = {}) => {
  const u = `tabs-${++n}`;
  const tabs = items.map((t, i) => `<button class="dime-tabs__tab" role="tab" type="button" id="${u}-t${i}" aria-controls="${u}-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${t}</button>`).join("");
  const ps = items.map((t, i) => `<div class="dime-tabs__panel" role="tabpanel" id="${u}-p${i}" aria-labelledby="${u}-t${i}" tabindex="0"${i === 0 ? "" : " hidden"}><p style="margin: 0; font-size: var(--font-size-body-l); line-height: var(--line-height-body-l);">${panels ? panels[i] : `Panel ${i + 1}`}</p></div>`).join("");
  return `<dime-tabs><div class="dime-tabs${large ? " dime-tabs--large" : ""}"><div class="dime-tabs__list" role="tablist" aria-label="${label}">${tabs}</div>${ps}</div></dime-tabs>`;
};
