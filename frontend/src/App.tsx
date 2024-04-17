import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./routes/Homepage";
import About from "./routes/About";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Calendars from "./routes/Calendars";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import EditorViewMain from "./routes/EditorViewMain";
import Root from "./routes/Root";
import store from "./store/store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Box>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/calendars" element={<Calendars />} />
              <Route path="/editor" element={<EditorViewMain />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </Box>
  );
};

export default App;
