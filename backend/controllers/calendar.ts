import express, { Request, Response } from "express";

const calendarRouter = express.Router();

calendarRouter.get("/", async (request: Request, response: Response) => {
  try {
    response.sendStatus(200);
    console.log("get request received");
  } catch (error) {
    throw error;
  }
});

export default calendarRouter;
