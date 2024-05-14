import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "../services/authService";
import { setUserName, setUid, setUserLogin } from "../store/userSlice";

const AuthLoader = () => {
  const dispatch = useDispatch();
  // Check user authData from the backend.
  // If user is authenticated then update the Redux state
  useEffect(() => {
    const fetchUserAuthData = async () => {
      try {
        const response = await getAuth();
        if (response && response.status === 200) {
          const authResponse = response.data.authData;
          if (authResponse) {
            dispatch(setUserName(authResponse.loggedUserName));
            dispatch(setUid(authResponse.auth.uid));
            dispatch(setUserLogin(authResponse.login));
          }
        } else {
          console.log("Failed to fetch user authentication data:", response);
        }
      } catch (error) {
        console.log("Error fetching user authentication data:", error);
      }
    };
    fetchUserAuthData();
  }, [dispatch]);

  return null;
};

export default AuthLoader;
