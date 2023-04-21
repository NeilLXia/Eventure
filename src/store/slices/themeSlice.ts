import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    colors: {
      white: "slate-100",
      whitehex: "#f1f5f9",
      grey: "slate-400",
      greyhex: "#94a3b8",
      text: "slate-700",
      texthex: "#334155",
    },
  },
  reducers: {},
});

export default themeSlice.reducer;
