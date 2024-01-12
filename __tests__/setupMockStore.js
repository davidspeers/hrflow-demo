import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@stores/search/searchSlice";

export function setupMockStore() {
  const initialState = {
    search: {
      term: "",
      sortFilter: "CREATION_DATE",
      categoryFilters: [],
      jobs: [],
      page: 1,
      maxPage: 0,
      status: "IDLE",
      error: null,
    },
  };

  return configureStore({
    reducer: {
      search: searchReducer,
    },
    preloadedState: initialState,
  });
}
