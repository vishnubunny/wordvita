import React, { useContext, useEffect, useRef, useState } from "react";
import "./guess.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { DataContext } from "../ContextAPI/dataContext";
import axios from "axios";
import arrow from "../images/east_black_24dp.svg";
import SnackBar from "../UI/SnackBar";

const Guess = () => {
  const { state, dispatch } = useContext(DataContext);
  const snackBarRef = useRef(null);

  const defineSnackBar = ({ message, type }) => {
    snackBarRef.current.snackBar({
      message: message,
      type: type,
    });
  };

  useEffect(() => {
    if (state.guesses_left === 0) {
      dispatch({ type: "LOST" });

      defineSnackBar({
        message: `You Lost! The Answer is ${state.ans[0]}`,
        type: "fail",
      });
    }
  }, [state.guesses_left]);

  return (
    <div className={`guess ${state?.Lightmode === true ? "" : "dark"}`}>
      {[...Array(5)].map((x, i) => {
        return (
          <GuessItem
            id={i}
            key={i}
            active={state.active === i}
            triggerSnackBar={defineSnackBar}
          />
        );
      })}
      {<SnackBar ref={snackBarRef} />}
    </div>
  );
};

const GuessItem = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [valid, setValid] = useState(false);
  // const [response, setResponse] = useState();
  let guessInputRef = useRef("");

  const validateWord = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/index",
        data: {
          user_input: guessInputRef.current.value.toLowerCase().trim(),
          ans: state.ans[0],
        },
        config,
      });

      console.log(res.data);
      // setResponse(res);

      if (res.data === "err") {
        dispatch({
          type: "INVALID_WORD",
          input_value: guessInputRef.current.value,
        });
        props.triggerSnackBar({
          message: "Invalid Word",
          type: "fail",
        });
        guessInputRef.current.value = "";
      } else {
        //go to next
        dispatch({
          type: "ANSWER_INCORRECT",
          input_value: guessInputRef.current.value,
          valid_index: `guess ${props.id} : true`,
          percent: res.data,
        });
        // props.triggerSnackBar({
        //   message: "Show test",
        //   type: "success",
        // });
      }
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    try {
      if (state.valid[props.id] === true) {
        setValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [state.valid]);

  const buttonClickHandler = (e) => {
    e.preventDefault();
    //Nothing typed
    if (guessInputRef.current.value === "") {
      dispatch({ type: "INVALID_WORD" });
      props.triggerSnackBar({
        message: "Please enter something",
        type: "fail",
      });
      // alert("please enter any word");
      return;
    }

    //Answer Correct
    if (state.ans.includes(guessInputRef.current.value)) {
      console.log("Answer array includes this input");
      dispatch({
        type: "ANSWER_CORRECT",
        valid_index: props.id,
        input_value: guessInputRef.current.value,
        percent: 100,
      });
      props.triggerSnackBar({
        message: "Woohoo!! you Won",
        type: "success",
      });
      return;
    }

    //Incorrect Incorrect
    // Check for validity
    validateWord();
  };

  return (
    <div className="guessitem">
      {props.active ? (
        <form className="guessinput" onSubmit={buttonClickHandler}>
          <input
            type={"text"}
            ref={guessInputRef}
            defaultValue={
              state.guesses[props.id] || guessInputRef?.current.value
            }
            autoFocus
          />
          <button className="submit-guess" type="submit">
            <img src={arrow} />
          </button>
        </form>
      ) : (
        <div className="guessinput disabled">
          <input
            type={"text"}
            ref={guessInputRef}
            defaultValue={
              state.guesses[props.id] || guessInputRef?.current.value
            }
            disabled
          />
          <button className="submit-guess disabled">
            <img src={arrow} />
          </button>
        </div>
      )}

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
            bgColor={"#02ab02"}

            // completedClassName="barCompleted"
          />
          {/* {props.active && <p>Active</p>} */}
        </div>
      </div>
    </div>
  );
};

export default Guess;
