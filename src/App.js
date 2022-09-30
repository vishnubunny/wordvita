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

  //For testing date
  const [dateData, setDatedate] = useState("");
  let date = new Date();
  useEffect(() => {
    const start = new Date();
    // console.log(start);
    const da = new Date(start.getTime());
    setDatedate(
      `${start.getTime()} ${da.toLocaleTimeString()} ${start.toDateString()}`
    );
  }, []);
  // for testing date -- end

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

  const initial_setup = async (id) => {
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:5000/index1",
      });

      if (res.data !== "err") setRes(res);
      else {
        console.log("Error from server");
        return;
      }

      ///For Tomorrow date
      console.log("today : ", date.toLocaleString());
      let tom_date = new Date();
      let tomorrow = await tom_date.setDate(tom_date.getDate() + 1);
      let next_date =
        (await new Date(tomorrow).toJSON().split("T")[0]) + "T00:00:00";
      console.log("Tomorrow", next_date);

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

  let old_data;

  useEffect(() => {
    old_data = JSON.parse(localStorage.getItem("user_data"));
    console.log("OLD DATA", old_data);
    let d2;
    let date_diff;
    if (old_data !== null) {
      d2 = new Date();
      let d1 = new Date(old_data.opened_date);
      let days = d2.getTime() - (d1.getTime() + 60000);
      date_diff = parseInt(days / (86400 * 1000));
      console.log(date_diff);
    }

    if (old_data === null) {
      initial_setup("first");
      return;
    } else if (date_diff !== 0) {
      initial_setup("next");
      return;
    } else {
      console.log("Refreshed same day");
      dispatch({
        type: "SET_INITIAL_DATA",
        old: old_data,
        first_time: false,
      });
    }
  }, []);

  const uniqueState = useMemo(() => {
    return state;
  }, [state]);

  useEffect(() => {
    let removeStatsTimer1, removeStatsTimer2;
    if (state.gameWon) {
      removeStatsTimer1 = setTimeout(() => {
        setShowStats(true);
      }, 2000);
      // removeStatsTimer2 = setTimeout(() => {
      //   setShowStats(false);
      // }, 10000);
    }

    return () => {
      clearTimeout(removeStatsTimer1);
      // clearTimeout(removeStatsTimer2);
    };
  }, [uniqueState]);

  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(state));
  }, [uniqueState]);

  // console.log(state);

  return (
    <div className={`App ${state?.Lightmode === true ? "" : "dark"}`}>
      {showInfo && <DemoPortal closethis={closeInfoButtonHandler} />}
      {showStats && <StatsPortal closethis={closeStatsButtonHandler} />}
      <NavigationBar
        openthis={openInfoButtonHandler}
        closethis={closeInfoButtonHandler}
        openStats={openStatsButtonHandler}
        closeStats={closeStatsButtonHandler}
        runInitialsetup={initial_setup}
      />
      <div className="cg-main">
        <div className="cg">
          {(response || old_data !== null) && <Clues />}
          {(response || old_data !== null) && <Guess />}
        </div>
      </div>
      {/* {state.lost && <p>You Lost! Try Again</p>} */}
      {/* // create a modal */}
      {/* {state.gameWon && <p> You Won the match</p>} */}

      <Footer />
    </div>
  );
}

export default App;
