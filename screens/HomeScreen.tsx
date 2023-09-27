import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="PLAY" onPress={() => navigation.navigate("Game")} />
    </View>
  );
}
