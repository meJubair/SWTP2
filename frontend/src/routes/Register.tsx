import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import AlertHandler from "../components/AlertHandler";
import { setAlert } from "../store/alertSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle the state management for alertSlice
  const handleAlert = (
    isVisible: boolean,
    message: string,
    severity: string
  ) => {
    dispatch(setAlert({ isVisible, message, severity }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      resetStates();
      navigate("/calendars");
    } catch (error) {
      handleAlert(true, `${error}`, "error");
    }
  };

  // Used to clear the inputfields and states after succsful registartion
  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Box>
      <AlertHandler />
      <Box component="h2" sx={{ textAlign: "center" }}>
        Register
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "300px",
            gap: "1rem",
            padding: "1rem 0",
          }}
        >
          <TextField
            color="secondary"
            label="Username"
            fullWidth
            required
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <TextField
            color="secondary"
            label="Email"
            fullWidth
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            color="secondary"
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Typography variant="body2" component="p">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#70A9A1" }}
            >
              Login
            </Link>
          </Typography>
          <Box sx={{ textAlign: "center", margin: "20px 0 0" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ background: "#0b2027", color: "#8affe8" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
