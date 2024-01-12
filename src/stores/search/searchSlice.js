import client from "@api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "@types/requestStatus";
import SortFilter from "@types/sortFilter";

export const fetchJobResults = createAsyncThunk(
  "search/fetchJobResults",
  async () => {
    return await client.getJobsFromBoard();
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    sortFilter: SortFilter.CREATION_DATE,
    categoryFilters: [],
    jobs: [],
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
    },
    removeFromCategoryFilters: (state, action) => {
      state.categoryFilters = state.categoryFilters.filter(
        (category) => category !== action.payload,
      );
    },
    resetCategoryFilters: (state) => {
      state.categoryFilters = [];
    },
    updateJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJobResults.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchJobResults.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.jobs = state.jobs = action.payload;
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
  updateJobs,
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state) => state.search.term;

export const selectSortFilter = (state) => state.search.sortFilter;

export const selectCategoryFilters = (state) => state.search.categoryFilters;

const selectAllJobs = (state) => state.search.jobs;

const selectAllJobsByTerm = (state) => {
  const jobs = selectAllJobs(state);
  const term = state.search.term.toLowerCase();
  return jobs.filter((job) => {
    return job.name.toLowerCase().includes(term);
  });
};

const selectAllJobsByTermAndSorted = (state) => {
  const jobs = selectAllJobsByTerm(state);
  const sortFilter = selectSortFilter(state);
  switch (sortFilter) {
    case SortFilter.CREATION_DATE:
      return jobs.sort((a, b) => a.creationDate - b.creationDate);
    case SortFilter.NAME:
      return jobs.sort((a, b) => a.name.localeCompare(b.name));
    case SortFilter.CATEGORY:
      return jobs.sort((a, b) => {
        if (a.category === "N/A") return 1;
        if (b.category === "N/A") return -1;
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

export const selectAllJobsByTermAndSortedAndFiltered = (state) => {
  const jobs = selectAllJobsByTermAndSorted(state);
  const categoryFilters = selectCategoryFilters(state);
  if (categoryFilters.length === 0) return jobs;
  return jobs.filter((job) => {
    console.log(job);
    console.log(categoryFilters);
    return categoryFilters
      .map((filter) => filter.toLowerCase())
      .includes(job.category.toLowerCase());
  });
};
