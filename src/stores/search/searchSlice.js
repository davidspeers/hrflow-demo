import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    results: [],
  },
  reducers: {
    updateTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const { updateTerm } = searchSlice.actions;

export default searchSlice.reducer;
