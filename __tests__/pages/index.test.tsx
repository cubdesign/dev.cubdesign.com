import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const posts: any[] = [];
    render(Home.getLayout!(<Home posts={posts} />));
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });

  it("layout draw title", () => {
    const posts: any[] = [];
    render(Home.getLayout!(<Home posts={posts} />));
    const heading = screen.getByRole("heading", {
      name: /welcome to dev\.cubdesign\.com/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
