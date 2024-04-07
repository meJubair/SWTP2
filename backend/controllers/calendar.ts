import express, { Request, Response } from "express";
import { getCalendarDataFromFirebase } from "../services/firebaseService";

const calendarRouter = express.Router();

calendarRouter.get("/", async (request: Request, response: Response) => {
  try {
    const calendarData = await getCalendarDataFromFirebase();
    response.json(calendarData);
    return calendarData;
  } catch (error) {
    console.error("Error when fetching calendar data:", error);
    response.status(500).json({ error: "Internal server error"})
  }
});

export default calendarRouter;
