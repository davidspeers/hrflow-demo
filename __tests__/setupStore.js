import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import SortFilter from "@types/SortFilter";

export const initialState = {
  search: {
    term: "",
    sortFilter: SortFilter.CREATION_DATE,
    categoryFilters: [],
    jobs: [],
    page: 1,
    maxPage: 0,
    status: RequestStatus.IDLE,
    error: null,
  },
};

export function setupStore(initialStateOverrides = {}) {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
    preloadedState: {
      ...initialState,
      ...initialStateOverrides,
    },
  });
}
