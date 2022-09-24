import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../ContextAPI/dataContext";

import "./countDown.scss"

const CountDown = () => {
  const { state } = useContext(DataContext);

  const next_date = new Date(state.next_date);
  const present_date = new Date();
  //   console.log(present_date.toLocaleString());
  //   console.log(next_date.toLocaleString());
  let diff = parseInt(next_date.getTime() - present_date.getTime());

  console.log(diff);

  const converter = (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    return hours + ":" + minutes + ":" + seconds;
  };

  const [displayDiff, setDisplayDiff] = useState(converter(diff));
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      diff = diff - 1000;
      const time_diff = converter(diff);
      setDisplayDiff(time_diff);
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  return <div className="countdown">{displayDiff}</div>;
};

export default CountDown;
