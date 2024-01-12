import { fireEvent, render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import DemoToolbarSearchBar from "./DemoToolbarSearchBar";

test("renders the correct search term and dispatches updateTerm on change", () => {
  const initialTerm = "Engineer";
  const updatedTerm = "Assistant";

  const store = setupStore({ term: initialTerm });
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <DemoToolbarSearchBar />
    </Provider>,
  );

  const input = getByPlaceholderText("Search..");
  expect(input.value).toBe(initialTerm);

  fireEvent.change(input, { target: { value: updatedTerm } });
  expect(input.value).toBe(updatedTerm);
  expect(store.getState().search.term).toBe(updatedTerm);
});
