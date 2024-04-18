import CalendarData from "../../../backend/types/calendarInterface"

interface ReduxUserState {
  user: {
    userLoggedIn: boolean;
    uid: string;
    userName: string;
  };
}

interface ReduxCalendarState {
  calendar: {
    calendars: CalendarData[]
  }
}

export { ReduxUserState, ReduxCalendarState }