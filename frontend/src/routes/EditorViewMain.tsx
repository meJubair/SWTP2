import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DateSelector from "../components/DateSelector";
import BackgroundColourSelector from "../components/BackgroundColourSelector";
import UploadImage from "../components/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import {
  ReduxCalendarState,
  ReduxUserState,
  ReduxSyncState,
} from "../store/stateTypes";
import { Link, useParams } from "react-router-dom";
import {
  setCalendarTitle,
  setCalendarTitleColour,
  setAuthorName,
  setAuthorNameColour,
  setCalendarTags,
  setCalendarBackgroundUrl,
} from "../store/calendarSlice";
import CalendarTags from "../components/CalendarTags";
import { setIsTyping, setSaved } from "../store/syncSlice";
import AutoSave from "../components/AutoSave";
import {
  updateCalendarObject,
  uploadCalendarBackroundImage,
  getBackgroundImage,
} from "../services/calendarService";
import {
  CalendarData,
  DoorData,
} from "../../../backend/types/calendarInterface";

const EditorViewMain: React.FC = () => {
  const [showGeneralSettings, setShowGeneralSettings] = useState<boolean>(true);
  const [showBgColourSelector, setShowBgColourSelector] =
    useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<string | null>(
    "General settings"
  );
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [singleTag, setSingleTag] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

  const uid = useSelector((state: ReduxUserState) => state.user.uid);
  const isTyping = useSelector((state: ReduxSyncState) => state.sync.isTyping);

  const params: string | undefined = useParams().new;

  // Calendar object from the Redux store
  const calendarsArray = useSelector(
    (state: ReduxCalendarState) => state.calendar.calendars
  );

  const calendarIndex = calendarsArray.findIndex(
    (calendar) => calendar.calendarId === params
  );

  const calendar: CalendarData = calendarsArray[calendarIndex];
  const calendarId = calendar.calendarId;
  const background = calendar.backgroundColour;

  // Update calendar object in the database
  const handleSync = async () => {
    dispatch(setSaved(false));
    try {
      await updateCalendarObject(uid, calendarId, calendar);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSaved(true));
    }
  };

  // Update data in the database after user has stopped typing
  useEffect(() => {
    const asyncWrapper = async () => {
      if (!isTyping) {
        await handleSync();
      }
    };
    asyncWrapper();
  }, [isTyping]);

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

  // Set the calendar title and update Redux state
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsTyping(true));
    typingResetTimer(timerRef);
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
    dispatch(setIsTyping(true));
    typingResetTimer(timerRef);
    dispatch(
      setAuthorName({
        calendarIndex: calendarIndex,
        newAuthorName: e.target.value,
      })
    );
  };

  const handleTagsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && singleTag.trim() !== "") {
      dispatch(setIsTyping(true));
      typingResetTimer(timerRef);
      if (calendar?.tags?.includes(singleTag.trim())) {
        alert("Tag already exists");
        return;
      } // Prevent duplicate tags
      const updatedTags = [...calendar.tags, singleTag.trim()];
      dispatch(setCalendarTags({ calendarIndex, newTags: updatedTags }));
      setSingleTag(""); // Reset the input field
    }
  };

  const removeTag = (tag: string) => {
    dispatch(setIsTyping(true));
    typingResetTimer(timerRef);
    const newTags = calendar?.tags?.filter(
      (tagItem: string) => tagItem !== tag
    );
    dispatch(setCalendarTags({ calendarIndex, newTags }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleTag(e.target.value);
  };

  const handleTitleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsTyping(true));
    const newColour = e.target.value;
    dispatch(
      setCalendarTitleColour({
        calendarIndex: calendarIndex,
        newTitleColour: newColour,
      })
    );
    typingResetTimer(timerRef);
  };

  const handleAuthorNameColourChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setIsTyping(true));
    const newColour = e.target.value;
    dispatch(
      setAuthorNameColour({
        calendarIndex: calendarIndex,
        newAuthorNameColour: newColour,
      })
    );
    typingResetTimer(timerRef);
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

  // Handle image upload from device or URL
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    const imageUrl = e.target.value;
    dispatch(setIsTyping(true));

    if (files) {
      await uploadCalendarBackroundImage(uid, calendarId, files);
      // Get background image download link from storage
      const imageUrl = await getBackgroundImage(uid, calendarId);
      dispatch(
        setCalendarBackgroundUrl({ calendarIndex, newBackgroundUrl: imageUrl })
      );
    } else if (imageUrl) {
      setUploadedImageUrl(imageUrl);
      dispatch(
        setCalendarBackgroundUrl({ calendarIndex, newBackgroundUrl: imageUrl })
      );
    }
    typingResetTimer(timerRef);
  };

  // Reset the uploaded image
  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    dispatch(setIsTyping(true));
    typingResetTimer(timerRef);
    setUploadedImageUrl(null);
    dispatch(setCalendarBackgroundUrl({ calendarIndex, newBackgroundUrl: "" }));
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ m: "2rem 0px 1rem", fontWeight: "bold" }}
        >
          Calendar Options
        </Typography>
        <Box
          sx={{
            backgroundColor: "#70a9a1",
            width: "80%",
            padding: "0 50px",
            borderRadius: "5px",
            height: "400px",
            position: "relative",
          }}
        >
          <Box sx={{ position: "absolute", top: "-1.5rem", right: 0 }}>
            <AutoSave />
          </Box>
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
                <Box
                  sx={{
                    display: "flex",
                    width: "33%",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      width: "250px",
                    }}
                  >
                    <TextField
                      label="Calendar title"
                      value={calendar.title}
                      onChange={handleTitleChange}
                    />
                    <TextField
                      label="Title color"
                      InputLabelProps={{ shrink: true }}
                      type="color"
                      onChange={handleTitleColorChange}
                      value={calendar.titleColour}
                    />
                    <TextField
                      label="Author name"
                      value={calendar.authorName}
                      onChange={handleAuthorNameChange}
                    />
                    <TextField
                      label="Author color"
                      InputLabelProps={{ shrink: true }}
                      type="color"
                      onChange={handleAuthorNameColourChange}
                      value={calendar.authorNameColour}
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "33%" }}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <DateSelector />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "33%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Typography sx={{ maxWidth: "250px" }}>
                    Type in a value and press Enter to add it to the list
                  </Typography>
                  <TextField
                    label="Tags"
                    onKeyDown={handleTagsChange}
                    onChange={handleChange}
                    value={singleTag}
                  />
                  <CalendarTags removeTag={removeTag} />
                </Box>
              </Box>
            )}
            {showBgColourSelector && <BackgroundColourSelector />}
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
        <Typography
          variant="h2"
          sx={{ m: "2rem 0px 1rem", fontWeight: "bold" }}
        >
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
            mb: "50px",
            height: "800px",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundImage: calendar.backgroundUrl
              ? `url(${calendar.backgroundUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: calendar.titleColour,
              fontSize: "2rem",
              margin: "0",
              fontWeight: "bold",
            }}
          >
            {calendar.title === "" ? "Title" : calendar.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: calendar.authorNameColour }}
          >
            {calendar.authorName ? `By ${calendar.authorName}` : "Author name"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
              width: "100%",
              margin: "40px 0 0",
            }}
          >
            {calendar.calendarDoors?.map((door: DoorData) => (
              <Link
                to={`/calendars/${calendar.calendarId}/${door.doorNumber}`}
                style={{ textDecoration: "none", color: "#0b2027" }}
                key={door.doorNumber}
              >
                <Box
                  key={door.doorNumber}
                  sx={{
                    padding: "20px",
                    border: "1px dashed #0b2027",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {door.doorNumber}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditorViewMain;
