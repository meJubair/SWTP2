import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import userReducer from "./userSlice";
import syncReducer from "./syncSlice";
import alertReducer from "./alertSlice";

export default configureStore({
  reducer: {
    calendar: calendarReducer,
    user: userReducer,
    sync: syncReducer,
    alert: alertReducer,
  },
});
