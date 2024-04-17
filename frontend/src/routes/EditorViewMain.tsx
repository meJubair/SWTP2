import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateSelector from "../components/DateSelector";
import BackgroundColourSelector from "../components/BackgroundColourSelector";
import CalendarDoor from "../components/CalendarDoor";
import UploadImage from "../components/UploadImage";

const EditorViewMain: React.FC = () => {
  const [calendarTitle, setCalendarTitle] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
  const [showBgColourSelector, setShowBgColourSelector] =
    useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string | null>("Date");
  const [dateArray, setDateArray] = useState<Date[]>([]);
  const [background, setBackground] = useState<string>("#ffffff");
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (optionName === "Date") {
      setActiveOption(optionName);
      setShowDatePicker(true);
      setShowBgColourSelector(false);
      setShowImageUpload(false);
    }

    if (optionName === "Background color") {
      setActiveOption(optionName);
      setShowBgColourSelector(true);
      setShowDatePicker(false);
      setShowImageUpload(false);
    }

    if (optionName === "Upload image") {
      setActiveOption(optionName);
      setShowImageUpload(true);
      setShowDatePicker(false);
      setShowBgColourSelector(false);
    }
  };

  // Set background colour of the calendar
  const handleColorChange = (color: string) => {
    setBackground(color);
  };

  // Handle image upload from device or URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    const imageUrl = e.target.value;

    if (files) {
      const imageUrl = URL.createObjectURL(files);
      setUploadedImageUrl(imageUrl);

      console.log("Image url:", imageUrl);
      console.log("Uploaded image:", files);
    } else if (imageUrl) {
      setUploadedImageUrl(imageUrl);
    }
  };

  // Reset the uploaded image
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadedImageUrl(null);
  };

  return (
    <Box>
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
            height: "400px",
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
                  width: "33%",
                  textAlign: "center",
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
              margin: "20px auto",
              width: "60%",
              textAlign: "center",
            }}
          >
            {showDatePicker && (
              <DateSelector
                setDateArray={handleSetDateArray}
                dateArray={dateArray}
              />
            )}
            {showBgColourSelector && (
              <BackgroundColourSelector onColorChange={handleColorChange} />
            )}
            {showImageUpload && (
              <UploadImage
                handleImageUpload={handleImageUpload}
                handleReset={handleReset}
                imageUrl={uploadedImageUrl || ""}
                fileInputRef={fileInputRef}
              />
            )}
          </Box>
        </Box>
        {dateArray?.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              margin: "50px 0",
              background: background,
              padding: "2rem",
              width: "80%",
              border: "1px solid black",
              borderRadius: "5px",
              backgroundImage: uploadedImageUrl
                ? `url(${uploadedImageUrl})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {dateArray?.map((date) => (
              <CalendarDoor key={date.getDate()} value={date} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditorViewMain;
