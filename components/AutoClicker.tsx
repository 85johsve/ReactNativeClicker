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

  const [imageScale] = useState(new Animated.Value(1));
  const [textScale] = useState(new Animated.Value(1));

  const autoclicker = autoclickers[name];
  if (!autoclicker) return null;

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
          <Text style={styles.cloudText}>{name}</Text>
          <Text style={styles.cloudText}>cost: {autoclicker.cost}</Text>
          <Text style={styles.cloudText}>Amount: {autoclicker.amount}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cloudImage: {
    width: 300,
    height: 160,
  },
  cloudTextContainer: {
    position: "absolute",
    top: "35%",
    left: "35%",
    alignItems: "center",
    justifyContent: "center",
  },
  cloudText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
