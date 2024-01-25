import React from "react";
import { BottomTabNavigatorParamList } from "./TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "../screens/ChatsScreen";
import SectionsScreen from "../screens/SectionsScreen";

export type HomeNavigatorParamList = {
  Home: {
    tips?: boolean;
    selectTab?: string | null;
  };
};

export type HomeNavigatorParams = HomeNavigatorParamList &
  any &
  BottomTabNavigatorParamList;
const ChatStack = createNativeStackNavigator<any>();

export const ChatNavigator = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: true,
    }}
    initialRouteName="Chat"
  >
    <ChatStack.Screen name="Chat" component={ChatsScreen} />
    <ChatStack.Screen name="Section" component={SectionsScreen} />
  </ChatStack.Navigator>
);
