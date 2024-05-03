import axios from "axios";
const baseUrl: string = "http://localhost:3002/api/calendars";

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

export { getUserCalendarData, createNewCalendar, removeCalendar };
