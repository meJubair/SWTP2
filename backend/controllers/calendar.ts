import express, { Request, Response } from "express";
import multer from "multer";
import {
  getCalendarDataFromFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getAuthData,
  logout,
  addCalendarToFirebase,
  uploadToFirebaseStorage,
  getFileDownloadUrl,
} from "../services/firebaseService";

const calendarRouter = express.Router();
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 5 }, // max file size 1024 bytes * 1024 bytes = 5 megabytes
});

calendarRouter.get("/", async (request: Request, response: Response) => {
  try {
    const calendarData = await getCalendarDataFromFirebase();
    response.json(calendarData);
  } catch (error) {
    console.error("Error when fetching calendar data:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

// Return user auth data, username and a boolean for updating login state on front end
calendarRouter.get("/auth", async (request: Request, response: Response) => {
  try {
    const authData = await getAuthData();
    if (authData === null) {
      response.status(401).json({ isLoggedIn: false });
    } else {
      // Used login here because isLoggedIn is reserved for the state
      response.json({ login: true, authData });
    }
  } catch (error) {
    console.log("Error checking authentication status:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

calendarRouter.get("/logout", async (request: Request, response: Response) => {
  try {
    await logout();
    response.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error("Error during logout", error);
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

// Create new calendar instance
calendarRouter.post("/new", async (request: Request, response: Response) => {
  try {
    await addCalendarToFirebase(request.body.uid);
    response.status(201).end("New calendar created");
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

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
