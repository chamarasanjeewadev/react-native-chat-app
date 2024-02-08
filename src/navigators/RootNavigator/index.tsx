import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TabNavigator } from '../TabNavigator'
import SignInScreen from '../../screens/SignInScreen'
import { getIdToken } from '../../utils/tokenUtils'
import { ErrorBoundary } from 'react-error-boundary'
import { themes } from '../../utils/theme'
import { vars, useColorScheme } from 'nativewind'
import { useSettingStore } from '../../stores/settingStore'
import { useAuthStore } from '../../stores/AuthStore'
interface ThemeProps extends PropsWithChildren {
  name: string
}
export function Theme({ name, children }: ThemeProps) {
  console.log('name', name)
  const colorScheme = useColorScheme()
  const theme = vars(themes[name ?? 'blue'][colorScheme.colorScheme ?? 'light'])
  return <View style={[{ flex: 1 }, theme]}>{children}</View>
}
const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
  const { user: userInfo } = useAuthStore()
  // const { data: userInfo } = useGetUsersQuery() // this is expected to be fetched from storage
  const idToken = getIdToken()
  const [themeColor] = useSettingStore(state => [state.themeColor])
  const isUserAvailable = idToken && userInfo
  return (
    <SafeAreaView style={styles.safeArea}>
      <Theme name={themeColor}>
        <ErrorBoundary
          onError={() => {
            console.log('error occured')
          }}
          fallback={<Text>Something went wrong!</Text>}
          onReset={() => {
            console.log('need to reset...')
          }}>
          {!isUserAvailable ? (
            <RootStack.Navigator
              screenOptions={{
                headerShown: false
              }}>
              <RootStack.Screen name="Login" component={SignInScreen} />
            </RootStack.Navigator>
          ) : (
            <RootStack.Navigator
              screenOptions={{
                headerShown: false
              }}>
              <RootStack.Screen name="Home" component={TabNavigator} />
            </RootStack.Navigator>
          )}
        </ErrorBoundary>
      </Theme>
    </SafeAreaView>
  )
}

export default RootNavigator

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
