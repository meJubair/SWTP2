import React, { useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
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

const BackgroundColourSelector: React.FC<{
  onColorChange: (color: string) => void;
}> = ({ onColorChange }) => {
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

  const bgColour = calendarsArray[calendarIndex].backgroundColour;

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

  const handleChange = (color: any) => {
    dispatch(setIsTyping(true));
    const newColour = color.hex;
    onColorChange(newColour); // Pass the new colour to the EditorViewMain component
    dispatch(
      setCalendarBackgroundColour({
        calendarIndex,
        newBackgroundColour: newColour,
      })
    );
    typingResetTimer(timerRef);
  };

  return <SketchPicker color={bgColour} onChange={handleChange} />;
};

export default BackgroundColourSelector;
