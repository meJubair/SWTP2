import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
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
