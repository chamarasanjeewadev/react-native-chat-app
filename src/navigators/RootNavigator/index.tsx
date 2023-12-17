import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { TabNavigator } from "../TabNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
