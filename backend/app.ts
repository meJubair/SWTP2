import helmet from "helmet";
import express from "express";
import cors from "cors";
const app = express();
import calendarRouter from "./controllers/calendar";
import authRouter from "./controllers/auth";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(helmet());
app.use(express.json());
app.use("/api/calendars", calendarRouter);
app.use("/auth", authRouter);

export default app;
