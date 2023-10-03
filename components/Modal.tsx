import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import AutoClicker from "./AutoClicker";

export default function AutoClickerMenu({
  autoclickers,
  isVisible,
  onClose,
  onAutoClickerPurchase,
}) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        {Object.keys(autoclickers).map((autoClickerName) => {
          const autoclicker = autoclickers[autoClickerName];
          return (
            <AutoClicker
              key={autoClickerName}
              name={autoClickerName}
              onPurchase={() => onAutoClickerPurchase(autoClickerName)}
            />
          );
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
