import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Calendars = () => {
  return (
    <Box>
      <Header />
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
            <Button color="secondary" variant="contained">
              create calendar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendars;
