import React from "react";
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
    <div className={`demomodal ${!state.Lightmode ? "dark" : ""}`}>
      <header className={"header"}>
        <h2>{props.title}</h2>
      </header>
      <div className={"content"}>
        <p>
          Wordvita is a brainstorming puzzle where you are supposed to guess a
          word by chasing the row of clues down your journey. The percentage of
          similarity between your guess and the answer is displayed on the
          respective progress bar after each guess you make{" "}
        </p>
      </div>
      <footer className={"actions"}>
        {/* <button onClick={props.closethis1}>Close</button> */}
      </footer>
    </div>
  );
};

const DemoPortal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop closethis1={props.closethis} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay closethis1={props.closethis} status2={props.status} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default DemoPortal;
