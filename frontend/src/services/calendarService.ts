import axios from "axios";
const baseUrl: string = "http://localhost:3001/api/calendars";

const registerUser = async (userObject: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    await axios.post(`${baseUrl}/register`, userObject);
    console.log("User registered successfully");
  } catch (error) {
    console.log("Error registering user:", error);
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

export { registerUser, loginUser };
