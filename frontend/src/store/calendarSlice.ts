import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarData } from "../../../backend/types/calendarInterface";

interface CalendarState {
  calendars: CalendarData[];
}

const initialState: CalendarState = {
  calendars: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendars: (state, action) => {
      state.calendars = action.payload;
    },
    setCalendarTitle: (state, action: PayloadAction<{calendarIndex: number, newTitle: string}>) => {
      const { calendarIndex, newTitle } = action.payload;
      state.calendars[calendarIndex].title = newTitle;
    },
    setAuthorName: (state, action: PayloadAction<{calendarIndex: number, newAuthorName: string}>) => {
      const { calendarIndex, newAuthorName } = action.payload;
      state.calendars[calendarIndex].authorName = newAuthorName;
    },
    setStartDate: (state, action) => {
      const { calendarIndex, newStartDate } = action.payload;
      state.calendars[calendarIndex].startDate = newStartDate;
    },
    setEndDate: (state, action) => {
      const { calendarIndex, newEndDate } = action.payload;
      state.calendars[calendarIndex].endDate = newEndDate;
    },
    setCalendarDoors: (state, action) => {
      state.calendars = state.calendars.map((calendar: CalendarData) => {
        if (calendar.title === action.payload.title) {
          return {
            ...calendar,
            calendarDoors: action.payload.calendarDoors,
          };
        }
        return calendar;
      });
    },    
  },
});

export const { setCalendars, setCalendarDoors, setCalendarTitle, setAuthorName, setStartDate, setEndDate } = calendarSlice.actions;
export default calendarSlice.reducer;
