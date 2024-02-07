import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeNavigator } from './HomeNavigator'
import PracticeScreen from '../screens/PracticeScreen'
import HomeSmile from '../assets/icons/HomeSmile'
import Explore from '../assets/icons/ExploreIcon'
import PracticeIcon from '../assets/icons/PracticeIcon'
import { ProfileIcon } from '../assets/icons'
import { useTranslation } from 'react-i18next'
import ProfileScreen from '../screens/ProfileScreen-old'
import { ChatNavigator } from './ChatNavigator'
import SettingsScreen from '../screens/SettingsScreen'

export type BottomTabNavigatorParamList = {
  home: any | undefined // TODO: add proper typings
  explore: any | undefined
  practice: any | undefined
  profile: any | undefined
  settings: any
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const TabNavigator = () => {
  const { t, i18n } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={'settings'}
      screenOptions={{
        tabBarStyle: { paddingTop: 5, paddingBottom: 5, height: 50 }
      }}>
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
          headerShown: true,
          tabBarLabel: t('settings.title'),
          tabBarIcon: ProfileIcon
        }}
        name="settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  )
}
