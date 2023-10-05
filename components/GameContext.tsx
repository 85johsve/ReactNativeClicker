import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { GameData, KnownAction, initialState } from "./Reducer";

const GameContext = createContext<GameData>(null as any);
const GameContextDispatch = createContext<React.Dispatch<KnownAction>>(
  null as any
);

export function GameCounterProvider(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("Data");
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          dispatch({ type: "loadStateData", payload: parsedData });
        }
      } catch (e) {}
    };

    loadData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(state);
        await AsyncStorage.setItem("Data", jsonValue);
      } catch (e) {}
    };

    storeData();
  }, [state]);

  useEffect(() => {
    const interval = setInterval(
      () => dispatch({ type: "autoIncrement" }),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={state}>
      <GameContextDispatch.Provider value={dispatch}>
        {props.children}
      </GameContextDispatch.Provider>
    </GameContext.Provider>
  );
}

export const useGameState = () => useContext(GameContext);
export const useGameDispatch = () => useContext(GameContextDispatch);
