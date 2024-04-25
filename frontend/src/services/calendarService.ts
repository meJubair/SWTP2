import axios from "axios";
const baseUrl: string = "http://localhost:3001/api/calendars";

// Get user's calendar data from the database from calendars/uid/calendars collection
const getUserCalendarData = async (uid: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${uid}`);
    return response;
  } catch (error) {
    console.error("Error when fetching user calendar data:", error);
  }
};

const registerUser = async (userObject: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    await axios.post(`${baseUrl}/register`, userObject);
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const loginUser = async (userObject: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userObject);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

const getAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Return true if request to /logout was succesful
const signOut = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export { registerUser, loginUser, getAuth, signOut, getUserCalendarData };
