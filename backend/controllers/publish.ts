import express, { Request, Response } from "express";
import {
  addToPublishedCalendars,
  getPublishedCalendar,
} from "../services/firebaseService";

const publishRouter = express.Router();

// Return published user's calendar
publishRouter.get(
  "/:uid/:calendarId",
  async (request: Request, response: Response) => {
    try {
      const { uid, calendarId } = request.params;
      const dbResponse = await getPublishedCalendar(uid, calendarId);
      return response.status(200).json(dbResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Post calendar to "published_calendars" collection
publishRouter.post("/:uid", async (request: Request, response: Response) => {
  try {
    const uid = request.params.uid;
    const calendar = request.body;
    const dbResponse = await addToPublishedCalendars(uid, calendar);
    return response.status(201).json(dbResponse);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export default publishRouter;
