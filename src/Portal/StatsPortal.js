import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./statsPortal.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { DataContext } from "../ContextAPI/dataContext";
import CountDown from "../Components/CountDown";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closethis1}></div>;
};
const ModalOverlay = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const date = new Date();

  const [dateitem, setDateitem] = useState(date.toTimeString().split(" ")[0]);

  // const [copyText, setCopyText] = useState();

  ChartJS.register(ArcElement, Tooltip, Legend);
  let data = {
    labels: ["Guess1", "Guess2", "Guess3", "Guess4", "Guess5"],
    datasets: [
      {
        data: state.stats,
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
        ],
      },
    ],
  };

  let green = "█";
  let yellow = "█";
  let black = "░";

  const addsEmoji = (num) => {
    let str = "";
    let c = 0;
    let n = Math.floor(num / 10);
    for (let i = 0; i < n; i++) str += green;
    if (num % 10 != 0) {
      str += yellow;
      c = 1;
    }
    for (let i = 0; i < 10 - n - c; i++) {
      str += black;
    }
    return str;
  };

  let copyText1;
  const createSharableData = async () => {
    copyText1 = `Word Vita #${props.days}\n`;
    for (let index = 0; index < state.guess_percent.length; index++) {
      copyText1 =
        copyText1 +
        addsEmoji(state.guess_percent[index]) +
        state.guess_percent[index] +
        "%\n";
    }
    // setCopyText(copyText1);
    navigator.clipboard.writeText(copyText1 + "https://www.wordvita.com");

    await navigator.share({
      title: "Results",
      text: copyText1,
      url: "",
    });

    // setCopyText("");
  };

  const shareBtnHandler = () => {
    createSharableData();
  };

  let options = {
    responsive: false,
  };

  return (
    <div
      className={`statsmodal ${!state.Lightmode ? "dark" : ""} ${
        props.val ? "open" : "close"
      }`}
    >
      <div className={"header"}>
        <h2>STATISTICS</h2>
        <button onClick={props.closethis1}>x</button>
      </div>
      <div className={"content"}>
        {state.played !== 0 ? (
          <>
            <div className="streak">
              <p>Played : {state.played} </p>
              <p>Won : {state.won} </p>
              <p>Win Streak : {state.streak}</p>
              <p>Max win Streak : {state.maxStreak}</p>
              <p>{props.days} days</p>
            </div>
            <Doughnut data={data} height={250} options={options} />
            <p>Next Wordvita in</p>
            <CountDown />
          </>
        ) : (
          <p>Play one game to get your stats</p>
        )}
      </div>
      <footer className={"actions"}>
        {/* <button onClick={props.closethis1}>Close</button> */}
        {/* <p>{dateitem}</p> */}
        {state.lost || state.won ? (
          <button onClick={shareBtnHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
            </svg>
            Share
          </button>
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};

const StatsPortal = (props) => {
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
        <ModalOverlay closethis1={closeHandler} days={props.days} val={val} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default StatsPortal;
