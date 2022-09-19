import React from "react";
import ReactDOM from "react-dom";
import "./demoPortal.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closethis1}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <header className={"header"}>
        <h2>{props.title}</h2>
      </header>
      <div className={"content"}>
        <p>All the information goes here </p>
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
        <ModalOverlay closethis1={props.closethis} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default DemoPortal;
