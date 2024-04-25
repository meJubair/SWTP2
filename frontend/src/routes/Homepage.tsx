import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CheckIcon from "@mui/icons-material/Check";

const Homepage: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(#8affe8 65%, #0B2027)",
        }}
      >
        <Box component="h2">Calendar Creator</Box>
        <Box>
          <Box>
            <Typography>
              Create your custom calendar(s) and share them with your friends
              and family!
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  background: "#0b2027",
                  margin: "30px",
                  color: "#8affe8",
                }}
              >
                Get Started
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
          gap: "20px",
          width: "100%",
          background: "#8affe8",
        }}
      >
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <TextFieldsIcon />
          <Typography variant="subtitle1">Add text</Typography>
          <Typography variant="body2" component="p">
            Add text to calendar doors
          </Typography>
        </Box>
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <AddAPhotoIcon />
          <Typography variant="subtitle1">Add image</Typography>
          <Typography variant="body2" component="p">
            Upload photos from your device
          </Typography>
        </Box>
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <VideocamIcon />
          <Typography variant="subtitle1">Add video</Typography>
          <Typography variant="body2" component="p">
            Upload videos from your device
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0",
          gap: "20px",
          width: "100%",
          background: "#cfd7c7",
        }}
      >
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <MoneyOffCsredIcon />
          <Typography variant="subtitle1">It's free</Typography>
          <Typography variant="body2" component="p">
            Create and share calendars for free
          </Typography>
        </Box>
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <EmojiEmotionsIcon />
          <Typography variant="subtitle1">It's fun</Typography>
          <Typography variant="body2" component="p">
            User-friendly interface
          </Typography>
        </Box>
        <Box sx={{ width: "250px", padding: "10px", textAlign: "center" }}>
          <CheckIcon />
          <Typography variant="subtitle1">It's easy</Typography>
          <Typography variant="body2" component="p">
            Create your calendar in a few clicks
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
