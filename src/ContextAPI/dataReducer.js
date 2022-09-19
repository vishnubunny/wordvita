export const INITIAL_STATE = {
  guesses: [],
  clues: [1, 2 , 3 , 4],
  ans: "test",
  guesses_left: 3,
  error: false,
  gameWon: false,
  lost: false,
  Lightmode: true,
  valid: [],
  active: 0,
};

export const dataReducer = (state, action) => {
  console.log(action.valid_index);
  switch (action.type) {
    //Play again will also trigger this
    case "SET_INITIAL_DATA": {
      console.log("Set initial data", state);
      return {
        ...state,
        clues: [], // data form server
        ans: "",
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
        gameWon: true,
        valid: [...state.valid, true],
        active: state.active + 1,
      };
    }
    case "ANSWER_INCORRECT": {
      console.log("incorrect word", state);
      console.log(action.valid_index);
      return {
        ...state,
        guesses: [...state.guesses, action.input_value],
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
