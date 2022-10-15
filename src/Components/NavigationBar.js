import React, { useContext, useEffect, useMemo } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./navigationBar.scss";
import info from "../images/info.svg";
import stats from "../images/pie-chart.png";

const NavigationBar = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const toggleButtonHandler = () => {
    dispatch({ type: "TOGGLE" });
    console.log(state.Lightmode);
  };

  const resetBtnHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  const playagainBtnHandler = () => {
    dispatch({ type: "TESTING" });
  };

  const uniqueState = useMemo(() => {
    return state;
  }, [state.Lightmode]);

  useEffect(() => {}, [state.Lightmode]);

  return (
    <div className={`nav ${state?.Lightmode === true ? "" : "dark"}`}>
      <h3 className="title">WordVita</h3>

      <div className="right">
        <input
          id="toggle"
          className="toggle"
          type="checkbox"
          onClick={toggleButtonHandler}
          checked={!state.Lightmode && true}
        />

        {/* <img className="info" src={info} onClick={props.openthis} /> */}

        <img className="stats" src={stats} onClick={props.openStats} />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          onClick={props.openthis}
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
            <path d="M11,7h2v2h-2V7z M11,11h2v6h-2V11z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20 c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z" />
          </g>
        </svg>

        {/* <p onClick={props.openStats}>Stats</p> */}

        <p onClick={resetBtnHandler}>R</p>
        <p onClick={playagainBtnHandler}>P</p>
      </div>
    </div>
  );
};

export default NavigationBar;
