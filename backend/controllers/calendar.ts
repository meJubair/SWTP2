import express, { Request, Response } from "express";
import {
  getCalendarDataFromFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getLoggedUserName,
} from "../services/firebaseService";

const calendarRouter = express.Router();

calendarRouter.get("/", async (request: Request, response: Response) => {
  try {
    const calendarData = await getCalendarDataFromFirebase();
    response.json(calendarData);
  } catch (error) {
    console.error("Error when fetching calendar data:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

calendarRouter.get("/auth", async (request: Request, response: Response) => {
  try {
    const loggedUserName = await getLoggedUserName();
    if (loggedUserName === null) {
      response.status(401).json({ isLoggedIn: false });
    } else {
      // Used login here because isLoggedIn is reserved for the state
      response.json({ login: true, loggedUserName });
    }
  } catch (error) {
    console.log("Error checking authentication status:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

calendarRouter.post(
  "/register",
  async (request: Request, response: Response) => {
    try {
      const { username, email, password } = request.body;
      await registerWithEmailAndPassword(username, email, password);
      response.status(200).end("success");
    } catch (error) {
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

calendarRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    await loginWithEmailAndPassword(email, password);
    response.status(200).end("Login succesful");
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

export default calendarRouter;
