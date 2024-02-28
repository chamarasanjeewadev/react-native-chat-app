import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConversationsScreen from '../screens/ConversationsScreen'
import SectionsScreen from '../screens/SectionsScreen'
import { AudioProvider } from '../hooks/AudioProvider'

export type ChatStackParamList = {
  Chat: undefined
  Section: { section?: { title: string; id?: string }; difficulty: number }
}

const ChatStack = createNativeStackNavigator<ChatStackParamList>()

export const ChatNavigator = () => (
  <AudioProvider>
    <ChatStack.Navigator
      screenOptions={{
        headerShown: true
      }}
      initialRouteName="Chat">
      <ChatStack.Screen
        options={{ headerBackTitleVisible: false }}
        name="Chat"
        component={ConversationsScreen}
      />
      <ChatStack.Screen
        options={{ headerBackTitleVisible: false }}
        name="Section"
        component={SectionsScreen}
      />
    </ChatStack.Navigator>
  </AudioProvider>
)
