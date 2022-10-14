import React, { useContext, useEffect, useRef, useState } from "react";
import "./guess.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { DataContext } from "../ContextAPI/dataContext";
import axios from "axios";
import arrow from "../images/east_black_24dp.svg";
import SnackBar from "../UI/SnackBar";

const Guess = () => {
  const { state, dispatch } = useContext(DataContext);
  console.log(state);
  const snackBarRef = useRef(null);
  const [flip, setFlip] = useState({});
  useEffect(() => {
    console.log(state.flip);
    setFlip(state.flip);
  }, [state.flip]);
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

  const defineSnackBar = ({ message, type }) => {
    snackBarRef.current.snackBar({
      message: message,
      type: type,
    });
  };

  useEffect(() => {
    if (state.guesses_left === 0 && !state.gameWon) {
      dispatch({ type: "LOST" });

      // defineSnackBar({
      //   message: `You Lost! The Answer is ${state.ans[0]}`,
      //   type: "fail",
      // });
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

const GuessItem = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [valid, setValid] = useState(false);
  // console.log(props.fd, props.id);
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

      // console.log(res.data);
      // setResponse(res);

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
          // console.log(props.id + " Timer");
          props.flipperNextFunc(props.id);

          dispatch({
            type: "ANSWER_INCORRECT",
            input_value: guessInputRef.current.value.toLowerCase().trim(),
            valid_index: `guess ${props.id} : true`,
          });
        }, 1200);
        // guessInputRef.current.autoFocus = true;
        //2props.triggerSnackBar({
        //   message: "Show test",
        //   type: "success",
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    guessInputRef.current.focus();

    try {
      if (state.valid[props.id] === true) {
        setValid(true);
      }
    } catch (error) {
      // console.log(error);
    }
  }, [state.valid, props]);

  const buttonClickHandler = (e) => {
    e.preventDefault();
    //Nothing typed
    // console.log("" + " button clicked");
    if (
      state.guesses.includes(guessInputRef.current.value.toLowerCase().trim())
    ) {
      props.triggerSnackBar({
        message: "You guessed it already..!",
      });
      return;
    }

    // flip[props.active] = true;
    // // console.log(guessInputRef.current.value.toLowerCase().trim() + " console ");
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
      // flick = false;
      // props.triggerSnackBar({
      //   message: "Woohoo!! you Won",
      //   type: "success",
      // });
      return;
    }

    //Incorrect Incorrect
    // Check for validity
    // if (e.keyCode === 13) {
    //   console.log("Enter");
    // }
    // console.log(props.active + " before submit");
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
          {/* <p>{props.fd[props.id] + ""}</p> */}
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
            // bgColor={"#02ab02"}
            bgColor={"#00D100"}

            // completedClassName="barCompleted"
          />
          {/* {props.active && <p>Active</p>} */}
        </div>
      </div>
    </div>
  );
};

export default Guess;
