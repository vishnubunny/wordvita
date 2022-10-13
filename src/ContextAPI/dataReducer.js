export const INITIAL_STATE = {
  guesses: [],
  guess_percent: [],
  clues: [],
  ans: [],
  guesses_left: 5,
  error: 0,
  lost: false,
  Lightmode: true,
  valid: [],
  active: 0,
  stats: [-10, 0, 0, 0, 0],
  gameWon: false,

  played: 0,
  won: 0,
  streak: 0,
  maxStreak: 0,

  opened_date: "",
  next_date: "",
};

export const dataReducer = (state, action) => {
  // console.log(action.valid_index);
  switch (action.type) {
    //Play again will also trigger this
    case "SET_INITIAL_DATA": {
      if (action.first_time) {
        console.log("First time set initial data");
        return {
          ...state,
          clues: action.payload?.clues,
          ans: action.payload?.answers,
          opened_date: action.opened_date,
          next_date: action.next_date,
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
          stats: action.old.stats,
          played: action.old.played,
          won: action.old.won,
          streak: action.old.streak,
          maxStreak: action.old.maxStreak,
          opened_date: action.old.opened_date,
          next_date: action.old.next_date,
        };
    }
    case "PLAYING_NEXT_DAY": {
      console.log("Playing other day");

      return {
        ...state,
        clues: action.payload?.clues,
        ans: action.payload?.answers,
        gameWon: false,

        guesses: [],
        guess_percent: [],
        guesses_left: 6,
        error: 0,
        valid: [],
        active: 0,
        gameWon: false,

        opened_date: action.opened_date,
        next_date: action.next_date,
      };
    }
    case "TESTING": {
      return {
        ...state,
        guesses: [],
        valid: [],
        guess_percent: [],
        guesses_left: 5,
        gameWon: false,
        active: 0,
      };
    }
    case "INVALID_WORD": {
      console.log("invalid word", state);
      return {
        ...state,
        error: Math.random(),
      };
    }
    case "ANSWER_CORRECT": {
      console.log("correct word", action.valid_index);
      return {
        ...state,
        guesses: [...state.guesses, action.input_value],
        guess_percent: [...state.guess_percent, 100],
        guesses_left: state.guesses_left - 1,
        gameWon: 
          
           true,
        
        error: 0,
        valid: [...state.valid, true],
        active: 5,
        stats: state.stats.map((val, ind) => {
          if (action.valid_index === ind) {
            return (state.stats[ind] += 1);
          } else {
            return state.stats[ind];
          }
        }),
        won: state.won + 1,
        played: state.played + 1,
        streak: state.streak + 1,
        maxStreak:
          state.maxStreak <= state.streak ? state.streak + 1 : state.maxStreak,
      };
    }
    case "ANSWER_INCORRECT": {
      console.log("incorrect word", state);
      // console.log(action.valid_index);
      return {
        ...state,
        guesses: [...state.guesses, action.input_value],
        guesses_left: state.guesses_left - 1,
        valid: [...state.valid, true],
        active: state.active + 1,

      };
    }
    case "TIMER": {
      return{
        ...state,
        guess_percent: [...state.guess_percent, action.percent],
      }
    }
    case "LOST": {
      console.log("LOST", state);
      return {
        ...state,
        lost: true,
        streak: 0,
        played: state.played + 1,
        // gameWon: false,
      };
    }

    case "TOGGLE": {

      return {
        ...state,
        Lightmode: !state.Lightmode,
      };
    }
    default:
      return state;
  }
};
