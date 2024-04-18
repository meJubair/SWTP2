import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

interface CalendarDoorProps {
  value: Date;
  dateArray: Date[];
}

const CalendarDoor: React.FC<CalendarDoorProps> = ({ value, dateArray }) => {
  const doorId = dateArray.indexOf(value);

  return (
    <Box sx={{ background: "#d9d9d9", padding: "20px", borderRadius: "5px" }}>
      {value.toLocaleDateString()}
      <Link to={`${doorId + 1}`}>
        <Box onClick={() => console.log("Door index:", doorId)}>Edit</Box>
      </Link>
    </Box>
  );
};

export default CalendarDoor;
