import React, { useContext, useEffect, useRef, useState } from "react";
import "./guess.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { DataContext } from "../ContextAPI/dataContext";
import axios from "axios";
import arrow from "../images/east_black_24dp.svg";
import SnackBar from "../UI/SnackBar";
import { registerables } from "chart.js";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { computeHeadingLevel } from "@testing-library/react";

const Guess = () => {
  const { state, dispatch } = useContext(DataContext);
  const snackBarRef = useRef(null);
  // const [flip, setFlip] = useState([false, true, true, true, true])
  // const flip = [false, true, true, true, true];
  // const changeFlip = (i)=>{
  //   setFlip(prev=>(prev[i]=true,prev[i+1]=false))
  //   // setFlip(prev=>{prev[i+1]=false})

  // }
  
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
            // fd = {flip}
            // xyz = {changeFlip}
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
  var flick = false;
  
  var flip = [false, true, true, true, true];
  
  // const [response, setResponse] = useState();
  let guessInputRef = useRef("");

  const validateWord = async (e) => {
    console.log(e)
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const prod = "https://wordvita.com/index",
     local = "http://127.0.0.1:5000/index"
     
      const res = await axios({
        
        method: "post",
        url: local,
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
          input_value: guessInputRef.current.value.toLowerCase().trim(),
        });
        props.triggerSnackBar({
          message: "Invalid Word",
          type: "fail",
        });
        guessInputRef.current.value = "";
      } else {
        //go to next
        
        
        dispatch({
          type: "TIMER",
          percent: res.data,
        });

        
        // props.fd[props.id] = true;
        // props.fd[props.id+1] = false;
        // flip = true;

        // props.xyz(props.id)
        // props.fd[props.id] = true;
        // props.fd[props.id+1] = false;

        for(let i=0;i<=props.id;i++)
        {
          flip[i] = true;
          flip[i+1] = false;
          // flick = true;
          // props.fd[props.id+1] = false;
        }
        flick = true;
        console.log(flick);
        console.log(props.id);

        setTimeout(() => {
          console.log(props.id+" Timer")
          // flick = false;
          dispatch({
            type: "ANSWER_INCORRECT",
            input_value: guessInputRef.current.value.toLowerCase().trim(),
            valid_index: `guess ${props.id} : true`,
            
          });
          flip[props.id] = true;
        }, 1200);
        //2props.triggerSnackBar({
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
    console.log(""+" button clicked")
    if(state.guesses.includes(guessInputRef.current.value.toLowerCase().trim()))
    {
      props.triggerSnackBar({
        message: "You guessed it already..!"
        
      });
      return;
    }
    
    // flip[props.active] = true;
    console.log(guessInputRef.current.value.toLowerCase().trim() + " console ")
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

      dispatch({
        type: "ANSWER_CORRECT",
        valid_index: props.id,
        input_value: guessInputRef.current.value.toLowerCase().trim(),
        percent: 100,
      });
      flick = false;
      // props.triggerSnackBar({
      //   message: "Woohoo!! you Won",
      //   type: "success",
      // });
      return;
    }

    //Incorrect Incorrect
    // Check for validity
    if(e.keyCode===13){
      console.log("Enter")
    }
    console.log(props.active+" before submit")
    validateWord(e);
    

  };

  return (
    <div className="guessitem">
    
        <form className={`guessinput ${!props.active && "disabled"}`} onSubmit={buttonClickHandler}>
          <input
            type={"text"}
            ref={guessInputRef}
            defaultValue={
              state.guesses[props.id] || guessInputRef?.current.value
              
            }
            autoFocus
            disabled={flip[props.id]}
          />
          <button className={`submit-guess ${!props.active && "disabled"}`} type="submit" disabled={flip[props.id]}>
            <img src={arrow} />
            {/* <p></p> */}
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
