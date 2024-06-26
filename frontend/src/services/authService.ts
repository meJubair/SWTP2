import axios, { isAxiosError } from "axios";
const baseUrl: string = "http://localhost:3001/auth";

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
    if (isAxiosError(error) && error.response?.status === 400) {
      throw error.response?.data.error;
    } else if (isAxiosError(error) && error.response?.status === 409) {
      throw error.response?.data.error;
    } else if (isAxiosError(error) && error.message === "Network Error") {
      throw error.message;
    } else {
      throw error;
    }
  }
};

const loginUser = async (userObject: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, userObject);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const errorMessage = error.response?.data?.error;
      throw new Error(errorMessage);
    } else if (axios.isAxiosError(error) && error.message === "Network Error") {
      console.error("Login failed:", error);
      throw new Error(error.message);
    }
  }
};

const getAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/authstatus`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signOut = async () => {
  try {
    const response = await axios.get(`${baseUrl}/logout`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { registerUser, loginUser, getAuth, signOut };
