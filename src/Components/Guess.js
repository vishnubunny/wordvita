import React, { useContext, useEffect, useRef, useState } from "react";
import "./guess.scss";
import { DataContext } from "../ContextAPI/dataContext";
import SnackBar from "../UI/SnackBar";
import GuessItem from "./GuessItem";

const Guess = () => {
  const { state, dispatch } = useContext(DataContext);
  console.log(state);
  const snackBarRef = useRef(null);
  const [flip, setFlip] = useState({});

  console.log(flip);
  const changeFlip = (i) => {
    setFlip((prev) => ({
      ...prev,
      [i]: true,
    }));
  };
  const changeNextFlip = (i) => {
    setFlip((prev) => ({
      ...prev,
      [i + 1]: false,
    }));
    dispatch({
      type: "FLIPPER",
      flipi: {
        ...state.flip,
        [i]: true,
        [i + 1]: false,
      },
    });
  };

  //function for triggering snackbar
  const defineSnackBar = ({ message, type }) => {
    snackBarRef.current.snackBar({
      message: message,
      type: type,
    });
  };

  useEffect(() => {
    setFlip(state.flip);

    if (state.guesses_left === 0 && !state.gameWon) {
      dispatch({ type: "LOST" });

      // defineSnackBar({
      //   message: `You Lost! The Answer is ${state.ans[0]}`,
      //   type: "fail",
      // });
    }
  }, [state.guesses_left, state.flip]);

  return (
    <div className={`guess ${state?.Lightmode === true ? "" : "dark"}`}>
      {Object.keys(flip).length !== 0 &&
        [...Array(5)].map((x, i) => {
          return (
            <GuessItem
              id={i}
              key={i}
              active={state.active === i}
              triggerSnackBar={defineSnackBar}
              fd={flip}
              flipperFunc={changeFlip}
              flipperNextFunc={changeNextFlip}
            />
          );
        })}
      {<SnackBar ref={snackBarRef} />}
    </div>
  );
};

export default Guess;
