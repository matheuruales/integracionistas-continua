import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart", () => {
  it("muestra estado vacío al inicio", () => {
    render(<ShoppingCart />);
    expect(screen.getByTestId("empty")).toBeInTheDocument();
    // No asserts sobre 'total' porque no existe en vacío
  });

  it("agrega y elimina productos actualizando el estado", () => {
    render(<ShoppingCart />);

    // Los primeros 3 botones en este componente son los de 'Agregar'
    const addButtons = screen.getAllByRole("button");
    fireEvent.click(addButtons[0]); // Manzana $2

    // Ahora ya no debe estar vacío
    expect(screen.queryByTestId("empty")).not.toBeInTheDocument();

    // Elimina (el botón tiene title accesible)
    const deleteBtn = screen.getByTitle(/eliminar del carrito/i);
    fireEvent.click(deleteBtn);

    // Vuelve a vacío
    expect(screen.getByTestId("empty")).toBeInTheDocument();
  });

  it("suma correctamente con múltiples ítems", () => {
    render(<ShoppingCart />);


    // 2 Manzanas ($2 c/u) + 1 Banano ($3) = $7
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);

    // Ahora existe el total
    const totalEl = screen.getByTestId("total");
    expect(totalEl).toHaveTextContent("$7");
  });
});