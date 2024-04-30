import { CalendarData } from "./calendarInterface";

// Return an array of keys of CalendarData interface
const getCalendarDataKeys = (): (keyof CalendarData)[] => {
  return [
    "calendarId",
    "title",
    "authorName",
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
