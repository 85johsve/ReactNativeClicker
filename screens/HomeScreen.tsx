import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { useGameDispatch } from "../components/GameContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useGameDispatch();
  const handleNewGamePress = () => {
    dispatch({ type: "clearMemory" });
    navigation.navigate("Game");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["rgb(252, 223, 225)", "purple"]}
        style={styles.background}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.pressableContainer}
          onPress={() => navigation.navigate("Game")}
        >
          <Animated.Image
            source={require("../images/cloud.png")}
            style={[styles.cloudImage]}
          />
          <View style={[styles.cloudTextContainer]}>
            <Text style={styles.cloudText}>PLAY</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.pressableContainer}
          onPress={() => handleNewGamePress()}
        >
          <Animated.Image
            source={require("../images/cloud.png")}
            style={[styles.cloudImage]}
          />
          <View style={[styles.cloudTextContainer]}>
            <Text style={styles.cloudText}>NEW GAME</Text>
          </View>
        </Pressable>
      </View>
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
    top: "45%",
    left: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  cloudText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    width: "100%",
    al1ignItems: "center",
    justifyContent: "center",
  },
  pressableContainer: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
