import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";
import { GameData } from "./Reducer";

export default function AutoClicker({
  name,
}: {
  name: keyof GameData["autoclickers"];
}) {
  const { autoclickers } = useGameState();
  const dispatch = useGameDispatch();

  const [scaleValue] = useState(new Animated.Value(1));

  const autoclicker = autoclickers[name];
  if (!autoclicker) return null;

  const animatedButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => {
          animatedButton();
          dispatch({ type: "increment", payload: name });
        }}
      >
        <Animated.Image
          source={require("../images/cloud.png")}
          style={[
            styles.cloudImage,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        />
      </Pressable>
      <View style={styles.cloudText}>
        <Text>{name}</Text>
        <Text>cost: {autoclicker.cost}</Text>
        <Text>Amount: {autoclicker.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "transparent",
  },
  cloudImage: {
    width: 300,
    height: 160,
  },
  cloudText: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
  },
});
