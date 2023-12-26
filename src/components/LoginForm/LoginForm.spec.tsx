import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";
import { userEvent } from "@testing-library/user-event";
import { ApiClient } from "@http/api-client";
import { LoginForm } from "./LoginForm";

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({ set: jest.fn() })),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@http/api-client", () => ({
  ApiClient: { login: jest.fn() },
}));

const mock = {
  loginRequestFail: () => {
    (ApiClient.login as jest.Mock).mockRejectedValueOnce({
      error: "Email ou senha inválidos",
    });
  },
  loginRequestSucceed: () => {
    (ApiClient.login as jest.Mock).mockResolvedValue({
      accessToken: "token-123",
    });
  },
};
describe("Login Form", () => {
  const setup = () => {
    render(<LoginForm />);

    const submitBtn = screen.getByRole("button", { name: "Entrar" });
    const emailInput = screen.getByRole("textbox", { name: "Email:" });
    const passwordInput = screen.getByLabelText("Senha:");
    const user = userEvent.setup();

    return { submitBtn, emailInput, passwordInput, user };
  };

  test("disables submit button when email invalid", async () => {
    const { submitBtn, emailInput, user } = setup();

    expect(submitBtn).toBeEnabled();

    await user.click(emailInput);
    await user.keyboard("Some.invalid.email");
    await user.tab();

    expect(submitBtn).toBeDisabled();
  });

  test("disables submit button when password is empty", async () => {
    const { submitBtn, passwordInput, user } = setup();

    expect(submitBtn).toBeEnabled();

    await user.click(passwordInput);
    await user.tab();

    expect(submitBtn).toBeDisabled();
  });

  test("shows error message when login fails", async () => {
    mock.loginRequestFail();

    const { submitBtn, emailInput, user } = setup();

    expect(submitBtn).toBeEnabled();

    await user.click(emailInput);
    await user.keyboard("user@email.com");
    await user.tab();
    await user.keyboard("My correct password");
    await user.click(submitBtn);

    expect(await screen.findByText("Email ou senha inválidos")).toBeVisible();
  });

  test("redirects to home page after sucessful login", async () => {
    mock.loginRequestSucceed();

    const { submitBtn, emailInput, user } = setup();

    expect(submitBtn).toBeEnabled();

    await user.click(emailInput);
    await user.keyboard("user@email.com");
    await user.tab();
    await user.keyboard("My correct password");
    await user.click(submitBtn);

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
