import React, { useContext, useEffect, useRef, useState } from "react";
import "./guess.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { DataContext } from "../ContextAPI/dataContext";
import axios from "axios";

const Guess = () => {
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    if (state.guesses_left === 0) {
      dispatch({ type: "LOST" });
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
            // progress={i * 10}
          />
        );
      })}
    </div>
  );
};

const GuessItem = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [valid, setValid] = useState(false);
  const [response, setResponse] = useState();
  let guessInputRef = useRef("");

  const validateWord = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let sending_value;
    if (state.ans[0].indexOf(guessInputRef.current.value) >= 0) {
      sending_value = state.ans[0][0];
    } else {
      sending_value = guessInputRef.current.value;
    }
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/index",
        data: {
          user_input: sending_value.toLowerCase(),
          ans: state.ans[0][0],
        },
      });

      console.log(res.data);
      setResponse(res);

      //CORRECT
      if (state.ans[0].indexOf(guessInputRef.current.value) >= 0) {
        dispatch({
          type: "ANSWER_CORRECT",
          valid_index: props.id,
          input_value: guessInputRef.current.value,
          percent: res.data,
        });
      } else if (guessInputRef.current.value === "" || res.data === "err") {
        dispatch({
          type: "INVALID_WORD",
          input_value: guessInputRef.current.value,
        });
        alert("Please enter a valid word");
        guessInputRef.current.value = "";
      } else {
        //go to next
        dispatch({
          type: "ANSWER_INCORRECT",
          input_value: guessInputRef.current.value,
          valid_index: `guess ${props.id} : true`,
          percent: res.data,
        });
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

  const buttonClickHandler = () => {
    validateWord();

    //CORRECT
    if (state.ans[0].indexOf(guessInputRef.current.value) >= 0) {
      dispatch({ type: "ANSWER_CORRECT", valid_index: props.id });
    } else {
      if (guessInputRef.current.value === "") {
        alert("please enter any word");
      } else {
        dispatch({ type: "GOTO_NEXT" });
      }
    }

    //  else if (
    //   state.ans[0].indexOf(guessInputRef.current.value) < 0 &&
    //   guessInputRef.current.value !== ""
    // ) {
    //   alert("Please enter a valid word");
    //   guessInputRef.current.value = "";
    // dispatch({
    //   type: "ANSWER_INCORRECT",
    //   input_value: guessInputRef.current.value,
    //   valid_index: `guess ${props.id} : true`,
    // });
    // }

    // //InValid word
  };

  return (
    <div className="guessitem">
      {!valid ? (
        <div className="guessinput">
          {props.active ? (
            <>
              <input
                type={"text"}
                ref={guessInputRef}
                defaultValue={
                  state.guesses[props.id] || guessInputRef?.current.value
                }
              />
              <button className="submit-guess" onClick={validateWord}>
                <svg
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  width="44.952px"
                  height="44.952px"
                  viewBox="-2 -4 50 50"
                >
                  <g>
                    <path
                      d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
              </button>
            </>
          ) : (
            <>
              <input type={"text"} ref={guessInputRef} disabled />
              <button className="submit-guess" onClick={validateWord} disabled>
                <svg
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  width="44.952px"
                  height="44.952px"
                  viewBox="-2 -4 50 50"
                >
                  <g>
                    <path
                      d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
                      fill="#ffffff"
                    />
                  </g>
                </svg>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="guessinput">
          <input
            type={"text"}
            ref={guessInputRef}
            value={state.guesses[props.id] || guessInputRef?.current.value}
            disabled
          />
          <button className="submit-guess" onClick={validateWord} disabled>
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              width="44.952px"
              height="44.952px"
              viewBox="-2 -4 50 50"
            >
              <g>
                <path
                  d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          </button>
          {/* <p>{state.guesses[props.id] || guessInputRef?.current.value}</p> */}
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
