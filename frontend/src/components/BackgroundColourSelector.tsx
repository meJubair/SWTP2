import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarBackgroundColour } from "../store/calendarSlice";
import {
  ReduxCalendarState,
  ReduxSyncState,
  ReduxUserState,
} from "../store/stateTypes";
import { useParams } from "react-router-dom";
import { setIsTyping, setSaved } from "../store/syncSlice";
import { CalendarData } from "../../../backend/types/calendarInterface";
import { updateCalendarObject } from "../services/calendarService";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const BackgroundColourSelector: React.FC = () => {
  const dispatch = useDispatch();
  const params: string | undefined = useParams().new;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isTyping = useSelector((state: ReduxSyncState) => state.sync.isTyping);
  const uid = useSelector((state: ReduxUserState) => state.user.uid);

  const calendarsArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarsArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendar: CalendarData = calendarsArray[calendarIndex];
  const calendarId = calendar?.calendarId;

  const bgColour = calendarsArray[calendarIndex]?.backgroundColour;

  useEffect(() => {
    const saveData = async () => {
      if (!isTyping) {
        await handleSave();
      }
    };
    saveData();
  }, [isTyping]);

  const handleSave = async () => {
    dispatch(setSaved(false));

    try {
      await updateCalendarObject(uid, calendarId, calendar);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSaved(true));
    }
  };

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
