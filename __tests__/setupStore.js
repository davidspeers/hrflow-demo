import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import SortFilter from "@types/SortFilter";

export const initialSearchState = {
  term: "",
  sortFilter: SortFilter.CREATION_DATE,
  categoryFilters: [],
  jobs: [],
  page: 1,
  maxPage: 0,
  status: RequestStatus.IDLE,
  error: null,
};

export function setupStore(initialSearchStateOverrides = {}) {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
    preloadedState: {
      search: {
        ...initialSearchState,
        ...initialSearchStateOverrides,
      },
    },
  });
}
