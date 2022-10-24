import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./snackBar.scss";

const SnackBar = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(DataContext);
  const [showSnackBar, setShowSnackBar] = useState({
    action: false,
    message: "Hello",
    type: "",
  });

  useImperativeHandle(ref, () => ({
    snackBar({ message, type }) {
      setShowSnackBar({ action: true, message: message, type: type });
      setTimeout(() => {
        setShowSnackBar(false);
      }, 2500);
    },
  }));

  return (
    <div
      className={`snackbar  ${showSnackBar.action ? "show" : "hide"} 
      ${state?.Lightmode === true ? "light" : "dark"}
      // ${showSnackBar.type === "success" && "success"}
      // ${showSnackBar.type === "fail" && "fail"}`}
    >
      {showSnackBar.message}
    </div>
  );
});

export default SnackBar;
