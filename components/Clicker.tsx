import React from "react";
import { Button, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";

export default function Clicker() {
  const { clicks } = useGameState();
  const dispatch = useGameDispatch();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="click button"
        onPress={() => dispatch({ type: "click" })}
      ></Button>
      <Text>{clicks.amount}</Text>
    </View>
  );
}
