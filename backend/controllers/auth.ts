import express, { Request, Response } from "express";
import {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getAuthData,
  logout,
} from "../services/firebaseService";

const authRouter = express.Router();

export default authRouter;

// Return user auth data, username and a boolean for updating login state on front end
authRouter.get("/authstatus", async (request: Request, response: Response) => {
  try {
    const authData = await getAuthData();
    if (authData === null) {
      response.status(401).json({ isLoggedIn: false });
    } else {
      // Used login here because isLoggedIn is reserved for the state
      response.json({ login: true, authData });
    }
  } catch (error) {
    console.log("Error checking authentication status:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

authRouter.get("/logout", async (request: Request, response: Response) => {
  try {
    await logout();
    response.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error during logout", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/register", async (request: Request, response: Response) => {
  try {
    const { username, email, password } = request.body;
    await registerWithEmailAndPassword(username, email, password);
    response.status(200).end("success");
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    await loginWithEmailAndPassword(email, password);
    response.status(200).end("Login succesful");
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});
