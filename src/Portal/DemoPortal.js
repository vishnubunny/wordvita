import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ReactDOM from "react-dom";
import { DataContext } from "../ContextAPI/dataContext";
import "./demoPortal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closethis1}></div>;
};
const ModalOverlay = (props) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div
      className={`demomodal ${!state.Lightmode ? "dark" : ""} ${
        props.val ? "open" : "close"
      }`}
    >
      <header className={"header"}>
        <h2>{props.title}</h2>
        <button onClick={props.closethis1}>x</button>
      </header>
      <div className={"content"}>
        <p>
          Wordvita is a brainstorming puzzle where you are supposed to guess a
          word by chasing the row of clues down your journey.
        </p>

        <p>
          The percentage of similarity between your guess and the answer is
          displayed on the respective progress bar after each guess you make.
        </p>
      </div>
      <footer className={"actions"}>
        {/* <button onClick={props.closethis1}>Close</button> */}
      </footer>
    </div>
  );
};

const DemoPortal = (props) => {
  const [val, setVal] = useState(props.status);
  const closeHandler = () => {
    setVal(false);
    setTimeout(() => {
      props.closethis();
    }, 800);
  };
  useEffect(() => {}, [val]);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop closethis1={closeHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay closethis1={closeHandler} val={val} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default DemoPortal;
