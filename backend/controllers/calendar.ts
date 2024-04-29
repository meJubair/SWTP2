import express, { Request, Response } from "express";
import multer from "multer";
import {
  getUserCalendarDataFromFirebase,
  addCalendarToFirebase,
  uploadToFirebaseStorage,
  getFileDownloadUrl,
  removeCalendarFromFirebase,
} from "../services/firebaseService";

const calendarRouter = express.Router();
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 5 }, // max file size 1024 bytes * 1024 bytes = 5 megabytes
});

// Get user calendars from database
calendarRouter.get("/:uid", async (request: Request, response: Response) => {
  try {
    const uid = request.params.uid;
    const calendarData = await getUserCalendarDataFromFirebase(uid);
    response.json(calendarData);
  } catch (error) {
    console.error("Error when fetching calendar data:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

// Create new calendar instance
calendarRouter.post("/new", async (request: Request, response: Response) => {
  try {
    const dbResponse = await addCalendarToFirebase(request.body.uid);
    response.json(dbResponse);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

// Delete calendar instance
calendarRouter.delete(
  "/:uid/:calendarId",
  async (request: Request, response: Response) => {
    try {
      const { uid, calendarId } = request.params;
      await removeCalendarFromFirebase(calendarId, uid);
      response.status(204).end();
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
);

// Handle file upload using Multer (upload.single("file"))
calendarRouter.post(
  "/upload",
  upload.single("file"),
  async (request: Request, response: Response) => {
    try {
      const file = request.file;
      const { uid } = request.body;
      if (!file || !uid) {
        response.json(400).json({ error: "File or UID not provided" });
        return;
      }
      await uploadToFirebaseStorage(file, uid); // Upload the file in to Firebase Storage
      response.status(200).end("File succesfully uploaded");
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
);

// Endpoint for getting file download URL from the storage
calendarRouter.get(
  "/getfileurl",
  async (request: Request, response: Response) => {
    try {
      const { uid, fileName } = request.body;
      const fileUrl = await getFileDownloadUrl(uid, fileName);
      response.json(fileUrl);
    } catch (error) {
      console.log(error);
      response.json({ message: error });
    }
  }
);

export default calendarRouter;
