import { render, screen } from "@testing-library/react";
import Survey from "./Survey";

describe("Survey", () => {
  it("renderiza 5 radios y el botón Enviar", () => {
    render(<Survey />);
    const radios = screen.getAllByRole("radio", { hidden: true });
    expect(radios).toHaveLength(5);
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });
});