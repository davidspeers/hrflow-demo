import { render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import RequestStatus from "@types/requestStatus";
import { Provider } from "react-redux";
import { expect, test, vi } from "vitest";
import Demo from "./Demo";

vi.mock("./DemoToolbar", () => ({
  default: () => <div className="mocked-demo-toolbar"></div>,
}));

test("only shows error message when RequestStatus is FAILED", () => {
  const store = setupStore({
    status: RequestStatus.FAILED,
    error: "Test Error",
  });
  const { getByText, container } = render(
    <Provider store={store}>
      <Demo />,
    </Provider>,
  );

  expect(getByText("Test Error")).to.exist;
  expect(container.querySelector(".mocked-demo-toolbar")).to.not.exist;
});
