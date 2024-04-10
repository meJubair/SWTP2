import helmet from "helmet";
import express from "express";
import cors from "cors";
const app = express();
import calendarRouter from "./controllers/calendar";

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/calendars", calendarRouter);

export default app;
