import { Button, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";
import { GameData } from "./Reducer";

export default function AutoClicker({
  name,
}: {
  name: keyof GameData["autoclickers"];
}) {
  const { clicks, autoclickers } = useGameState();
  const dispatch = useGameDispatch();

  const autoclicker = autoclickers[name];
  if (!autoclicker) return null;

  const buy = () => dispatch({ type: "increment", payload: name });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{name}</Text>
      <Text>cost: {autoclicker.cost}</Text>
      <Text>Amount: {autoclicker.amount}</Text>
      <Button title={`buy ${name}`} onPress={buy}></Button>
    </View>
  );
}
