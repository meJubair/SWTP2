import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8AFFE8",
    },
    secondary: {
      main: "#0091AD",
    },
  },
  typography: {
    h1: {
      fontSize: "32px"
    },
    h2: {
      fontSize: "24px"
    },
    h3: {
      fontSize: "16px",
      fontWeight:"bold"
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
