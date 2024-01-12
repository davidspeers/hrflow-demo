import { fireEvent, render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import JobCategory from "@types/JobCategory";
import { Provider } from "react-redux";
import { beforeEach, expect, test } from "vitest";
import DemoToolbarCategoryFilterBadge from "./DemoToolbarCategoryFilterBadge";

let store, getByText, getByRole, renderResult;
const category = JobCategory.AI;

beforeEach(() => {
  store = setupStore({ search: { categoryFilters: [category] } });
  renderResult = render(
    <Provider store={store}>
      <DemoToolbarCategoryFilterBadge category={category} />,
    </Provider>,
  );
  ({ getByText, getByRole } = renderResult);
});

test("renders the correct category", () => {
  expect(getByText(category)).to.not.be.null;
});

test("removes category from categoryFilters when the close icon is clicked", () => {
  expect(store.getState().search.categoryFilters).to.contain(category);

  fireEvent.click(getByRole(`button`));

  expect(store.getState().search.categoryFilters).to.not.contain(category);
});
