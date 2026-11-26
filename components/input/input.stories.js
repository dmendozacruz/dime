import { expect, userEvent, within, waitFor } from "storybook/test";
import { inputHTML } from "./input.html.js";
import "./input.css";
import "../button/button.css";

const mount = (html, width = 390) => {
  const wrap = document.createElement("div");
  wrap.style.cssText = `width: ${width}px; max-width: 100%;`;
  wrap.innerHTML = html;
  return wrap;
};

export default {
  title: "Componentes/Input/Ejemplos",
  render: (args) => mount(inputHTML(args)),
  args: { label: "Password", placeholder: "Enter password", value: "", masked: true, showDescription: false, description: "Helper text", error: "", disabled: false },
  argTypes: {
    label: { control: "text", description: "Etiqueta visible. Es el nombre del campo." },
    placeholder: { name: "Placeholder", control: "text", description: "Solo un ejemplo: nunca sustituye a la etiqueta." },
    value: { control: "text", description: "Texto escrito (State = Filled)." },
    masked: { name: "Masked", control: "boolean", description: "Contraseña oculta." },
    showDescription: { name: "Show description", control: "boolean", description: "Texto de ayuda bajo el campo." },
    description: { control: "text" },
    error: { control: "text", description: "Mensaje de error (State = Error)." },
    disabled: { name: "State = Disabled", control: "boolean" },
  },
  parameters: { a11y: { test: "error" } },
};

export const Default = { name: "Estado principal" };
export const Filled = { name: "Filled", args: { value: "password123" } };
export const ErrorState = { name: "Error", args: { value: "password123", error: "Incorrect password." } };
export const Visible = { name: "Masked false", args: { value: "example123", masked: false } };
export const WithHelp = { name: "Con ayuda", args: { showDescription: true } };
export const Disabled = { name: "Disabled", args: { disabled: true } };

/** Botón ver contraseña: cambia el tipo del campo y su propio nombre. */
export const Toggle = {
  name: "Ver contraseña",
  args: { value: "password123" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    const toggle = canvas.getByRole("button", { name: "Show password" });
    await expect(input).toHaveAttribute("type", "password");
    await userEvent.click(toggle);
    await expect(input).toHaveAttribute("type", "text");
    await expect(toggle).toHaveAccessibleName("Hide password");
  },
};

/** Interacción crítica: al enviar vacío aparece el error, se anuncia y el foco sigue en el campo. */
export const Submit = {
  name: "Enviar con error",
  render: () => {
    const form = document.createElement("form");
    form.noValidate = true;
    form.style.cssText = "display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-4); width: 390px;";
    form.innerHTML = inputHTML({ id: "pw-submit" }) + '<button type="submit" class="dime-button">Access</button>';
    const field = form.querySelector("dime-input");
    const input = form.querySelector("input");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      field.setError(input.value ? "Incorrect password." : "Please enter a password.");
      input.focus();
    });
    return form;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await userEvent.click(input);
    await userEvent.keyboard("{Enter}");
    const alert = canvas.getByRole("alert");
    await waitFor(() => expect(alert).toHaveTextContent("Please enter a password."));
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(/Please enter a password\./);
    await expect(input).toHaveFocus();
  },
};
