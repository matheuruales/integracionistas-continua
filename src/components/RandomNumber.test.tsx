import { render, screen, fireEvent, act } from "@testing-library/react";
import RandomNumber from "./RandomNumber";

describe("RandomNumber (robusto)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("genera un número inicial y permite limpiar/generar de nuevo", async () => {
    render(<RandomNumber />);

    // Al montar, está animando y muestra "—"
    expect(screen.getByText("—")).toBeInTheDocument();

    // Avanza el delay de 300ms para completar la generación inicial
    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // Ya no debe mostrarse "—" y debe aparecer el botón "Limpiar"
    expect(screen.queryByText("—")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /limpiar/i })).toBeInTheDocument();

    // Limpiar historial -> vuelve el estado vacío
    fireEvent.click(screen.getByRole("button", { name: /limpiar/i }));
    expect(screen.getByText(/no hay historial aún/i)).toBeInTheDocument();

    // Generar nuevamente (el botón dice "Generar Nuevo Número")
    const generarBtn = screen.getByRole("button", { name: /generar/i });
    fireEvent.click(generarBtn);

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // Ya no está el mensaje de vacío: se generó un nuevo número
    expect(screen.queryByText(/no hay historial aún/i)).not.toBeInTheDocument();
  });
});