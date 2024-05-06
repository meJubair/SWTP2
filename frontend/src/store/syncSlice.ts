import { createSlice } from "@reduxjs/toolkit";

const syncSlice = createSlice({
  name: "syncSlice",
  initialState: {
    isTyping: false,
    saved: true
  },
  reducers: {
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setSaved: (state,action) => {
        state.saved = action.payload
    }
  },
});

export const { setIsTyping, setSaved } = syncSlice.actions;
export default syncSlice.reducer;
