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
    setCalendarTitleColour: (state, action: PayloadAction<{calendarIndex: number, newTitleColour: string}>) => {
      const { calendarIndex, newTitleColour } = action.payload;
      state.calendars[calendarIndex].titleColour = newTitleColour;
    },
    setAuthorName: (state, action: PayloadAction<{calendarIndex: number, newAuthorName: string}>) => {
      const { calendarIndex, newAuthorName } = action.payload;
      state.calendars[calendarIndex].authorName = newAuthorName;
    },
    setAuthorNameColour: (state, action: PayloadAction<{calendarIndex: number, newAuthorNameColour: string}>) => {
      const { calendarIndex, newAuthorNameColour } = action.payload;
      state.calendars[calendarIndex].authorNameColour = newAuthorNameColour;
    },
    setStartDate: (state, action) => {
      const { calendarIndex, newStartDate } = action.payload;
      state.calendars[calendarIndex].startDate = newStartDate;
    },
    setEndDate: (state, action) => {
      const { calendarIndex, newEndDate } = action.payload;
      state.calendars[calendarIndex].endDate = newEndDate;
    },
    setCalendarTags: (state, action: PayloadAction<{calendarIndex: number, newTags: string[]}>) => {
      const { calendarIndex, newTags } = action.payload;
      state.calendars[calendarIndex].tags = newTags;
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

export const { setCalendars, setCalendarDoors, setCalendarTitle, setCalendarTitleColour, setAuthorName, setAuthorNameColour, setStartDate, setEndDate, setCalendarTags } = calendarSlice.actions;
export default calendarSlice.reducer;
