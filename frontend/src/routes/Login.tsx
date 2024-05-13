import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { loginUser, getAuth } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUserLogin, setUid, setUserName } from "../store/userSlice";
import AlertHandler from "../components/AlertHandler";
import { setAlert } from "../store/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  // Handle the state management for alertSlice
  const handleAlert = (
    isVisible: boolean,
    message: string,
    severity: string
  ) => {
    dispatch(setAlert({ isVisible, message, severity }));
  };

  // Send credentials to the server. If response is 200 then update auth data to Redux state and redirect to /calendars.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response && response.status === 200) {
        const data = await getAuth();
        const authData = data?.data.authData;
        dispatch(setUserLogin(data?.data.login));
        dispatch(setUid(authData.auth.uid));
        dispatch(setUserName(authData.loggedUserName));
        navigate("/calendars");
      } else {
        resetStates();
        handleAlert(
          true,
          "Login failed. Please check your credentials.",
          "warning"
        );
        // window.alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <Box>
      <AlertHandler />
      <Box component="h2" sx={{ textAlign: "center" }}>
        Login
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
            label="Email"
            fullWidth
            required
            value={email}
            color="secondary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            color="secondary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Typography variant="body2" component="p">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#70A9A1" }}
            >
              Register
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

export default Login;
