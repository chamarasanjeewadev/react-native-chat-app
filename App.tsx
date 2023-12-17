import React from "react";
import type { PropsWithChildren } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
