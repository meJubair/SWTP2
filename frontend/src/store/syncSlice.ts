import { createSlice } from "@reduxjs/toolkit";

const syncSlice = createSlice({
  name: "syncSlice",
  initialState: {
    isTyping: false,
  },
  reducers: {
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
});

export const { setIsTyping } = syncSlice.actions;
export default syncSlice.reducer;
