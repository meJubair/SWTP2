import axios from "axios";

const registerUser = async (userObject: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    await axios.post(`http://localhost:3001/api/calendars/register`, userObject);
    console.log("User registered succesfully")
  } catch (error) {
    console.log("Error registering user:", error);
  }
};

export { registerUser };
