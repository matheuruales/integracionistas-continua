import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

// Mock para setTimeout
jest.useFakeTimers();

describe("RegisterForm", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("el botón está deshabilitado si los campos están vacíos", () => {
    render(<RegisterForm />);
    const button = screen.getByRole("button", { name: /registra/i });
    expect(button).toBeDisabled();
  });

  it("al completar los campos, el botón se habilita", () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText(/tu nombre completo/i);
    const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
    const button = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, { target: { value: "Matheu" } });
    fireEvent.change(emailInput, { target: { value: "matheu@test.com" } });

    expect(button).not.toBeDisabled();
  });

  it("al hacer submit, limpia los campos y muestra mensaje de confirmación", async () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText(/tu nombre completo/i) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /registrar/i });

    fireEvent.change(nameInput, { target: { value: "Matheu" } });
    fireEvent.change(emailInput, { target: { value: "matheu@test.com" } });
    
    fireEvent.click(button);

    // Avanzar el timer
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(nameInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });

    expect(screen.getByTestId("confirmation")).toBeInTheDocument();
  });
});