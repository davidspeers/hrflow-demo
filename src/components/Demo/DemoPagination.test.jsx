import { fireEvent, render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import DemoPagination from "./DemoPagination";

test("increments page when increment button is clicked and not disabled", () => {
  const store = setupStore({ page: 1, maxPage: 2 });
  const { container } = render(
    <Provider store={store}>
      <DemoPagination />
    </Provider>,
  );

  const incrementButton =
    container.querySelector(".hi-chevron-right").parentElement;
  fireEvent.click(incrementButton);
  expect(store.getState().search.page).toBe(2);
});

test("does not increment page when increment button is clicked and disabled", () => {
  const store = setupStore({ page: 2, maxPage: 2 });
  const { container } = render(
    <Provider store={store}>
      <DemoPagination />
    </Provider>,
  );

  expect(container.querySelector(".hi-chevron-right").parentElement.disabled).to
    .be.true;
  const incrementButton =
    container.querySelector(".hi-chevron-right").parentElement;
  fireEvent.click(incrementButton);
  expect(store.getState().search.page).toBe(2);
});

test("decrements page when decrement button is clicked and not disabled", () => {
  const store = setupStore({ page: 2, maxPage: 2 });
  const { container } = render(
    <Provider store={store}>
      <DemoPagination />
    </Provider>,
  );

  const decrementButton =
    container.querySelector(".hi-chevron-left").parentElement;
  fireEvent.click(decrementButton);
  expect(store.getState().search.page).toBe(1);
});

test("does not decrement page when decrement button is clicked and disabled", () => {
  const store = setupStore({ page: 1, maxPage: 2 });
  const { container } = render(
    <Provider store={store}>
      <DemoPagination />
    </Provider>,
  );

  expect(container.querySelector(".hi-chevron-left").parentElement.disabled).to
    .be.true;
  const decrementButton =
    container.querySelector(".hi-chevron-left").parentElement;
  fireEvent.click(decrementButton);
  expect(store.getState().search.page).toBe(1);
});
