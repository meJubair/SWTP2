import express, { Request, Response } from "express";

const calendarRouter = express.Router();

calendarRouter.get("/", async (request: Request, response: Response) => {
  try {
    console.log("get request received");
    response.sendStatus(200);
  } catch (error) {
    throw error;
  }
});

export default calendarRouter;
