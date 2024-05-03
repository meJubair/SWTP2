import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  getFirestore,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FIREBASE_API_KEY } from "../utils/config";
import { CalendarData } from "../types/calendarInterface";
import { getCalendarDataKeys } from "../types/calendarDataHelperFunctions";

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
const getUserCalendarDataFromFirebase = async (uid: string) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `calendars/${uid}/calendars`)
    );
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
  const calendar: CalendarData = {
    calendarId: "",
    title: "",
    titleColour: "",
    authorName: "",
    authorNameColour: "",
    startDate: "",
    endDate: "",
    published: false,
    tags: [],
    backgroundUrl: "",
    backgroundColour: "",
    calendarDoors: [],
  };
  try {
    // Reference the calendars collection
    const calendarRef = collection(db, `calendars/${uid}/calendars`);
    // Add a new calendar document to the collection
    const docRef = await addDoc(calendarRef, calendar);

    // Set the newly created document's id to calendarId property
    const calendarId = docRef.id;
    calendar.calendarId = calendarId;

    // Update the document's calendarId in the document
    await updateDoc(docRef, { calendarId });
    // Return the newly created calendar
    return calendar;
  } catch (error) {
    console.error("Error creating new calendar:", error);
  }
};

// Remove user's calendar from the database
const removeCalendarFromFirebase = async (calendarId: string, uid: string) => {
  try {
    if (!calendarId || !uid) {
      throw new Error("CalendarId and/or uid are missing");
    }
    // Reference to the collection
    const calendarRef = collection(db, `calendars/${uid}/calendars/`);
    // Delete the document in the collection
    await deleteDoc(doc(calendarRef, calendarId));
  } catch (error) {
    console.error("Error removing calendar:", error);
    throw error;
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

// Update a single field value in a calendar document
const updateCalendarField = async (
  uid: string,
  calendarId: string,
  fieldToUpdate: Partial<CalendarData> // Expect single field of CalendarData
) => {
  try {
    if (!uid || !calendarId || !fieldToUpdate) {
      throw new Error("missing parameter");
    }

    // Reference to the user's calendar collection
    const collectionRef = collection(db, `calendars/${uid}/calendars`);

    // Reference to the specific document to be updated
    const docRef = doc(collectionRef, calendarId);

    // Extract the field name and it's updated value
    const [property, updatedValue] = Object.entries(fieldToUpdate)[0];

    // Get allowed keys from the CalendarData interface
    const allowedKeys: string[] = getCalendarDataKeys();

    // Check if property exists in allowed keys array
    if (allowedKeys.includes(property)) {
      // Update the specific field in the document with the new value
      await updateDoc(docRef, { [property]: updatedValue });
    } else {
      throw new Error(`Invalid key: ${property}`);
    }
  } catch (error) {
    console.log("Error when updating a value:", error);
    throw error;
  }
};

// Replace whole calendar object in database
const updateCalendarObjectInFirebase = async (
  uid: string,
  calendarId: string,
  calendar: CalendarData
) => {
  try {
    if (!uid || !calendarId || !calendar) {
      throw new Error("Missing parameter");
    }
    const collectionRef = collection(db, `calendars/${uid}/calendars`);
    const docRef = doc(collectionRef, calendarId);
    const updatedCalendar = await updateDoc(docRef, { ...calendar });
    return updatedCalendar;
  } catch (error) {
    console.error("Error when updating calendar object:", error);
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
  getUserCalendarDataFromFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getAuthData,
  logout,
  addCalendarToFirebase,
  uploadToFirebaseStorage,
  getFileDownloadUrl,
  removeCalendarFromFirebase,
  updateCalendarField,
  updateCalendarObjectInFirebase,
};
