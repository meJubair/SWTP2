import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { setStartDate, setEndDate } from "../store/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsTyping } from "../store/syncSlice";
import { useParams } from "react-router-dom";
import { ReduxCalendarState } from "../store/stateTypes";

interface CalendarDate {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateSelectorProps {
  setDateArray: (newDateArray: Date[]) => void;
  dateArray: Date[];
}

const DateSelector: React.FC<DateSelectorProps> = ({
  setDateArray,
  dateArray,
}) => {
  const [date, setDate] = useState<CalendarDate>({
    startDate: null,
    endDate: null,
  });

  const params: string | undefined = useParams().new;
  const dispatch = useDispatch();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calendarArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendarStartDate = useSelector(
    (state: ReduxCalendarState) =>
      state.calendar.calendars[calendarIndex]?.startDate
  );

  const calendarEndDate = useSelector(
    (state: ReduxCalendarState) =>
      state.calendar.calendars[calendarIndex]?.endDate
  );

  // Create calendar doors based on the date range
  useEffect(() => {
    const createCalendarDoors = async () => {
      console.log("Date array:", dateArray.length);
    };

    if (dateArray.length > 0) {
      createCalendarDoors();
    }
  }, [dateArray]);

  // Set 1500ms timer after user has stopped typing and reset timer if user starts typing before timer has ended
  const typingResetTimer = (
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    // Reset the timer every time user starts typing
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start the timer to detect writing completion
    timerRef.current = setTimeout(() => {
      dispatch(setIsTyping(false));
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Start date:", date.startDate);
    console.log("End Date:", date.endDate);

    // Calculate the number of days between the start and end dates
    const dateRange: Date[] = [];

    const startDate = date.startDate || new Date();
    const endDate = date.endDate || startDate;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDateArray(dateRange);
  };

  const handleStartDateChange = async (selectedDate: Date | null) => {
    if (selectedDate) {
      // The date object is saved in the Redux store in Zulu time format (e.g. "2024-05-01T21:00:00.000Z")
      dispatch(setIsTyping(true));
      typingResetTimer(timerRef);
      dispatch(
        setStartDate({
          calendarIndex: calendarIndex,
          newStartDate: selectedDate.toISOString(),
        })
      );
      setDate((prevDate) => ({
        ...prevDate,
        startDate: selectedDate,
        endDate: null, // Reset end date when start date is changed
      }));
    }
  };

  const handleEndDateChange = async (selectedDate: Date | null) => {
    if (selectedDate) {
      dispatch(setIsTyping(true));
      typingResetTimer(timerRef);
      // Check if the selected end date is within the allowed range
      const endDate = new Date(selectedDate);
      const startDate = calendarStartDate || new Date(); // Set current date if start date is not set

      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(maxEndDate.getDate() + 30); // Set max end date to 31 days from start date

      if (endDate <= maxEndDate) {
        // The date object is saved in the Redux store in Zulu time format (e.g. "2024-05-01T21:00:00.000Z")
        dispatch(
          setEndDate({
            calendarIndex: calendarIndex,
            newEndDate: selectedDate.toISOString(),
          })
        );
        setDate((prevDate) => ({
          ...prevDate,
          endDate: selectedDate,
        }));
      }
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "300px",
        gap: "1rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DatePicker
            placeholderText={
              calendarStartDate !== ""
                ? new Date(calendarStartDate).toLocaleDateString()
                : "Start Date"
            }
            selected={date.startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Set minimum date to current date
            required
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            placeholderText={
              calendarEndDate !== ""
                ? new Date(calendarEndDate).toLocaleDateString()
                : "End Date"
            }
            selected={date.endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={calendarStartDate} // Set minimum date to start date
            maxDate={
              new Date(
                (calendarStartDate
                  ? new Date(calendarStartDate).getTime()
                  : new Date().getTime()) +
                  30 * 24 * 60 * 60 * 1000
              )
            } // Set max date to 31 days from start date
            required
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", mt: "1rem" }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "#0b2027", color: "#8affe8" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DateSelector;
