import { CalendarData } from "./calendarInterface";

// Return an array of keys of CalendarData interface
const getCalendarDataKeys = (): (keyof CalendarData)[] => {
  return [
    "calendarId",
    "title",
    "titleColour",
    "authorName",
    "authorNameColour",
    "startDate",
    "endDate",
    "published",
    "tags",
    "backgroundUrl",
    "backgroundColour",
    "calendarDoors",
  ];
};

export { getCalendarDataKeys };
