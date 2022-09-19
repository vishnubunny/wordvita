import NavigationBar from "./Components/NavigationBar";
import "./app.scss";
import Guess from "./Components/Guess";
import Clues from "./Components/Clues";
import { DataContext } from "./ContextAPI/dataContext";
import { useContext, useEffect, useMemo, useState } from "react";
import DemoPortal from "./Portal/DemoPortal";
import axios from "axios";

function App() {
  const { state, dispatch } = useContext(DataContext);
  const [response, setRes] = useState();
  // console.log({ ...state });s

  const [showInfo, setShowInfo] = useState(false);
  const closeInfoButtonHandler = () => {
    setShowInfo(false);
  };
  const openInfoButtonHandler = () => {
    setShowInfo(true);
  };

  const initial_setup = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:5000/index1",
      });

      console.log(res.data);
      setRes(res);

      dispatch({
        type: "SET_INITIAL_DATA",
        payload: res.data,
        first_time: true,
      });

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const old_data = JSON.parse(localStorage.getItem("user_data"));
  console.log(old_data);

  useEffect(() => {
    if (old_data === null) {
      initial_setup();
    } else {
      dispatch({
        type: "SET_INITIAL_DATA",
        old: old_data,
        first_time: false,
      });
    }
  }, []);

  console.log(state);

  useMemo(() => {
    localStorage.setItem("user_data", JSON.stringify(state));
    console.log("LOCAL STORAGE", JSON.parse(localStorage.getItem("user_data")));
    return state;
  }, [state]);

  return (
    <div className={`App ${state?.Lightmode === true ? "" : "dark"}`}>
      {showInfo && <DemoPortal closethis={closeInfoButtonHandler} />}
      <NavigationBar
        openthis={openInfoButtonHandler}
        closethis={closeInfoButtonHandler}
      />
      {(response || old_data !== null) && <Clues />}
      {(response || old_data !== null) && <Guess />}
      {state.lost && <p>You Lost! Try Again</p>}
      {/* // create a modal */}
      {state.gameWon && <p> You Won the match</p>}
    </div>
  );
}

export default App;
