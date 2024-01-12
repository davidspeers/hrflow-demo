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

const _getErrorMessage = (response) => {
  console.log({ response2: response });
  if (response === "400") {
    return "Access Denied: Please check your credentials.";
  } else if (response === "404") {
    return "Failed to find any jobs. Please try again later.";
  } else if (response === "500") {
    return "Something went wrong on our side. Please try again later.";
  } else {
    return "Unexpected error: Please try again later.";
  }
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
        state.status = Status.FAILED;
        state.error = _getErrorMessage(action.error.message);
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

export const selectAllJobs = (state) => {
  const jobs = [...state.search.jobs];
  const sortFilter = state.search.sortFilter;
  switch (sortFilter) {
    case SortFilter.CREATION_DATE:
      return jobs.sort((a, b) => b.creationDate.localeCompare(a.creationDate));
    case SortFilter.NAME:
      return jobs.sort((a, b) => a.name.localeCompare(b.name));
    case SortFilter.CATEGORY:
      return jobs.sort((a, b) => {
        return a.category === "N/A"
          ? 1
          : b.category === "N/A"
            ? -1
            : a.category.localeCompare(b.category);
      });
    default:
      return jobs;
  }
};

export const selectPage = (state) => state.search.page;

export const selectMaxPage = (state) => state.search.maxPage;

export const selectRequestStatus = (state) => state.search.status;

export const selectErrorMessage = (state) => state.search.error;
