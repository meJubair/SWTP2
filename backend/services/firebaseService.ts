import { FIREBASE_API_KEY } from "../utils/config";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

// Get all from "calendars"
const getCalendarDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "calendars"));
    const calendars = querySnapshot.docs.map((doc) => doc.data());
    return calendars;
  } catch (error) {
    throw error;
  }
};

export { getCalendarDataFromFirebase };
