import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type GameContextValue = {
  count: number;
  inc: () => void;
  dec: () => void;
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function useCount(): GameContextValue {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a GameCounterProvider");
  }
  return context;
}

export function GameCounterProvider(props: PropsWithChildren) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    storeData();
  }, [count]);

  const loadData = async () => {
    try {
      const storedCount = await AsyncStorage.getItem("count");
      if (storedCount !== null) {
        setCount(Number(storedCount));
      }
    } catch (e) {}
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("count", String(count));
    } catch (e) {}
  };

  const inc = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const dec = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <GameContext.Provider value={{ count, inc, dec }}>
      {props.children}
    </GameContext.Provider>
  );
}
