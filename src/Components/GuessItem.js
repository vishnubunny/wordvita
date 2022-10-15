import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../ContextAPI/dataContext";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import arrow from "../images/east_black_24dp.svg";

import "./guessitem.scss";

const GuessItem = (props) => {
  const { state, dispatch } = useContext(DataContext);
  let guessInputRef = useRef("");

  const validateWord = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const prod = "https://wordvita.com/index",
        local = "http://127.0.0.1:5000/index";
      const res = await axios({
        method: "post",
        url: local,
        data: {
          user_input: guessInputRef.current.value.toLowerCase().trim(),
          ans: state.ans[0],
        },
        config,
      });

      if (res.data === "err") {
        dispatch({
          type: "INVALID_WORD",
          input_value: guessInputRef.current.value.toLowerCase().trim(),
        });
        props.triggerSnackBar({
          message: "Invalid Word",
          type: "fail",
        });
        guessInputRef.current.value = "";
      } else {
        props.flipperFunc(props.id);
        dispatch({
          type: "FLIPPER",
          flipi: {
            ...state.flip,
            [props.id]: true,
          },
        });

        dispatch({
          type: "TIMER",
          percent: res.data,
        });

        setTimeout(() => {
          props.flipperNextFunc(props.id);
          dispatch({
            type: "ANSWER_INCORRECT",
            input_value: guessInputRef.current.value.toLowerCase().trim(),
            valid_index: `guess ${props.id} : true`,
          });
        }, 1200);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Main useeffect
  useEffect(() => {
    guessInputRef.current.focus();
  }, [props.fd]);

  const buttonClickHandler = (e) => {
    e.preventDefault();

    //same input again
    if (
      state.guesses.includes(guessInputRef.current.value.toLowerCase().trim())
    ) {
      props.triggerSnackBar({
        message: "You guessed it already..!",
      });
      return;
    }

    //Empty input
    if (guessInputRef.current.value === "") {
      dispatch({ type: "INVALID_WORD" });
      props.triggerSnackBar({
        message: "Please enter something",
        type: "fail",
      });
      return;
    }

    //Answer Correct
    if (state.ans.includes(guessInputRef.current.value.toLowerCase().trim())) {
      console.log("Answer array includes this input");
      props.flipperFunc(props.id);
      dispatch({
        type: "ANSWER_CORRECT",
        valid_index: props.id,
        input_value: guessInputRef.current.value.toLowerCase().trim(),
        percent: 100,
      });
      dispatch({
        type: "FLIPPER",
        flipi: {
          ...state.flip,
          [props.id]: true,
        },
      });
      return;
    }
    //Incorrect
    // Check for validity
    validateWord();
  };

  return (
    <div className="guessitem">
      <form
        className={`guessinput ${props.fd[props.id] && "disabled"}`}
        onSubmit={buttonClickHandler}
      >
        <input
          type={"text"}
          ref={guessInputRef}
          defaultValue={state.guesses[props.id] || guessInputRef?.current.value}
          autoFocus={true}
          disabled={!!props.fd[props.id]}
        />
        <button
          className={`submit-guess ${props.fd[props.id] && "disabled"}`}
          type="submit"
          disabled={!!props.fd[props.id]}
        >
          <img src={arrow} />
        </button>
      </form>

      <div className="valid">
        <div className="progress-div">
          <ProgressBar
            className="progressbar"
            completed={
              state?.guess_percent[props.id]
                ? state?.guess_percent[props.id]
                : 0
            }
            maxCompleted={100}
            labelSize={"8px"}
            barContainerClassName="container"
            // customLabel={`${props.progress}%`}
            labelAlignment={"center"}
            height={"26px"}
            width={"180px"}
            bgColor={"#00D100"}
          />
        </div>
      </div>
    </div>
  );
};

export default GuessItem;
