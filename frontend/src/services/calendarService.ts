import axios from "axios";

const registerUser = async (userObject: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    axios.post("/calendars/api/register", userObject);
    console.log("User registered succesfully")
  } catch (error) {
    console.log("Error registering user:", error);
  }
};

export { registerUser };
