import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { GameCounterProvider } from "./components/GameContext";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <GameCounterProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "rgb(252, 223, 225)" },
            headerTitleAlign: "center",
            headerShadowVisible: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </GameCounterProvider>
    </NavigationContainer>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(252, 223, 225)",
    background: "rgb(252, 223, 225)",
  },
};
