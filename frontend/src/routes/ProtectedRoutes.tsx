import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxUserState } from "../store/stateTypes";
import { setUserName, setUid, setUserLogin } from "../store/userSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAuth } from "../services/authService";

interface ProtectedRouteProps {
  component: FC;
}
// Pass function component as a prop
const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const dispatch = useDispatch();
  const [authLoaded, setAuthLoaded] = useState(false);

  // Check user authData from the backend.
  // If user is signed then update Redux state and change authLoaded to true.
  useEffect(() => {
    const fetchUserAuthData = async () => {
      try {
        const response = await getAuth();
        if (response && response.status === 200) {
          const authData = response.data;
          dispatch(setUserName(authData.authData.loggedUserName));
          dispatch(setUid(authData.authData.auth.uid));
          dispatch(setUserLogin(authData.login));
        } else {
          dispatch(setUserLogin(false));
        }
        setAuthLoaded(true);
      } catch (error) {
        console.error(error);
        setAuthLoaded(true);
      }
    };
    fetchUserAuthData();
  }, [dispatch]);

  // Get username from Redux state
  const userName = useSelector((state: ReduxUserState) => state.user.userName);

  // If authLoaded is false display a spinner.
  if (!authLoaded) {
    return <LoadingSpinner />;
  }

  // If user authLoaded is true then check if user is authenticated and let user navigate to protected route. Else redirect to /login
  return userName ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
