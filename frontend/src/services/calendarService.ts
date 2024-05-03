import axios from "axios";
const baseUrl: string = "http://localhost:3001/api/calendars";
import { CalendarData } from "../../../backend/types/calendarInterface";

// Get user's calendar data from the database from calendars/uid/calendars collection
const getUserCalendarData = async (uid: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${uid}`);
    return response;
  } catch (error) {
    console.error("Error when fetching user calendar data:", error);
  }
};

// Create a new calendar instance in the database in calendars/uid/calendars collection
const createNewCalendar = async (uid: string) => {
  try {
    const response = await axios.post(`${baseUrl}/new`, { uid: uid });
    return response;
  } catch (error) {
    console.error("Error when creating a new calendar:", error);
  }
};

// Remove calendar from database
const removeCalendar = async (uid: string, calendarId: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/${uid}/${calendarId}`);
    return response;
  } catch (error) {
    console.error("Error when removing calendar:", error);
  }
};

// Update a single value of calendar document in database
const updateSingleValue = async(uid:string, calendarId: string, newValue: Partial<CalendarData>) => {
  try {
    const response = await axios.patch(`${baseUrl}/${uid}/${calendarId}`, newValue);
    return response
  }
  catch (error) {
    console.error("Error when patching a value", error)
  }
}

export { getUserCalendarData, createNewCalendar, removeCalendar, updateSingleValue };
