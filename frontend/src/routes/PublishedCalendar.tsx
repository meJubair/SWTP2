import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getPublishedCalendar } from "../services/publishService";
import {
  CalendarData,
  DoorData,
} from "../../../backend/types/calendarInterface";
import { useParams } from "react-router-dom";

const PublishedCalendar: React.FC = () => {
  const [calendar, setCalendar] = useState<CalendarData | null>(null);

  const params = useParams();
  const uid = params?.uid as string;
  const calendarId = params?.calendarId as string;

  // Get published calendar data from Firebase database
  useEffect(() => {
    const fetchCalendarData = async () => {
      const response = await getPublishedCalendar(uid, calendarId);
      const data = response.data as CalendarData;
      setCalendar(data);
      console.log("data", data);
    };
    fetchCalendarData();
  }, [uid, calendarId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          background: calendar?.backgroundColour,
          padding: "1rem",
          mb: "50px",
          height: "800px",
          border: "1px solid black",
          borderRadius: "5px",
          backgroundImage: calendar?.backgroundUrl
            ? `url(${calendar?.backgroundUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            color: calendar?.titleColour,
            fontSize: "2rem",
            margin: "0",
            fontWeight: "bold",
          }}
        >
          {calendar?.title === "" ? "Title" : calendar?.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: calendar?.authorNameColour }}
        >
          {calendar?.authorName ? `By ${calendar?.authorName}` : "Author name"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
            margin: "40px 0 0",
          }}
        >
          {calendar?.calendarDoors?.map((door: DoorData) => (
            <Box
              key={door?.doorNumber}
              sx={{
                padding: "20px",
                border: "1px dashed #0b2027",
                width: "100px",
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {door?.doorNumber}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PublishedCalendar;
