import React from "react";
import Box from "@mui/material/Box";

interface CalendarDoorProps {
  value: Date;
}

const CalendarDoor: React.FC<CalendarDoorProps> = ({ value }) => {
  return (
    <Box sx={{ background: "#d9d9d9", padding: "20px", borderRadius: "5px" }}>
      {value.toLocaleDateString()}
    </Box>
  );
};

export default CalendarDoor;
