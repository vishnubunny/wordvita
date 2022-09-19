import NavigationBar from "./Components/NavigationBar";
import "./app.scss";
import Guess from "./Components/Guess";
import Clues from "./Components/Clues";
import { DataContext } from "./ContextAPI/dataContext";
import { useContext, useState } from "react";
import DemoPortal from "./Portal/DemoPortal";

function App() {
  const { state, dispatch } = useContext(DataContext);
  // console.log(state);

  const [showInfo, setShowInfo] = useState(false);
  const closeInfoButtonHandler = () => {
    setShowInfo(false);
  };
  const openInfoButtonHandler = () => {
    setShowInfo(true);
  };

  return (
    <div className={`App ${state?.Lightmode === true ? "" : "dark"}`}>
      {showInfo && <DemoPortal closethis={closeInfoButtonHandler} />}
      <NavigationBar
        openthis={openInfoButtonHandler}
        closethis={closeInfoButtonHandler}
      />
      <Clues />
      <Guess />
      {state.lost && <p>You Lost! Try Again</p>}
      {/* // create a modal */}
      {state.gameWon && <p> You Won the match</p>}
    </div>
  );
}

export default App;
