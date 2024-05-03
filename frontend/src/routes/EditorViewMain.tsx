import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateSelector from "../components/DateSelector";
import BackgroundColourSelector from "../components/BackgroundColourSelector";
import UploadImage from "../components/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { ReduxCalendarState, ReduxUserState } from "../store/stateTypes";
import { useParams } from "react-router-dom";
import { setCalendarTitle, setAuthorName } from "../store/calendarSlice";
import { SliderPicker } from "react-color";
import AutoSave from "../components/AutoSave";
import { updateSingleValue } from "../services/calendarService";
import { CalendarData } from "../../../backend/types/calendarInterface";

const EditorViewMain: React.FC = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showGeneralSettings, setShowGeneralSettings] = useState<boolean>(true);
  const [showBgColourSelector, setShowBgColourSelector] =
    useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string | null>(
    "General settings"
  );
  const [dateArray, setDateArray] = useState<Date[]>([]);
  const [background, setBackground] = useState<string>("#ffffff");
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [textColour, setTextColour] = useState<string>("#000000");
  const [saved, setSaved] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // The logic to update the dateArray state is passed down to the DateSelector component
  const handleSetDateArray = (newDateArray: Date[]) => {
    setDateArray(newDateArray);
  };

  const uid = useSelector((state: ReduxUserState) => state.user.uid);

  const params: string | undefined = useParams().new;

  const dispatch = useDispatch();

  // Calendar object from the Redux store
  const calendarsArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarsArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendar = calendarsArray[calendarIndex];
  const calendarId = calendar.calendarId;

  // Generic function for updating single value in database
  const handleSync = async (field: string, value: Partial<CalendarData>) => {
    setSaved(false);
    try {
      const updatedValue = { [field]: value };
      await updateSingleValue(uid, calendarId, updatedValue);
    } catch (error) {
      console.log(error);
    } finally {
      setSaved(true);
    }
  };

  // Update data in the database after user has stopped typing
  useEffect(() => {
    const asyncWrapper = async () => {
      if (!isTyping) {
        await handleSync("title", calendar.title);
        await handleSync("authorName", calendar.authorName);
      }
    };
    asyncWrapper();
  }, [isTyping]);

  // Set 1500ms timer after user has stopped typing and reset timer if user starts typing before timer has ended
  const typingResetTimer = () => {
    // Reset the timer every time user starts typing
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start the timer to detect writing completion
    timerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Set the calendar title and update Redux state
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    typingResetTimer();
    // update Redux state
    dispatch(
      setCalendarTitle({
        calendarIndex: calendarIndex,
        newTitle: e.target.value,
      })
    );
  };

  // Set the author name and update Redux state
  const handleAuthorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    typingResetTimer();
    dispatch(
      setAuthorName({
        calendarIndex: calendarIndex,
        newAuthorName: e.target.value,
      })
    );
  };

  const handleTagsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
  };

  const handleTitleColorChange = (colour: any) => {
    const newColour = colour.hex;
    setTextColour(newColour);
  };

  const calendarOptions = [
    { id: 1, name: "General settings" },
    { id: 2, name: "Background color" },
    { id: 3, name: "Upload image" },
  ];

  const handleClick = (optionName: string) => {
    if (optionName === "General settings") {
      setActiveOption(optionName);
      setShowGeneralSettings(true);
      setShowBgColourSelector(false);
      setShowImageUpload(false);
    }

    if (optionName === "Background color") {
      setActiveOption(optionName);
      setShowBgColourSelector(true);
      setShowGeneralSettings(false);
      setShowImageUpload(false);
    }

    if (optionName === "Upload image") {
      setActiveOption(optionName);
      setShowImageUpload(true);
      setShowGeneralSettings(false);
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
      <AutoSave sync={saved} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
              width: "100%",
            }}
          >
            {showGeneralSettings && (
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ width: "33%", marginBottom: "2px" }}>
                  <TextField
                    label="Calendar title"
                    value={calendar.title}
                    onChange={handleTitleChange}
                  />
                  <Box sx={{ width: "100%" }}>
                    <SliderPicker
                      color={textColour}
                      onChange={handleTitleColorChange}
                    />
                  </Box>
                  <TextField
                    label="Author name"
                    value={calendar.authorName}
                    onChange={handleAuthorNameChange}
                  />
                </Box>
                <Box sx={{ width: "33%" }}>
                  <DateSelector
                    setDateArray={handleSetDateArray}
                    dateArray={dateArray}
                  />
                </Box>

                <TextField
                  label="Tags"
                  value={calendar.tags}
                  onKeyDown={handleTagsChange}
                />
              </Box>
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
        <Typography variant="h3" sx={{ margin: "30px 0 0" }}>
          Calendar Preview
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            background: background,
            padding: "1rem",
            margin: "10px 0 50px",
            height: "800px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundImage: uploadedImageUrl
              ? `url(${uploadedImageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            component="h2"
            sx={{
              textAlign: "center",
              color: textColour,
              fontSize: "2rem",
              margin: "0",
            }}
          >
            {calendar.title === "" ? "Title" : calendar.title}
          </Box>
          <Typography variant="subtitle2" sx={{ color: textColour }}>
            {calendar.authorName ? calendar.authorName : "Author name"}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              width: "80%",
              justifyContent: "center",
            }}
          >
            {calendar.calendarDoors?.map((door: any) => (
              <Box
                key={door.doorNumber}
                sx={{
                  background: "#d9d9d9",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                {door.doorNumber}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditorViewMain;
