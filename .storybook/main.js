/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ["../docs/**/*.mdx", "../components/**/*.mdx", "../components/**/*.stories.js"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: "@storybook/html-vite",
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
};
export default config;
