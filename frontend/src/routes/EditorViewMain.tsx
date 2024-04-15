import React, { useState } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateSelector from "../components/DateSelector";

const EditorViewMain: React.FC = () => {
  const [calendarTitle, setCalendarTitle] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [dateArray, setDateArray] = useState<Date[]>([]);

  // The logic to update the dateArray state is passed down to the DateSelector component
  const handleSetDateArray = (newDateArray: Date[]) => {
    setDateArray(newDateArray);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalendarTitle(e.target.value);
    setIsTyping(true);

    // Timeout to check if user is still typing
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const calendarOptions = [
    { id: 1, name: "Date" },
    { id: 2, name: "Background color" },
    { id: 3, name: "Upload image" },
  ];

  const handleClick = (optionName: string) => {
    setActiveOption(optionName === activeOption ? null : optionName);

    if (optionName === "Date") {
      setShowDatePicker(true);
    }

    if (optionName === "Background color") {
      setShowDatePicker(false);
    }

    if (optionName === "Upload image") {
      setShowDatePicker(false);
    }
  };

  return (
    <Box>
      <Header />
      <Box component="h2" sx={{ textAlign: "center" }}>
        {isTyping ? "Typing..." : calendarTitle}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Calendar title"
          value={calendarTitle}
          onChange={handleChange}
        />
        <Typography variant="h3" sx={{ margin: "30px 0 5px" }}>
          Calendar Options
        </Typography>
        <Box
          sx={{
            background: "#70a9a1",
            width: "80%",
            padding: "0 50px",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: "1px dotted black",
            }}
          >
            {calendarOptions?.map((option) => (
              <Box
                key={option?.id}
                sx={{
                  cursor: "pointer",
                  padding: "20px 0 10px",
                  color: activeOption === option?.name ? "#0b2027" : "white",
                  fontWeight: activeOption === option?.name ? "bold" : "normal",
                }}
                onClick={() => handleClick(option?.name)}
              >
                {option?.name}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px 0",
              width: "100%",
            }}
          >
            {showDatePicker && (
              <DateSelector
                setDateArray={handleSetDateArray}
                dateArray={dateArray}
              />
            )}
          </Box>
        </Box>
        {dateArray?.length > 0 && (
          <Box sx={{ display: "flex", gap: "20px", margin: "20px 0" }}>
            {dateArray?.map((date) => (
              <Box key={date.getDate()}>{date.toLocaleDateString()}</Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditorViewMain;
