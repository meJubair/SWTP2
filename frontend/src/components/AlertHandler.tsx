import { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { ReduxAlertState } from "../store/stateTypes";
import { setIsVisible } from "../store/alertSlice";

const AlertHandler = () => {
  const dispatch = useDispatch();

  const isVisible = useSelector(
    (state: ReduxAlertState) => state.alert.isVisible
  );
  const message = useSelector((state: ReduxAlertState) => state.alert.message);
  const severity = useSelector(
    (state: ReduxAlertState) => state.alert.severity
  );

  // Set the timer to show AlertHandler
  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        dispatch(setIsVisible(false));
      }, 3500);

      // Clear timeout when component unmounts or isVisible becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, isVisible]);

  return (
    <Fade in={isVisible} timeout={250}>
      <Alert
        severity={severity}
        variant="filled"
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "5",
        }}
        onClick={() => dispatch(setIsVisible(false))}
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertHandler;
