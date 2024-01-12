import client from "@api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "@types/requestStatus";
import SortFilter from "@types/sortFilter";

export const fetchJobResults = createAsyncThunk(
  "search/fetchJobResults",
  async ({ page }) => {
    return await client.getJobsFromBoard(page);
  },
);

const updateCategoryFiltersInLocalStorage = (categoryFilters) => {
  localStorage.setItem("categoryFilters", JSON.stringify(categoryFilters));
};

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    sortFilter: SortFilter.CREATION_DATE,
    categoryFilters: JSON.parse(localStorage.getItem("categoryFilters")) || [],
    jobs: [],
    page: 1,
    maxPage: 0,
    status: Status.IDLE,
    error: null,
  },
  reducers: {
    updateTerm: (state, action) => {
      state.term = action.payload;
    },
    updateSortFilter: (state, action) => {
      state.sortFilter = action.payload;
      const jobs = state.jobs;
      const sortFilter = state.sortFilter;
      switch (sortFilter) {
        case SortFilter.CREATION_DATE:
          state.jobs = jobs.sort((a, b) =>
            b.creationDate.localeCompare(a.creationDate),
          );
          break;
        case SortFilter.NAME:
          state.jobs = jobs.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case SortFilter.CATEGORY:
          state.jobs = jobs.sort((a, b) => {
            if (a.category === "N/A") return 1;
            if (b.category === "N/A") return -1;
            return a.category === "N/A"
              ? 1
              : b.category === "N/A"
                ? -1
                : a.category.localeCompare(b.category);
          });
          break;
      }
    },
    addToCategoryFilters: (state, { payload }) => {
      if (!state.categoryFilters.includes(payload)) {
        state.categoryFilters = [...state.categoryFilters, payload].sort();
      }
      updateCategoryFiltersInLocalStorage(state.categoryFilters);
    },
    removeFromCategoryFilters: (state, action) => {
      state.categoryFilters = state.categoryFilters.filter(
        (category) => category !== action.payload,
      );
      updateCategoryFiltersInLocalStorage(state.categoryFilters);
    },
    resetCategoryFilters: (state) => {
      state.categoryFilters = [];
      updateCategoryFiltersInLocalStorage(state.categoryFilters);
    },
    updateJobPosition: (state, action) => {
      const reorderedJobs = Array.from(state.jobs);
      const [removed] = reorderedJobs.splice(action.payload.oldPosition, 1);
      reorderedJobs.splice(action.payload.newPosition, 0, removed);
      state.jobs = reorderedJobs;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJobResults.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchJobResults.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.jobs = action.payload.jobs;
        state.page = action.payload.meta.page;
        state.maxPage = action.payload.meta.maxPage;
      })
      .addCase(fetchJobResults.rejected, (state, action) => {
        state.status = Status;
        state.error = action.error.message;
      });
  },
});

export const {
  updateTerm,
  updateSortFilter,
  addToCategoryFilters,
  removeFromCategoryFilters,
  resetCategoryFilters,
  updateJobPosition,
  incrementPage,
  decrementPage,
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state) => state.search.term;

export const selectSortFilter = (state) => state.search.sortFilter;

export const selectCategoryFilters = (state) => state.search.categoryFilters;

export const selectAllJobs = (state) => state.search.jobs;

export const selectPage = (state) => state.search.page;

export const selectMaxPage = (state) => state.search.maxPage;
