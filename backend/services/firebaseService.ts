import { initializeApp } from "firebase/app";
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
} from "firebase/firestore";
import { FIREBASE_API_KEY } from "../utils/config";

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

// Returns the username of currently signed in user
const getLoggedUserName = async () => {
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
      return loggedUserName;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error getting logged-in user's name:", error);
    throw error;
  }
};

export {
  auth,
  db,
  getCalendarDataFromFirebase,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  getLoggedUserName,
};
