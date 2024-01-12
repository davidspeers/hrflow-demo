import { render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import RequestStatus from "@types/requestStatus";
import { Provider } from "react-redux";
import { expect, test, vi } from "vitest";
import DemoSearchResults from "./DemoSearchResults";

test("shows loading elements when RequestStatus is LOADING", () => {
  const store = setupStore({ status: RequestStatus.LOADING });
  const { container } = render(
    <Provider store={store}>
      <DemoSearchResults />,
    </Provider>,
  );

  const loadingElements = container.querySelectorAll(".animate-pulse");
  expect(loadingElements).toHaveLength(10);
});

test("shows job elements when RequestStatus is SUCCESS", () => {
  vi.mock("./DemoSearchResultItem", () => ({
    default: () => <div className="mocked-demo-item"></div>,
  }));

  const resultItemsLength = 5;
  const store = setupStore({
    status: RequestStatus.SUCCESS,
    jobs: Array(resultItemsLength).fill({ id: 1, name: "Test" }),
  });
  const { container } = render(
    <Provider store={store}>
      <DemoSearchResults />,
    </Provider>,
  );

  const loadingElements = container.querySelectorAll(".animate-pulse");
  expect(loadingElements).toHaveLength(0);
  const resultItemElements = container.querySelectorAll(".mocked-demo-item");
  expect(resultItemElements).toHaveLength(5);
});
