import React, { useState } from "react";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Username:", username, "Email:", email, "Password:", password);
  };

  return (
    <Box>
      <Header />
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
            label="Username"
            fullWidth
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
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
