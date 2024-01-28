import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeNavigator } from './HomeNavigator'
import PracticeScreen from '../screens/PracticeScreen'
import ChatsScreen from '../screens/ChatsScreen'
import HomeSmile from '../assets/icons/HomeSmile'
import Explore from '../assets/icons/ExploreIcon'
import PracticeIcon from '../assets/icons/PracticeIcon'
import { ProfileIcon } from '../assets/icons'
import { useTranslation } from 'react-i18next'
import ProfileScreen from '../screens/ProfileScreen'
import { ChatNavigator } from './ChatNavigator'

export type BottomTabNavigatorParamList = {
  home: any | undefined // TODO: add proper typings
  explore: any | undefined
  practice: any | undefined
  profile: any | undefined
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const TabNavigator = () => {
  const { t, i18n } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={'explore'}
      screenOptions={{
        tabBarStyle: { paddingTop: 10, paddingBottom: 10, height: 50 }
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: HomeSmile
        }}
        name="home"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarIcon: Explore
        }}
        name="explore"
        component={ChatNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Practice',
          tabBarIcon: PracticeIcon
        }}
        name="practice"
        component={PracticeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}
