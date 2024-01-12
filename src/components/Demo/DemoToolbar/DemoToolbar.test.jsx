import { fireEvent, render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import JobCategory from "@types/JobCategory";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import DemoToolbar from "./DemoToolbar";

test("does not show Reset Filters button when no filters are applied", () => {
  const store = setupStore({ categoryFilters: [] });
  const { queryByText } = render(
    <Provider store={store}>
      <DemoToolbar />
    </Provider>,
  );

  expect(queryByText("Reset Filters")).to.be.null;
});

test("resets filters when Reset Filters button is pressed", () => {
  const store = setupStore({ categoryFilters: [JobCategory.AI] });
  const { getByText, queryByText } = render(
    <Provider store={store}>
      <DemoToolbar />
    </Provider>,
  );

  expect(store.getState().search.categoryFilters).toContain(JobCategory.AI);
  expect(queryByText(JobCategory.AI)).to.not.be.null;

  fireEvent.click(getByText("Reset Filters"));
  expect(store.getState().search.categoryFilters).to.be.empty;
  expect(queryByText(JobCategory.AI)).to.be.null;
});
