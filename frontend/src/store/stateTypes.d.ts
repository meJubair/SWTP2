import CalendarData from "../../../backend/types/calendarInterface";

interface ReduxUserState {
  user: {
    userLoggedIn: boolean;
    uid: string;
    userName: string;
  };
}

interface ReduxCalendarState {
  calendar: {
    calendars: CalendarData[];
  };
}

interface ReduxSyncState {
  sync: {
    isTyping: boolean;
    saved: boolean;
  };
}

interface ReduxAlertState {
  alert: {
    severity: "success" | "info" | "warning" | "error";
    message: string;
    isVisible: false;
  };
}

export { ReduxUserState, ReduxCalendarState, ReduxSyncState, ReduxAlertState };
