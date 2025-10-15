import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

function RenderNavbarWithRouter() {
  return (
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar - Renderizado", () => {
  it("renderiza enlaces principales", () => {
    render(<RenderNavbarWithRouter />);

    const linkRandom = screen.getByRole("link", { name: /generador aleatorio/i });
    const linkCart = screen.getByRole("link", { name: /carrito/i });
    const linkSurvey = screen.getByRole("link", { name: /encuesta/i });

    expect(linkRandom).toBeInTheDocument();
    expect(linkCart).toBeInTheDocument();
    expect(linkSurvey).toBeInTheDocument();


    expect(linkRandom).toHaveAttribute("href", "/random");
    expect(linkCart).toHaveAttribute("href", "/cart");
    expect(linkSurvey).toHaveAttribute("href", "/survey");
  });
});