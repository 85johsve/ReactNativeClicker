import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";
import AutoClicker from "../components/AutoClicker";
import Clicker from "../components/Clicker";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

export default function GameScreen({}: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Clicker />
      <AutoClicker name="autoClicker" />
      <AutoClicker name="doubleClicker" />
      <View></View>
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
