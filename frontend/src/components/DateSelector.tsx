import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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
      const startDate = date.startDate || new Date(); // Set current date if start date is not set

      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(maxEndDate.getDate() + 30); // Set max end date to 31 days from start date

      if (endDate <= maxEndDate) {
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
            placeholderText="Start Date"
            selected={date.startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Set minimum date to current date
            required
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            placeholderText="End Date"
            selected={date.endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={date.startDate} // Set minimum date to start date
            maxDate={
              new Date(
                (date.startDate || new Date()).getTime() +
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
