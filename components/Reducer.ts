import AsyncStorage from "@react-native-async-storage/async-storage";

export type GameData = {
  clicks: { amount: number };
  autoclickers: {
    autoClicker: { cost: number; amount: number };
    doubleClicker: { cost: number; amount: number };
    superClicker: { cost: number; amount: number };
    duperClicker: { cost: number; amount: number };
    fluperClicker: { cost: number; amount: number };
  };
};

export const initialState: GameData = {
  clicks: { amount: 0 },
  autoclickers: {
    autoClicker: { cost: 10, amount: 0 },
    doubleClicker: { cost: 50, amount: 0 },
    superClicker: { cost: 100, amount: 0 },
    duperClicker: { cost: 200, amount: 0 },
    fluperClicker: { cost: 300, amount: 0 },
  },
};

type AutoClickerName = keyof GameData["autoclickers"];

type ClickAction = {
  type: "click";
};

type Increment = {
  type: "increment";
  payload: AutoClickerName;
};

type AutoIncrementAction = {
  type: "autoIncrement";
};

type LoadStateDataAction = {
  type: "loadStateData";
  payload: GameData;
};

type DecrementAction = {
  type: "";
};

type ClearMemory = {
  type: "clearMemory";
};

export type KnownAction =
  | ClickAction
  | Increment
  | DecrementAction
  | AutoIncrementAction
  | LoadStateDataAction
  | ClearMemory;

function calculateTotalCount(data: GameData): number {
  const { clicks, autoclickers } = data;

  const autoclickerKeys = Object.keys(
    autoclickers
  ) as (keyof typeof autoclickers)[];

  const autoclickerTotal = autoclickerKeys.reduce((total, key) => {
    const { cost, amount } = autoclickers[key];
    return total + cost * amount * 0.1;
  }, 0);

  const totalCount = clicks.amount + autoclickerTotal;

  return totalCount;
}

export default function reducer(
  state: typeof initialState,
  action: KnownAction
) {
  switch (action.type) {
    case "click":
      return {
        ...state,
        clicks: { amount: state.clicks.amount + 1 },
      };
    case "autoIncrement":
      const totalCount = calculateTotalCount(state);
      return {
        ...state,
        clicks: { ...state.clicks, amount: totalCount },
      };
    case "increment":
      const { payload } = action;
      const autoClicker = state.autoclickers[payload];
      if (autoClicker) {
        const { cost, amount } = autoClicker;
        if (state.clicks.amount >= cost) {
          return {
            ...state,
            clicks: { amount: state.clicks.amount - cost },
            autoclickers: {
              ...state.autoclickers,
              [payload]: { ...autoClicker, amount: amount + 1 },
            },
          };
        }
      }
      return state;

    case "loadStateData":
      return {
        ...state,
        ...action.payload,
      };

    case "clearMemory":
      AsyncStorage.clear().catch((error) => {
        console.error("Error clearing asyncStorage:", error);
      });

      return initialState;

    default:
      return state;
  }
}
