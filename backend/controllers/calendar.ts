import express, { Request, Response } from "express";
import {
  getCalendarDataFromFirebase,
  registerWithEmailAndPassword,
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

export default calendarRouter;
