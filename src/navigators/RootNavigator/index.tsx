import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { TabNavigator } from '../TabNavigator'
import SignInScreen from '../../screens/SignInScreen'
import { useGetUsersQuery } from '../../hooks/queries'
import { getIdToken } from '../../utils/tokenUtils'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuthStore } from '../../stores/AuthStore'

const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
  const { data: userInfo } = useGetUsersQuery() // this is expected to be fetched from storage
  const idToken = getIdToken()
  const { setIdToken: setAuthToken, idToken: authToken, user, setUser } = useAuthStore()
  const isUserAvailable = idToken && userInfo
  console.log('isUseravailable...', isUserAvailable)
  return (
    <SafeAreaView style={styles.safeArea}>
      <ErrorBoundary
        onError={() => {
          console.log('error occured')
        }}
        fallback={<Text>Something went wrong!</Text>}
        onReset={() => {
          console.log('need to reset...')
        }}>
        {/* {!isUserAvailable ? ( // TODO refactor this to a hook
          <RootStack.Navigator
            screenOptions={{
              headerShown: false
            }}>
            <RootStack.Screen name="Login" component={SignInScreen} />
          </RootStack.Navigator>
        ) : ( */}
        <RootStack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <>
            {!isUserAvailable ? (
              <RootStack.Screen name="Login" component={SignInScreen} />
            ) : (
              <RootStack.Screen name="Home" component={TabNavigator} />
            )}
          </>
        </RootStack.Navigator>
        {/* ) */}
        {/* } */}
      </ErrorBoundary>
    </SafeAreaView>
  )
}

export default RootNavigator

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
