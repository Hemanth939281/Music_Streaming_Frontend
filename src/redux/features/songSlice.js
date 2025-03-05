import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: null,
  },
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { setSongs } = songSlice.actions;
export default songSlice.reducer;
