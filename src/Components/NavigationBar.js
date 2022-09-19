import React, { useContext } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./navigationBar.scss";

const NavigationBar = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const toggleButtonHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <div className={`nav ${state?.Lightmode === true ? "" : "dark"}`} >
      <h3 className="title">Wordvita</h3>

      <div className="right">
        <input
          id="toggle"
          className="toggle"
          type="checkbox"
          onClick={toggleButtonHandler}
        />
        <p onClick={props.openthis}>i</p>
      </div>
    </div>
  );
};

export default NavigationBar;
