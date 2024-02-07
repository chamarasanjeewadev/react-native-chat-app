import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TabNavigator } from '../TabNavigator'
import SignInScreen from '../../screens/SignInScreen'
import { useGetUsersQuery } from '../../hooks/queries'
import { getIdToken } from '../../utils/tokenUtils'
import { ErrorBoundary } from 'react-error-boundary'
import { themes } from '../../utils/theme'
import { vars, useColorScheme } from 'nativewind'
import { useSettingStore } from '../../stores/settingStore'
import { StripeProvider } from '@stripe/stripe-react-native'
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
  const { data: userInfo } = useGetUsersQuery() // this is expected to be fetched from storage
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
          }}
        >
          {/* <StripeProvider
            publishableKey="pk_test_51NXxwoHwFwFEWRRtmOOsXlcemv7xVSq9G06LFieeOhkEYvYKg5KgSxQMkP6B7yffm2odmwpyYcRnr8WWh6xGyehk004xHJUjBX"
            // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          > */}
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
            }}
          >
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
          {/* </StripeProvider> */}
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
