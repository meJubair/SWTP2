import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarData } from "../../../backend/types/calendarInterface";

const Calendars = () => {
  const [calendars, setCalendars] = useState<CalendarData[]>([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      const response = await axios.get("http://localhost:3000/calendars");
      const data = response.data;
      setCalendars(data);
    };
    fetchCalendarData();
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 64px)" }}>
      <Typography variant="h1" sx={{ textAlign: "center", py: "1rem" }}>
        My calendars
      </Typography>
      <Box
        sx={{
          height: "75%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {calendars.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h2" sx={{ opacity: "60%" }}>
              No calendars found
            </Typography>
            <Link to="/editor">
              <Button color="secondary" variant="contained">
                create calendar
              </Button>
            </Link>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ width: "70%", maxWidth: "1000px" }}
          >
            <Table>
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                  backgroundColor: "secondary.main",
                }}
              >
                <TableRow sx={{ color: "red" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date Range</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Doors</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tags</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Publish status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calendars.map((calendar) => (
                  <TableRow key={calendar.title}>
                    <TableCell>{calendar.title}</TableCell>
                    <TableCell>
                      {calendar.startDate} - {calendar.endDate}
                    </TableCell>
                    <TableCell>{calendar.calendarDoors.length}</TableCell>
                    <TableCell>{calendar.tags.join(", ")}</TableCell>
                    <TableCell>
                      {calendar.published ? "Published" : "Unpublished"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Calendars;
