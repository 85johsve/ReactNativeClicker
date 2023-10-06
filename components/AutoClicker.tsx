import React, { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useGameDispatch, useGameState } from "./GameContext";
import { GameData } from "./Reducer";

interface Props {
  name: keyof GameData["autoclickers"];
}

export default function AutoClicker({ name }: Props) {
  const { autoclickers } = useGameState();
  const dispatch = useGameDispatch();

  const [pressableScale] = useState(new Animated.Value(1));

  const autoclicker = autoclickers[name];
  if (!autoclicker) return null;

  const animatedButton = () => {
    Animated.parallel([
      Animated.timing(pressableScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(pressableScale, {
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
              transform: [{ scale: pressableScale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.cloudTextContainer,
            { transform: [{ scale: pressableScale }] },
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
    left: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  cloudText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
