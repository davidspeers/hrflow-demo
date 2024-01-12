import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import HeaderButton from "./HeaderButton";

test("renders HeaderButton with correct title and path", () => {
  render(
    <MemoryRouter initialEntries={["/demo"]}>
      <HeaderButton title="Demo" path="/demo" />
    </MemoryRouter>,
  );

  const pathElement = screen.getByRole("link", { name: /Demo/i });
  expect(pathElement).not.toBeNull();
  expect(pathElement.getAttribute("href")).toBe("/demo");
});

[
  {
    description: "button is active when pathname matches path",
    path: "/demo",
    expectIsActive: true,
  },
  {
    description: "button is active when pathname matches path with a subroute",
    path: "/demo/about",
    expectIsActive: true,
  },
  {
    description:
      "button isn't active when pathname starts with path, but is another word",
    path: "/demonstration",
    expectIsActive: false,
  },
  {
    description: "button isn't active when pathname doesn't contain path",
    path: "/about",
    expectIsActive: false,
  },
  {
    description:
      "button isn't active when pathname contains but doesn't start with path",
    path: "/about/demo",
    expectIsActive: false,
  },
].forEach(({ description, path, expectIsActive }) => {
  test(description, () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <HeaderButton title="Demo" path="/demo" />
      </MemoryRouter>,
    );

    const pathElement = screen.getByRole("link", { name: /Demo/i });
    expect(pathElement).not.toBeNull();
    if (expectIsActive) {
      expect(pathElement.classList.contains("border-blue-100")).toBe(true);
      expect(pathElement.classList.contains("bg-blue-50")).toBe(true);
      expect(pathElement.classList.contains("text-blue-600")).toBe(true);
    } else {
      expect(pathElement.classList.contains("border-transparent")).toBe(true);
      expect(pathElement.classList.contains("text-gray-800")).toBe(true);
    }
  });
});
