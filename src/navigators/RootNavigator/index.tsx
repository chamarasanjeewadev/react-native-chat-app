import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useCallback } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { TabNavigator } from '../TabNavigator'
import SignInScreen from '../../screens/SignInScreen'
import { useGetUsersQuery } from '../../hooks/queries'
import { getIdToken, setIdToken } from '../../utils/tokenUtils'

const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
  const { data: user } = useGetUsersQuery() // this is expected to be fetched from storage
  const idToken = getIdToken()
  const isUserAvailable = idToken && user
  return (
    <SafeAreaView style={styles.safeArea}>
      {!isUserAvailable ? ( // TODO refactor this to a hook
        <RootStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <RootStack.Screen name="Login" component={SignInScreen} />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <RootStack.Screen name="Home" component={TabNavigator} />
        </RootStack.Navigator>
      )}
    </SafeAreaView>
  )
}

export default RootNavigator

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
