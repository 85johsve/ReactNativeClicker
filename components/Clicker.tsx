import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";

export default function Clicker() {
  const { clicks } = useGameState();
  const [scaleValue] = useState(new Animated.Value(1));
  const dispatch = useGameDispatch();

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{clicks.amount}</Text>
      <Pressable
        onPress={() => {
          animatedButton();
          dispatch({ type: "click" });
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
    width: 150,
    height: 80,
  },
});
