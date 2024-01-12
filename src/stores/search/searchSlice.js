import client from "@api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCategoryFromJob from "@types/getCategoryFromJob";
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

export const { updateTerm, updateSortFilter } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state) => state.search.term;

export const selectSortFilter = (state) => state.search.sortFilter;

const selectAllJobs = (state) => state.search.jobs;

const selectAllJobsByTerm = (state) => {
  const jobs = selectAllJobs(state);
  const term = state.search.term.toLowerCase();
  return jobs.filter((job) => {
    return job.name.toLowerCase().includes(term);
  });
};

export const selectAllJobsByTermAndSorted = (state) => {
  const jobs = selectAllJobsByTerm(state);
  const sortFilter = selectSortFilter(state);
  switch (sortFilter) {
    case SortFilter.CREATION_DATE:
      return jobs.sort((a, b) => a.createdAt - b.createdAt);
    case SortFilter.NAME:
      return jobs.sort((a, b) => a.name.localeCompare(b.name));
    case SortFilter.CATEGORY:
      return jobs.sort((a, b) => {
        const categoryA = getCategoryFromJob(a);
        const categoryB = getCategoryFromJob(b);
        if (categoryA === "N/A") return 1;
        if (categoryB === "N/A") return -1;
        return categoryA === "N/A"
          ? 1
          : categoryB === "N/A"
            ? -1
            : categoryA.localeCompare(categoryB);
      });
    default:
      return jobs;
  }
};
