import React, { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./clues.scss";
const Clues = () => {
  const { state } = useContext(DataContext);
  const NO_Clues = 6;

  const [toggle, setToggle] = useState(false);
  const xyz = () => {
    setToggle(!toggle);
  };

  return (
    <div className="clues">
      <ul className={`cards-split-delay transition`} onClick={xyz}>
        {[...Array(NO_Clues)].map((x, i) => {
          return (
            <ClueItem
              value={state.active >= i + 1 ? state?.clues[i] : ""}
              active={state.active < i - 1 ? "active" : ""}
              key={i}
              number={i}
            />
          );
        })}
      </ul>
    </div>
  );
};

const ClueItem = (props) => {
  const { state } = useContext(DataContext);

  return (
    <li
      className={`card card-${props?.number} ${
        state.active >= props?.number ? "active" : ""
      }`}
    >
      <div className="content">
        {state.lost && (
          <p>
            {props?.number == 0 ? "Game Lost" : state.clues[props?.number - 1]}
          </p>
        )}

        {state.lost === false && (
          <p>
            {props?.number == 0 ? "Game Won" : state.clues[props?.number - 1]}
          </p>
        )}
      </div>
    </li>
  );
};

export default Clues;
