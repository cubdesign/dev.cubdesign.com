import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(Home.getLayout!(<Home />));
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });

  it("layout draw title", () => {
    render(Home.getLayout!(<Home />));
    const heading = screen.getByRole("heading", {
      name: /welcome to dev\.cubdesign\.com/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
