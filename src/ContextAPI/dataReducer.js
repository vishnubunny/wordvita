export const INITIAL_STATE = {
  guesses: [],
  guess_percent: [],
  clues: [],
  ans: [],
  guesses_left: 6,
  error: false,
  gameWon: false,
  // lost: false,
  Lightmode: true,
  valid: [],
  active: 0,
};

export const dataReducer = (state, action) => {
  // console.log(action.valid_index);
  switch (action.type) {
    //Play again will also trigger this
    case "SET_INITIAL_DATA": {
      console.log("Set initial data", state);

      if (action.first_time) {
        return {
          ...state,
          clues: action.payload[0],
          ans: action.payload[1],
        };
      } else
        return {
          ...state,
          clues: action.old.clues,
          ans: action.old.ans,
          guesses: action.old.guesses,
          guesses_left: action.old.guesses_left,
          gameWon: action.old.gameWon,
          valid: action.old.valid,
          active: action.old.active,
          Lightmode: action.old.Lightmode,
          guess_percent: action.old.guess_percent,
        };
    }
    case "INVALID_WORD": {
      console.log("invalid word", state);
      return {
        ...state,
        error: true,
      };
    }
    case "ANSWER_CORRECT": {
      console.log("correct word", state);
      return {
        ...state,
        guesses: [...state.guesses, action.input_value],
        guess_percent: [...state.guess_percent, 100],
        guesses_left: state.guesses_left - 1,
        gameWon: true,
        valid: [...state.valid, true],
        active: 5,
      };
    }
    case "ANSWER_INCORRECT": {
      console.log("incorrect word", state);
      console.log(action.valid_index);
      return {
        ...state,
        guesses: [...state.guesses, action.input_value],
        guess_percent: [...state.guess_percent, action.percent],
        guesses_left: state.guesses_left - 1,
        valid: [...state.valid, true],
        active: state.active + 1,
      };
    }
    case "LOST": {
      console.log("LOST", state);
      return {
        ...state,
        lost: true,
        // gameWon: false,
      };
    }

    case "TOGGLE": {
      console.log("Toggle", state);

      return {
        ...state,
        Lightmode: !state.Lightmode,
      };
    }
    default:
      return state;
  }
};
