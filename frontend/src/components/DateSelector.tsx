import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { setStartDate, setEndDate } from "../store/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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

  const dispatch = useDispatch();
  const calendarLocation = useLocation().state;

  const calendarStartDate = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars[0]?.startDate
  );

  const calendarEndDate = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars[0]?.endDate
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

  const handleStartDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      // The date object is saved in the Redux store in Zulu time format (e.g. "2024-05-01T21:00:00.000Z")
      dispatch(
        setStartDate({
          calendarIndex: calendarLocation?.index,
          newStartDate: selectedDate,
        })
      );
      setDate((prevDate) => ({
        ...prevDate,
        startDate: selectedDate,
        endDate: null, // Reset end date when start date is changed
      }));
    }
  };

  const handleEndDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      // Check if the selected end date is within the allowed range
      const endDate = new Date(selectedDate);
      const startDate = calendarStartDate || new Date(); // Set current date if start date is not set

      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(maxEndDate.getDate() + 30); // Set max end date to 31 days from start date

      if (endDate <= maxEndDate) {
        // The date object is saved in the Redux store in Zulu time format (e.g. "2024-05-01T21:00:00.000Z")
        dispatch(
          setEndDate({
            calendarIndex: calendarLocation?.index,
            newEndDate: selectedDate,
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
        padding: "1rem 0",
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
      <Box sx={{ textAlign: "center", margin: "20px 0 0" }}>
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
