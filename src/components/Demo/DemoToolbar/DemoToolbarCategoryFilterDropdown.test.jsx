import { fireEvent, render, screen } from "@testing-library/react";
import { setupMockStore } from "@tests/setupMockStore";
import JobCategory from "@types/JobCategory";
import { Provider } from "react-redux";
import { beforeEach, expect, test } from "vitest";
import DemoToolbarCategoryFilterDropdown from "./DemoToolbarCategoryFilterDropdown";

let mockStore, getByText, renderResult;

beforeEach(() => {
  mockStore = setupMockStore();
  renderResult = render(
    <Provider store={mockStore}>
      <DemoToolbarCategoryFilterDropdown />
    </Provider>,
  );
  getByText = renderResult.getByText;
});

test('displays the dropdown menu when the "Add Filter" button is clicked', () => {
  fireEvent.click(getByText("Add Filter"));

  expect(document.querySelector('[role="menu"]')).to.exist;
});

test("adds a filter when a menu item is clicked", () => {
  fireEvent.click(getByText("Add Filter"));
  fireEvent.click(getByText(JobCategory.AI));

  expect(mockStore.getState().search.categoryFilters).toContain(JobCategory.AI);
});

test('disables the "Add Filter" button when all categories are selected', () => {
  Object.values(JobCategory).forEach((category) => {
    fireEvent.click(getByText("Add Filter"));
    fireEvent.click(getByText(category));
  });

  expect(getByText("Add Filter").closest("button").disabled).to.be.true;
});

test("contains the correct number of items in the dropdown menu", () => {
  fireEvent.click(getByText("Add Filter"));
  fireEvent.click(getByText(JobCategory.AI));
  fireEvent.click(getByText("Add Filter"));
  fireEvent.click(getByText(JobCategory.HR));
  fireEvent.click(getByText("Add Filter"));

  expect(screen.getAllByRole("menuitem")).toHaveLength(
    Object.keys(JobCategory).length - 2,
  );
  expect(renderResult.queryByText(JobCategory.AI)).to.be.null;
  expect(renderResult.queryByText(JobCategory.HR)).to.be.null;
  expect(renderResult.queryByText(JobCategory.SWE)).not.to.be.null;
});
