import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReduxUserState } from "../store/stateTypes";

interface ProtectedRouteProps {
  component: FC;
}
// Pass function component as a prop
const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const userName = useSelector((state: ReduxUserState) => state.user.userName);

  return userName ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
