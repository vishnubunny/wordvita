import NavigationBar from "./Components/NavigationBar";
import "./app.scss";
import Guess from "./Components/Guess";
import Clues from "./Components/Clues";
import { DataContext } from "./ContextAPI/dataContext";
import { useContext, useEffect, useMemo, useState } from "react";
import DemoPortal from "./Portal/DemoPortal";
import axios from "axios";
import StatsPortal from "./Portal/StatsPortal";
import Footer from "./Components/Footer";

function App() {
  const { state, dispatch } = useContext(DataContext);
  const [response, setRes] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  let date = new Date();

  const closeInfoButtonHandler = () => {
    setShowInfo(false);
  };
  const openInfoButtonHandler = () => {
    setShowInfo(true);
  };
  const closeStatsButtonHandler = () => {
    setShowStats(false);
  };
  const openStatsButtonHandler = () => {
    setShowStats(true);
  };

  //is called in useEffect

  const releaseDate = new Date("10/15/2022");
  const today = new Date();
  const diffTime = Math.abs(today - releaseDate);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  console.log(days)
  const initial_setup = async (id) => {
    const prod = "https://wordvita.com/index1",
      local = "http://127.0.0.1:5000/index1";
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // console.log(days);

      //Posting days diff to get the guess and clues array
      const res = await axios({
        method: "post",
        url: local,
        data: {
          days,
        },
        config,
      });

      setRes(res);

      ///For Tomorrow date
      // console.log("today : ", date.toLocaleString());
      let tom_date = new Date();
      let tomorrow = tom_date.setDate(tom_date.getDate() + 1);
      let next_date = new Date(tomorrow).toJSON().split("T")[0] + "T00:00:00";
      // console.log("Tomorrow", next_date);

      if (id === "first") {
        dispatch({
          type: "SET_INITIAL_DATA",
          payload: res.data,
          first_time: true,
          opened_date: date.toJSON().split("T")[0] + "T00:00:00",
          next_date: next_date,
        });
      }
      if (id === "next") {
        dispatch({
          type: "PLAYING_NEXT_DAY",
          payload: res.data,
          opened_date: date.toJSON().split("T")[0] + "T00:00:00",
          next_date: next_date,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let old_data = null;

  //Main useEffect for loading data
  useEffect(() => {
    old_data = JSON.parse(localStorage.getItem("user_data"));
    let d2;
    let date_diff;

    if (old_data !== null) {
      d2 = new Date();
      let d1 = new Date(old_data.opened_date);
      let days = d2.getTime() - (d1.getTime() + 60000);
      date_diff = parseInt(days / (86400 * 1000));
    }

    if (old_data === null) {
      initial_setup("first");
      return;
    } else if (date_diff !== 0) {
      initial_setup("next");
      return;
    } else {
      dispatch({
        type: "SET_INITIAL_DATA",
        old: old_data,
        first_time: false,
      });
    }
  }, []);

  //Can be optimised by adding individual dependencies
  const uniqueState = useMemo(() => {
    return state;
  }, [state]);

  useEffect(() => {
    let removeStatsTimer1;
    if (state.gameWon) {
      removeStatsTimer1 = setTimeout(() => {
        setShowStats(true);
      }, 3000);
    }

    return () => {
      clearTimeout(removeStatsTimer1);
    };
  }, [uniqueState]);

  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(state));
  }, [uniqueState]);

  return (
    <div className={`App ${state?.Lightmode === true ? "" : "dark"}`}>
      {showInfo && <DemoPortal closethis={closeInfoButtonHandler} />}
      {showStats && (
        <StatsPortal closethis={closeStatsButtonHandler} days={days} />
      )}
      <NavigationBar
        openthis={openInfoButtonHandler}
        closethis={closeInfoButtonHandler}
        openStats={openStatsButtonHandler}
        closeStats={closeStatsButtonHandler}
        runInitialsetup={initial_setup}
      />
      <hr />
      <div className="cg">
        {response?.data !== "err" || old_data !== null ? (
          <Clues />
        ) : (
          // <>gello</>
          <p>No data from server</p>
        )}
        {response?.data !== "err" || old_data !== null ? (
          <Guess />
        ) : (
          <p>So not loading guesses and clues to play!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
