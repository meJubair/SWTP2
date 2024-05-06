import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarBackgroundColour } from "../store/calendarSlice";
import { ReduxCalendarState } from "../store/stateTypes";
import { useParams } from "react-router-dom";

const BackgroundColourSelector: React.FC<{
  onColorChange: (color: string) => void;
}> = ({ onColorChange }) => {
  const [bgColour, setBgColour] = useState<string>("#ffffff");

  const dispatch = useDispatch();
  const params: string | undefined = useParams().new;

  const calendarArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const handleChange = (color: any) => {
    const newColour = color.hex;
    setBgColour(newColour);
    onColorChange(newColour); // Pass the new colour to the EditorViewMain component
    dispatch(
      setCalendarBackgroundColour({
        calendarIndex,
        newBackgroundColour: newColour,
      })
    );
  };

  return <SketchPicker color={bgColour} onChange={handleChange} />;
};

export default BackgroundColourSelector;
