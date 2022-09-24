import React, { useContext } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./clues.scss";
const Clues = (props) => {
  const { state } = useContext(DataContext);
  const NO_Clues = 5;

  return (
    <div className="clues">
      {/* <p>Clues</p> */}
      <div className="items">
        {[...Array(NO_Clues)].map((x, i) => {
          return (
            <ClueItem
              value={state.active >= i ? state?.clues[i] : ""}
              dull={state.active < i && "dull"}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

const ClueItem = (props) => {
  return (
    <div className={`clueItem ${props.dull}`}>
      <p>{props.value}</p>
    </div>
  );
};

export default Clues;
