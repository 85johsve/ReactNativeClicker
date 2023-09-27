import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GameCounterProvider } from "./components/GameContext";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

// type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

// type GameScreenProps = NativeStackScreenProps<RootStackParamList, "Game">;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <GameCounterProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </GameCounterProvider>
    </NavigationContainer>
  );
}
