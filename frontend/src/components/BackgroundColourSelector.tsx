import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarBackgroundColour } from "../store/calendarSlice";
import { ReduxCalendarState } from "../store/stateTypes";
import { useParams } from "react-router-dom";
import { setIsTyping } from "../store/syncSlice";
import { CalendarData } from "../../../backend/types/calendarInterface";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const BackgroundColourSelector: React.FC = () => {
  const dispatch = useDispatch();
  const params: string | undefined = useParams().new;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calendarsArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarsArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendar: CalendarData = calendarsArray[calendarIndex];
  const bgColour = calendar?.backgroundColour;

  const typingResetTimer = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(setIsTyping(false));
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsTyping(true));
    const newColour = e.target.value;
    dispatch(
      setCalendarBackgroundColour({
        calendarIndex,
        newBackgroundColour: newColour,
      })
    );
    typingResetTimer(timerRef);
  };

  return (
    <Box sx={{ width: "50%", margin: "30px 0" }}>
      <TextField
        label="Background colour"
        type="color"
        onChange={handleChange}
        value={bgColour}
        fullWidth
      />
    </Box>
  );
};

export default BackgroundColourSelector;
