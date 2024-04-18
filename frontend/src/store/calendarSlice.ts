import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    calendars: [],
  },
  reducers: {
    setCalendars: (state, action) => {
      state.calendars = action.payload;
    },
  },
});

export const { setCalendars } = calendarSlice.actions;
export default calendarSlice.reducer;
