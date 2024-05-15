import axios from "axios";
import { CalendarData } from "../../../backend/types/calendarInterface";
const baseUrl: string = "http://localhost:3001/published";

const addToPublishedCalendars = async (uid: string, calendar: CalendarData) => {
  try {
    const response = await axios.post(`${baseUrl}/${uid}`, calendar);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPublishedCalendar = async (uid: string, calendarId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${uid}/${calendarId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addToPublishedCalendars, getPublishedCalendar };
