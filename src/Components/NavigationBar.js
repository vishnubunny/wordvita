import React, { useContext } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./navigationBar.scss";
import info from "../images/info.svg";
import stats from "../images/pie-chart.png";


const NavigationBar = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const toggleButtonHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  const resetBtnHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  const playagainBtnHandler = () => {
    dispatch({ type: "TESTING" });
  };

  return (
    <div className={`nav ${state?.Lightmode === true ? "" : "dark"}`}>
      <h3 className="title">WordVita</h3>

      <div className="right">
        <input
          id="toggle"
          className="toggle"
          type="checkbox"
          onClick={toggleButtonHandler}
        />
        <img className="info" src={info} onClick={props.openthis} />

        <img className="stats" src={stats} onClick={props.openStats} />
        {/* <p onClick={props.openStats}>Stats</p> */}

        <p onClick={resetBtnHandler}>Reset</p>
        <p onClick={playagainBtnHandler}>Play again</p>
      </div>
    </div>
  );
};

export default NavigationBar;
