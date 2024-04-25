import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_API_KEY } from "../utils/config";
import { CalendarData } from "../types/calendarInterface";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "team6-advent-calender.firebaseapp.com",
  projectId: "team6-advent-calender",
  storageBucket: "team6-advent-calender.appspot.com",
  messagingSenderId: "986820055354",
  appId: "1:986820055354:web:7f9bd9453f7fe9764f0003",
  measurementId: "G-TX9RQWMETR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize storage
const storage = getStorage();

// Access to the project authentication
const auth = getAuth(app);

// Access to the database
const db = getFirestore(app);

// Get all from "calendars"
const getCalendarDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "calendars"));
    const calendars = querySnapshot.docs.map((doc) => doc.data());
    return calendars;
  } catch (error) {
    console.log("Error when fetching data from firebase:", error);
  }
};

// Authenticate a new user and create a new document in the "users" collection
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    if (!name || !email || !password) {
      throw new Error("missing parameter");
    }
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log("Succesfully registered to database");
  } catch (error) {
    console.log("Error registering new user:", error);
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Returns the username and auth data of currently signed in user
const getAuthData = async () => {
  try {
    if (auth.currentUser) {
      let loggedUserName = "";

      // Reference to the 'users' collection in Firestore
      const userRef = collection(db, "users");

      // Query that checks the userRef collection for UID property of current user
      const q = query(userRef, where("uid", "==", auth.currentUser.uid));

      // Execute the query and get the query snapshot
      const querySnapshot = await getDocs(q);

      // Extract the 'name' field from the user document and assign it to loggedUserName
      querySnapshot.forEach((doc) => {
        loggedUserName = doc.data().name;
      });

      const authData = { auth: auth.currentUser, loggedUserName };
      return authData;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting logged-in user's name and auth data:", error);
    throw error;
  }
};

// Log current user out
const logout = async () => {
  try {
    await auth.signOut();
    console.log("User successfully logged out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Create a new calendar document in calendars/uid/calendars
const addCalendarToFirebase = async (uid: string) => {
  // Create a new blank calendar object in the 
  const calendar : CalendarData = {
      calendarId: "",
      title: "",
      authorName: "",
      startDate: "",
      endDate: "",
      published: false,
      tags: [],
      backgroundUrl: "",
      backgroundColour: "",
      calendarDoors: []
  }
  try {
    // Reference the calendars collection
    const calendarRef = collection(db, `calendars/${uid}/calendars`);
    // Add a new calendar document to the collection
    const docRef = await addDoc(calendarRef, calendar);

    // Set the newly created document's id to calendarId property
    const calendarId = docRef.id;
    calendar.calendarId = calendarId;
    
    // Update the document's calendarId in the document
    await updateDoc(docRef, {calendarId})

  } catch (error) {
    console.error("Error creating new calendar:", error);
  }
};

// Upload user's files to FirebaseStorage in users/<uid>/<filename>
const uploadToFirebaseStorage = async (
  file: Express.Multer.File,
  uid: string
) => {
  try {
    // Create a reference to user's storage location/path
    const userStorageRef = ref(storage, `users/${uid}/${file.originalname}`);

    // Determine the correct MIME type or use "default"
    const mimeType = file.mimetype || "application/octet-stream";

    await uploadBytes(userStorageRef, file.buffer, { contentType: mimeType }); // Upload the file in to the storage
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const getFileDownloadUrl = async (uid: string, fileName: string) => {
  try {
    const fileRef = ref(storage, `users/${uid}/${fileName}`);
    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  } catch (error) {
    console.error("Error when fetching URL data:", error);
    throw error;
  }
};

export {
  auth,
  db,
  getCalendarDataFromFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getAuthData,
  logout,
  addCalendarToFirebase,
  uploadToFirebaseStorage,
  getFileDownloadUrl,
};
