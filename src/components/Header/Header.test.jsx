import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import Header from "./Header";

test("toggles mobile navigation menu when button is clicked", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );

  const menuButton = screen.getByRole("button", { name: "" });
  expect(menuButton).not.toBeNull();

  // Check initial state
  let mobileNav = screen.queryByRole("navigation");
  expect(mobileNav).toBeNull();

  // Click the button
  fireEvent.click(menuButton);

  // Check that the mobile navigation is now visible
  mobileNav = screen.getByRole("navigation");
  expect(mobileNav).not.toBeNull();
});
