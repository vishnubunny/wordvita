import React, { useContext } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./clues.scss";
const Clues = () => {
  const { state } = useContext(DataContext);
  const NO_Clues = state.clues.length;

  return (
    <div className="clues">
      {[...Array(NO_Clues)].map((x, i) => {
        return <ClueItem value={state.clues[i]} key={i} />;
      })}
    </div>
  );
};

const ClueItem = (props) => {
  return <div className="clueItem">{props.value}</div>;
};

export default Clues;
