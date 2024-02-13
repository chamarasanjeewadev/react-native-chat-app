import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatsScreen from '../screens/ChatsScreen'
import SectionsScreen from '../screens/SectionsScreen'

export type ChatStackParamList = {
  Chat: undefined
  Section: { section?: { title: string; id?: string } }
}

const ChatStack = createNativeStackNavigator<ChatStackParamList>()

export const ChatNavigator = () => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: true
    }}
    initialRouteName="Chat">
    <ChatStack.Screen name="Chat" component={ChatsScreen} />
    <ChatStack.Screen name="Section" component={SectionsScreen} />
  </ChatStack.Navigator>
)
