import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/html-vite";
import * as a11yAnnotations from "@storybook/addon-a11y/preview";
import previewAnnotations from "./preview.js";

const project = setProjectAnnotations([a11yAnnotations, previewAnnotations]);
beforeAll(project.beforeAll);
