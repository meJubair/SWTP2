import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    severity: "",
    message: "",
    isVisible: false,
  },
  reducers: {
    setAlert: (state, action) => {
      const { severity, message, isVisible } = action.payload;
      state.severity = severity;
      state.message = message;
      state.isVisible = isVisible;
    },
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});
export const { setAlert, setIsVisible } = alertSlice.actions;
export default alertSlice.reducer;
