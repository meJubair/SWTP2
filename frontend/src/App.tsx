import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./routes/Homepage";
import About from "./routes/About";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Calendars from "./routes/Calendars";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
<<<<<<< HEAD
import SingleCalendarDoor from "./components/SingleCalendarDoor";
=======
import EditorViewMain from "./routes/EditorViewMain";
>>>>>>> b6b29b0001a02ab39d4740925c9a84c6ab51b443

const App: React.FC = () => {
  return (
    <Box>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/layout" element={<SingleCalendarDoor />} />

=======
          <Route path="/calendars" element={<Calendars />} />
          <Route path="/editor" element={<EditorViewMain />} />
>>>>>>> b6b29b0001a02ab39d4740925c9a84c6ab51b443
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
