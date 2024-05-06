import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ReduxCalendarState } from "../store/stateTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CalendarTagsProps {
  removeTag: (tag: string) => void;
}

const CalendarTags: React.FC<CalendarTagsProps> = ({ removeTag }) => {
  const params: string | undefined = useParams().new;

  const calendarArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendar = calendarArray[calendarIndex];

  const calendarTags = calendar?.tags;

  return (
    <Box display="flex">
      {}
      {calendarTags.map((tag: string, index: number) => (
        <Box
          key={index}
          sx={{
            background: "#0b2027",
            color: "#8affe8",
            padding: "10px",
            borderRadius: "5px",
            margin: "5px",
            display: "flex",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "15px",
              height: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => removeTag(tag)}
          >
            <Typography>x</Typography>
          </Box>
          <Typography sx={{ textTransform: "capitalize" }}>
            {calendarTags[index]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CalendarTags;
