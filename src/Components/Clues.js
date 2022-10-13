import React, { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import "./clues.scss";
const Clues = (props) => {
  const { state } = useContext(DataContext);
  const NO_Clues = 6;

  const [toggle, setToggle]= useState(false)
    const xyz=()=>{
        setToggle(!toggle)
    }

  return (
    <div className="clues">
      {/* <p>Clues</p> */}
      {/* <div className="items">
        {[...Array(NO_Clues)].map((x, i) => {
          return (
            <ClueItem
              value={state.active >= i+1 ? state?.clues[i] : ""}
              dull={state.active < i+1 && "dull"}
              key={i}
            />

          );
        })}
      </div> */}

      <ul className={`cards-split-delay transition`}  onClick={xyz}>
        {[...Array(NO_Clues)].map((x, i) => {
          return (
            <ClueItem
              value={state.active >= i+1 ? state?.clues[i] : ""}
              active={state.active < i-1 ?"active":""}
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
    // <div className={`clueItem ${props.dull}`}>
    //   <p>{props.value}</p>
    
    // </div>
    
    <li className={`card card-${props.number} ${state.active>=props.number?"active":""}`} >
        <div className="content">
            
            
        {  state.lost && 
      <p>{props.number==0?"Game Lost":state.clues[props.number-1]}</p>
      }

      {/* {  state.lost ===false && 
      <p>{state.gameWon ? "Game Won" : state.clues[props.number-1]}</p>
      // <p>{state.gameWon ? "Game Won" : "misunderstood"}</p>
      } */}

      {  state.lost===false&& 
      <p>{props.number==0?"Game Won":state.clues[props.number-1]}</p>
      }
        </div>
    </li>
  );
};

export default Clues;
