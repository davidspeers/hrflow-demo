import { render } from "@testing-library/react";
import { setupStore } from "@tests/setupStore";
import SortFilter from "@types/SortFilter";
import RequestStatus from "@types/requestStatus";
import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";
import DemoSearchResults from "./DemoSearchResults";

vi.mock("./DemoSearchResultItem", () => ({
  default: ({ name }) => <div className="mocked-demo-item">{name}</div>,
}));

describe("Loading Results", () => {
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
    const resultItemsLength = 5;
    const store = setupStore({
      status: RequestStatus.SUCCESS,
      sortFilter: SortFilter.CUSTOM,
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

  test("shows no results message when RequestStatus is SUCCESS and no jobs are returned", () => {
    const store = setupStore({
      status: RequestStatus.SUCCEEDED,
      jobs: [],
    });
    const { getByText } = render(
      <Provider store={store}>
        <DemoSearchResults />,
      </Provider>,
    );

    expect(getByText("No jobs found.")).to.exist;
  });
});

describe("Sorting Results", () => {
  const jobs = [
    { id: 2, name: "job2", category: "category2", creationDate: "2021-01-01" },
    { id: 1, name: "job3", category: "category3", creationDate: "2021-01-02" },
    { id: 3, name: "job1", category: "category1", creationDate: "2021-01-03" },
  ];

  Object.values(SortFilter).forEach((sortFilter) => {
    test(`sorts jobs by ${sortFilter}`, () => {
      const store = setupStore({
        status: RequestStatus.SUCCEEDED,
        sortFilter,
        jobs,
      });
      const { container } = render(
        <Provider store={store}>
          <DemoSearchResults />,
        </Provider>,
      );

      const resultItemElements =
        container.querySelectorAll(".mocked-demo-item");
      const resultItemTexts = Array.from(resultItemElements).map(
        (el) => el.textContent,
      );

      const expectedOrderedJobs = {
        [SortFilter.CUSTOM]: ["job2", "job3", "job1"],
        [SortFilter.CATEGORY]: ["job1", "job2", "job3"],
        [SortFilter.CREATION_DATE]: ["job1", "job3", "job2"],
        [SortFilter.NAME]: ["job1", "job2", "job3"],
      }[sortFilter];
      expect(resultItemTexts).toEqual(expectedOrderedJobs);
    });
  });
});

describe("Filtering Results", () => {
  const jobs = [
    { id: 2, name: "job2", category: "category2", creationDate: "2021-01-01" },
    { id: 1, name: "job3", category: "category3", creationDate: "2021-01-02" },
    { id: 3, name: "job1", category: "category1", creationDate: "2021-01-03" },
  ];

  [
    { categoryFilters: [], expectedJobs: ["job2", "job3", "job1"] },
    { categoryFilters: ["category1"], expectedJobs: ["job1"] },
    {
      categoryFilters: ["category1", "category2"],
      expectedJobs: ["job2", "job1"],
    },
    {
      categoryFilters: ["category1", "category2", "category3"],
      expectedJobs: ["job2", "job3", "job1"],
    },
  ].forEach(({ categoryFilters, expectedJobs }) => {
    test(
      categoryFilters.length
        ? `filters jobs when active filters are ${categoryFilters}`
        : "does not filter when no filters are active",
      () => {
        const store = setupStore({
          status: RequestStatus.SUCCEEDED,
          categoryFilters,
          jobs,
          sortFilter: SortFilter.CUSTOM,
        });
        const { container } = render(
          <Provider store={store}>
            <DemoSearchResults />,
          </Provider>,
        );

        const resultItemElements =
          container.querySelectorAll(".mocked-demo-item");
        const resultItemTexts = Array.from(resultItemElements).map(
          (el) => el.textContent,
        );
        expect(resultItemTexts).toEqual(expectedJobs);
      },
    );
  });

  test("filters jobs by searchTerm", () => {
    const store = setupStore({
      status: RequestStatus.SUCCEEDED,
      term: "1",
      jobs,
      sortFilter: SortFilter.CUSTOM,
    });
    const { container } = render(
      <Provider store={store}>
        <DemoSearchResults />,
      </Provider>,
    );

    const resultItemElements = container.querySelectorAll(".mocked-demo-item");
    const resultItemTexts = Array.from(resultItemElements).map(
      (el) => el.textContent,
    );
    expect(resultItemTexts).toEqual(["job1"]);
  });
});
