import { render } from "@testing-library/react";
import HomePage from "../app/page";

describe("Home Page", () => {
  it("renders home page", () => {
    const { getByText } = render(<HomePage />);
    expect(getByText("Product Data Explorer")).toBeTruthy();
  });
});
