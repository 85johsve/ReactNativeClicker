import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
import AutoClicker from "./AutoClicker";
import { useGameState } from "./GameContext";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function AutoClickerMenu({ isVisible, onClose }: Props) {
  const { autoclickers } = useGameState();
  const autoclickerNames = Object.keys(autoclickers);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <BlurView style={styles.overlay}>
        {autoclickerNames.map((autoclicker) => {
          return <AutoClicker key={autoclicker} name={autoclicker} />;
        })}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? "rgb(118, 187, 170)"
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
      </BlurView>
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
