import client from "@api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getCategoryFromJob from "@types/getCategoryFromJob";
import Status from "@types/requestStatus";
import SortCategory from "@types/sortCategory";

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
    sortCategory: SortCategory.CREATION_DATE,
    jobs: [],
    status: Status.IDLE,
    error: null,
  },
  reducers: {
    updateTerm: (state, action) => {
      state.term = action.payload;
    },
    updateSortCategory: (state, action) => {
      state.sortCategory = action.payload;
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

export const { updateTerm, updateSortCategory } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchTerm = (state) => state.search.term;

export const selectSortCategory = (state) => state.search.sortCategory;

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
  const sortCategory = selectSortCategory(state);
  switch (sortCategory) {
    case SortCategory.CREATION_DATE:
      return jobs.sort((a, b) => a.createdAt - b.createdAt);
    case SortCategory.NAME:
      return jobs.sort((a, b) => a.name.localeCompare(b.name));
    case SortCategory.CATEGORY:
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
