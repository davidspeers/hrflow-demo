import { fireEvent, render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import SortFilter from "@types/SortFilter";
import { Provider } from "react-redux";
import { beforeEach, expect, test } from "vitest";
import DemoToolbarSortDropdown from "./DemoToolbarSortDropdown";

let store, getByText, renderResult, container;
const initialSortFilter = SortFilter.CREATION_DATE;
const updatedSortFilter = SortFilter.NAME;

beforeEach(() => {
  store = setupStore();
  renderResult = render(
    <Provider store={store}>
      <DemoToolbarSortDropdown />
    </Provider>,
  );
  ({ getByText, container } = renderResult);
});

test("updates sortFilter when an option is selected", () => {
  fireEvent.click(getByText(`Ordered by ${initialSortFilter}`));
  fireEvent.click(getByText(updatedSortFilter));

  expect(store.getState().search.sortFilter).toBe(updatedSortFilter);
  expect(getByText(`Ordered by ${updatedSortFilter}`).closest("button")).to.not
    .be.null;
});

test("shows a checkmark beside the selected option", () => {
  fireEvent.click(getByText(`Ordered by ${initialSortFilter}`));

  const checkIconElement = container.querySelector("svg.check");
  const activeSortFilterElement = getByText(initialSortFilter);

  expect(checkIconElement.nextSibling).toBe(activeSortFilterElement);
});

[
  {
    sortFilter: SortFilter.NAME,
    expectedButtonText: `Ordered by ${SortFilter.NAME}`,
  },
  {
    sortFilter: SortFilter.CATEGORY,
    expectedButtonText: `Ordered by ${SortFilter.CATEGORY}`,
  },
  {
    sortFilter: SortFilter.NAME,
    expectedButtonText: `Ordered by ${SortFilter.NAME}`,
  },
  {
    sortFilter: SortFilter.CUSTOM,
    expectedButtonText: `Custom Order`,
  },
].forEach(({ sortFilter, expectedButtonText }) => {
  test(`displays "${expectedButtonText}" text when sortFilter is set to "${sortFilter}"`, () => {
    store = setupStore({ sortFilter });
    renderResult = render(
      <Provider store={store}>
        <DemoToolbarSortDropdown />
      </Provider>,
    );
    ({ getByText } = renderResult);

    const button = getByText(expectedButtonText);
    expect(button).to.not.be.null;
  });
});
