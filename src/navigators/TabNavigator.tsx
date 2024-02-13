import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeNavigator } from './HomeNavigator'
import PracticeScreen from '../screens/PracticeScreen'
import HomeSmile from '../assets/icons/svgs/home.svg'
import Chats from '../assets/icons/svgs/chats.svg'
import Practise from '../assets/icons/svgs/practise.svg'
import Settings from '../assets/icons/svgs/settings.svg'
import Explore from '../assets/icons/ExploreIcon'
import PracticeIcon from '../assets/icons/PracticeIcon'
import { ProfileIcon } from '../assets/icons'
import { useTranslation } from 'react-i18next'
import ProfileScreen from '../screens/ProfileScreen-old'
import { ChatNavigator } from './ChatNavigator'
import SettingsScreen from '../screens/SettingsScreen'

export type BottomTabNavigatorParamList = {
  home: any | undefined // TODO: add proper typings
  chats: any | undefined
  practice: any | undefined
  profile: any | undefined
  settings: any
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const TabNavigator = () => {
  const { t, i18n } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={'chats'}
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
          tabBarIcon: Chats
        }}
        name="chats"
        component={ChatNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Practice',
          tabBarIcon: Practise
        }}
        name="practice"
        component={PracticeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          tabBarLabel: t('settings.title'),
          tabBarIcon: Settings
        }}
        name="settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  )
}
