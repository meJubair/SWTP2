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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendars } from "../store/calendarSlice";
import { ReduxCalendarState, ReduxUserState } from "../store/stateTypes";
import { getUserCalendarData } from "../services/calendarService";

const Calendars = () => {
  const dispatch = useDispatch();
  const calendars = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );
  const uid = useSelector((state: ReduxUserState) => state.user.uid);

  useEffect(() => {
    const fetchCalendarData = async () => {
      const response = await getUserCalendarData(uid);
      if (response && response.status === 200) {
        const data = response.data;
        dispatch(setCalendars(data));
      }
    };
    fetchCalendarData();
  }, [dispatch, uid]);

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
                {calendars.map((calendar, i) => (
                  <TableRow key={calendar.calendarId}>
                    <TableCell>
                      <Link
                        to={`/calendars/${calendar.calendarId}`}
                        state={{ calendar: calendar, index: i }}
                      >
                        {calendar.title ? calendar.title : "Untitled calendar"}
                      </Link>
                    </TableCell>

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
        <Link to="/calendars/newcalendar" style={{ margin: "20px 0" }}>
          <Button color="secondary" variant="contained">
            create calendar
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Calendars;
