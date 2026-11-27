import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

// Ejecuta cada story como una prueba: su `play` (teclado, foco, roles) y axe
// (parameters.a11y.test = "error"). Se lanza con `npm run test`.
export default defineConfig({
  plugins: [storybookTest({ configDir: ".storybook" })],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      headless: true,
      // Movimiento reducido: el CSS ya anula las transiciones, así que axe y los
      // `play` miden estados finales y no a mitad de una animación (en CI, más lento,
      // el enlace blanco de la Card se medía sobre el fondo aún claro).
      provider: playwright({ contextOptions: { reducedMotion: "reduce" } }),
      instances: [{ browser: "chromium" }],
    },
    setupFiles: ["./.storybook/vitest.setup.js"],
  },
});
