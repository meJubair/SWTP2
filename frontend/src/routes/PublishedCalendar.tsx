import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getPublishedCalendar } from "../services/publishService";
import {
  CalendarData,
  DoorData,
} from "../../../backend/types/calendarInterface";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";

const PublishedCalendar: React.FC = () => {
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [doorTitle, setDoorTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const params = useParams();
  const uid = params?.uid as string;
  const calendarId = params?.calendarId as string;

  // Get published calendar data from Firebase database
  useEffect(() => {
    const fetchCalendarData = async () => {
      const response = await getPublishedCalendar(uid, calendarId);
      const data = response.data as CalendarData;
      setCalendar(data);
    };
    fetchCalendarData();
  }, [uid, calendarId]);

  const handleClick = (door: any) => {
    setIsOpen(true);
    setOpenModal(true);
    setDoorTitle(`${door?.title?.textContent}`);
    setDescription(`${door?.description?.textContent}`);
    setImage(`${door?.backgroundImageFileDownloadUrl}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {openModal && (
        <Modal
          image={image}
          titleText={doorTitle}
          dialogText={description}
          open={openModal}
          onCancel={handleCloseModal}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          background: calendar?.backgroundColour,
          padding: "1rem",
          my: "20px",
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
                background: isOpen ? door?.doorBackgroundColour : "none",
                backgroundImage: isOpen ? image : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleClick(door)}
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
