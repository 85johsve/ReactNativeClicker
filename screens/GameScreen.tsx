import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import Clicker from "../components/Clicker";
import AutoClickerMenu from "../components/AutoClickerMenu";

type Props = NativeStackScreenProps<RootStackParamList, "Game">;

const image = require("../images/field.jpg");

export default function GameScreen({}: Props) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Clicker />
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
          onPress={() => setMenuVisible(true)}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            BUY
          </Text>
        </Pressable>
        <AutoClickerMenu
          isVisible={isMenuVisible}
          onClose={() => setMenuVisible(false)}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  pressable: {
    backgroundColor: "rgb(252, 223, 225)",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});
