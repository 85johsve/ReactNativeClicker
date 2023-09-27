import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";
import { useCount } from "../components/GameContext";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;



export default function GameScreen({ navigation }: Props) {
  const { count, inc } = useCount();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      PLAY!!
      <Button title="PLAY" onPress={inc} />
      <View>Amount: {count}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
