import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import AutoClicker from "./AutoClicker";
import { useGameState } from "./GameContext";

export default function AutoClickerMenu({ isVisible, onClose }) {
  const { autoclickers } = useGameState();

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        {Object.keys(autoclickers).map((autoClickerName, index) => {
          return <AutoClicker key={autoClickerName} name={autoClickerName} />;
        })}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgb(118, 177, 170)"
                : "rgb(118, 177, 170)",
              height: 35,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={onClose}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            CLOSE
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
