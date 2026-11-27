import React, { useEffect, useRef, useState } from "react";

// Tabla de la documentación dentro de un contenedor con scroll horizontal: en pantallas
// estrechas la tabla se desplaza sin ensanchar toda la página. Solo cuando de verdad
// desborda se hace enfocable y se anuncia como región, para que quien usa teclado pueda
// desplazarla; si cabe, no añade ninguna parada de tabulador.
export function ScrollTable(props) {
  const box = useRef(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className="dime-table-scroll"
      {...(overflows ? { role: "region", tabIndex: 0, "aria-label": "Tabla desplazable en horizontal" } : {})}
    >
      <table {...props} />
    </div>
  );
}
