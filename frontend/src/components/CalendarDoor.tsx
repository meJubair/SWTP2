import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

interface CalendarDoorProps {
  doorId: number;
}

const CalendarDoor: React.FC<CalendarDoorProps> = ({ doorId }) => {
  return (
    <Box sx={{ background: "#d9d9d9", padding: "20px", borderRadius: "5px" }}>
      {doorId}
      <Link to={`${doorId}`}>
        <Typography onClick={() => console.log("Door index:", doorId)}>
          Edit
        </Typography>
      </Link>
    </Box>
  );
};

export default CalendarDoor;
