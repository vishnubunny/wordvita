import { createContext, useReducer } from "react";
import { dataReducer, INITIAL_STATE } from "./dataReducer";

export const DataContext = createContext({ INITIAL_STATE });

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
