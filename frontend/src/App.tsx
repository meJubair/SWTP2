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
import EditorViewSingle from "./routes/EditorViewSingle";
import ProtectedRoute from "./routes/ProtectedRoutes";

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
              <Route
                path="/calendars"
                element={<ProtectedRoute component={Calendars} />}
              />
              <Route
                path="/calendars/:new"
                element={<ProtectedRoute component={EditorViewMain} />}
              />
              <Route
                path="/calendars/:title"
                element={<ProtectedRoute component={EditorViewMain} />}
              />
              <Route
                path="/calendars/:title/:id"
                element={<EditorViewSingle />}
              />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </Box>
  );
};

export default App;
