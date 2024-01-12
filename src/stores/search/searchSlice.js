import client from "@api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Status from "./searchStatus";

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async () => {
    return await client.getJobsFromBoard("engineer");
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    results: [],
    status: Status.IDLE,
    error: null,
  },
  reducers: {
    updateTerm: (state, action) => {
      state.term = action.payload;
    },
    addResults: (state, action) => {
      state.results = action.payload;
    },
    resetResults: (state) => {
      state.results = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = Status.SUCCEEDED;
        state.results = state.results.concat(action.payload);
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = Status;
        state.error = action.error.message;
      });
  },
});

export const { updateTerm, addResults, resetResults } = searchSlice.actions;

export default searchSlice.reducer;

export const selectAllResults = (state) => state.search.results;
