import React from 'react'
import { BottomTabNavigatorParamList } from './TabNavigator'
import HomeScreen from '../screens/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type HomeNavigatorParamList = {
  Home: {
    tips?: boolean
    selectTab?: string | null
  }
}

export type HomeNavigatorParams = HomeNavigatorParamList & any & BottomTabNavigatorParamList
const HomeStack = createNativeStackNavigator<any>()

export const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
)
