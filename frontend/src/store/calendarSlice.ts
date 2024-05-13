import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarData, DoorData } from "../../../backend/types/calendarInterface";

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
    setCalendarBackgroundUrl: (state, action: PayloadAction<{calendarIndex: number, newBackgroundUrl: string}>) => {
      const { calendarIndex, newBackgroundUrl } = action.payload;
      state.calendars[calendarIndex].backgroundUrl = newBackgroundUrl;
    },
    setCalendarBackgroundColour: (state, action: PayloadAction<{calendarIndex: number, newBackgroundColour: string}>) => {
      const { calendarIndex, newBackgroundColour } = action.payload;
      state.calendars[calendarIndex].backgroundColour = newBackgroundColour;
    },
    setCalendarDoors: (state, action: PayloadAction<{calendarIndex: number, newDoors: DoorData[]}>) => {
      const { calendarIndex, newDoors } = action.payload;
      state.calendars[calendarIndex].calendarDoors = newDoors;
    }  
  },
});

export const { setCalendars, setCalendarDoors, setCalendarTitle, setCalendarTitleColour, setAuthorName, setAuthorNameColour, setStartDate, setEndDate, setCalendarTags, setCalendarBackgroundUrl, setCalendarBackgroundColour } = calendarSlice.actions;
export default calendarSlice.reducer;
