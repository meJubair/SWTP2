import helmet from "helmet";
import express from "express";
const app = express();
import calendarRouter from "./controllers/calendar";

app.use(helmet());
app.use(express.json());
app.use("/api/calendars", calendarRouter);

export default app;
