import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeNavigator } from './HomeNavigator'
import PracticeScreen from '../screens/PracticeScreen'
import HomeSmile from '../assets/icons/svgs/home.svg'
import Chats from '../assets/icons/svgs/chats.svg'
import Practice from '../assets/icons/svgs/practice.svg'
import Settings from '../assets/icons/svgs/settings.svg'
import { useTranslation } from 'react-i18next'
import { ChatNavigator } from './ChatNavigator'
import SettingsScreen from '../screens/SettingsScreen'
// import clsx from 'clsx'

export type BottomTabNavigatorParamList = {
  home: string // TODO: add proper typings
  chats: string
  practice: string
  profile: string
  settings: string
}

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const TabNavigator = () => {
  const { t, i18n } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={'chats'}
      screenOptions={{
        tabBarInactiveTintColor: 'red',
        tabBarActiveTintColor: 'yellow',
        tabBarStyle: { paddingTop: 5, paddingBottom: 5, height: 50 }
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          // tabBarIcon: HomeSmile,
          tabBarIcon: ({ focused, color }) => (
            <HomeSmile
            // className={clsx(focused ? 'color-black' : 'color-yellow')}
            // color={focused ? 'bg-black' : 'bg-red'}
            />
          )
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
          tabBarIcon: Practice
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
