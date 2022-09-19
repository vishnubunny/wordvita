import React, { useContext } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./clues.scss";
const Clues = (props) => {
  const { state } = useContext(DataContext);
  const NO_Clues = 5;

  console.log(state.active);

  return (
    <div className="clues">
      {[...Array(NO_Clues)].map((x, i) => {
        return (
          <ClueItem
            value={state.active >= i ? state?.clues[i] : ""}
            key={i}
          />
        );
      })}
    </div>
  );
};

const ClueItem = (props) => {
  return (
    <div className="clueItem">
      <p>{props.value}</p>
    </div>
  );
};

export default Clues;
