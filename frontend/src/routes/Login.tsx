import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { loginUser } from "../services/calendarService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  // Send credentials to the server. If response is 200 then redirect to /calendars.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response && response.status === 200) {
        resetStates();
        navigate("/calendars");
      } else {
        resetStates();
        window.alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <Box>
      <Header />
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
