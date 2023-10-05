import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";

export default function Clicker() {
  const { clicks } = useGameState();
  const [imageScale] = useState(new Animated.Value(1));
  const [textScale] = useState(new Animated.Value(1));
  const dispatch = useGameDispatch();

  const animatedButton = () => {
    Animated.parallel([
      Animated.timing(imageScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{clicks.amount}</Text>
      </View>
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
              transform: [{ scale: imageScale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.cloudTextContainer,
            { transform: [{ scale: textScale }] },
          ]}
        >
          <Text>GET UNICORN</Text>
        </Animated.View>
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
  cloudTextContainer: {
    position: "absolute",
    top: "45%",
    left: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: { margin: 50 },
  counterText: {
    fontSize: 50,
  },
});
