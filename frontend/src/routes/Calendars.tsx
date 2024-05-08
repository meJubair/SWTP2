import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalendars } from "../store/calendarSlice";
import { ReduxCalendarState, ReduxUserState } from "../store/stateTypes";
import {
  getUserCalendarData,
  createNewCalendar,
  removeCalendar,
} from "../services/calendarService";

const Calendars = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendars = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );
  const uid = useSelector((state: ReduxUserState) => state.user.uid);

  // Fetch user calendars from database and update the data in the Redux store
  useEffect(() => {
    const fetchCalendarData = async () => {
      const response = await getUserCalendarData(uid);
      if (response && response.status === 200) {
        const data = response.data;
        dispatch(setCalendars(data));
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, [dispatch]);

  // Create a new calendar instance in the database and redirect the user into calendars/calendarId
  const handleCreateCalendar = async (uid: string) => {
    try {
      setLoading(true);
      const response = await createNewCalendar(uid);
      if (response && response.status === 200) {
        // Update the Redux state with the newly created calendar instance
        dispatch(setCalendars([...calendars, response.data]));
        setLoading(false);
        navigate(`${response.data.calendarId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCalendar = async (uid: string, calendarId: string) => {
    try {
      setLoading(true);
      // Remove calendar from database
      await removeCalendar(uid, calendarId);
      // Remove calendar from Redux state
      dispatch(
        setCalendars(
          calendars.filter((calendar) => calendar.calendarId !== calendarId)
        )
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
                  <TableCell />
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
                      {calendar?.startDate
                        ? new Date(calendar.startDate).toLocaleDateString()
                        : ""}{" "}
                      -{" "}
                      {calendar?.endDate
                        ? new Date(calendar.endDate).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell>{calendar.calendarDoors.length}</TableCell>
                    <TableCell>{calendar.tags.join(", ")}</TableCell>
                    <TableCell>
                      {calendar.published ? "Published" : "Unpublished"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleDeleteCalendar(uid, calendar.calendarId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button
          sx={{ margin: "20px 0" }}
          color="secondary"
          variant="contained"
          onClick={() => handleCreateCalendar(uid)}
        >
          create calendar
        </Button>
      </Box>
    </Box>
  );
};

export default Calendars;
