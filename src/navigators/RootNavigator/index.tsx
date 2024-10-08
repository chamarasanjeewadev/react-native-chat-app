import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TabNavigator } from '../TabNavigator'
import SignInScreen from '../../screens/SignInScreen'
import { getIdToken } from '../../utils/tokenUtils'
import { ErrorBoundary } from 'react-error-boundary'
import { useSettingStore } from '../../stores/settingStore'
import { useAuthStore } from '../../stores/AuthStore'
import MButton from '../../components/atoms/MButton'
import MModal from '../../components/organisms/Modal'
import { SubscriptionAlert } from '../../components/organisms/SubscriptionAlert'
import { useGetUsersQuery } from '../../hooks/queries'
import { useMTheme } from '../../hooks/useMTheme'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export const Theme = ({ children }: ViewProps) => {
  const { theme } = useMTheme()
  return <View style={[{ flex: 1 }, theme]}>{children}</View>
}

const Fallback = ({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: any }) => {
  return (
    <View>
      <Text>{JSON.stringify(error?.message)}</Text>
      <MButton onPress={resetErrorBoundary}>Try again</MButton>
    </View>
  )
}
const RootStack = createNativeStackNavigator()
const RootNavigator = () => {
  const { setPremiumModal, premiumModal } = useSettingStore()
  const { isAuthenticated } = useAuthStore()
  useGetUsersQuery() // this is expected to be fetched from storage
  const idToken = getIdToken()
  const isUserAvailable = isAuthenticated && idToken
  return (
    <SafeAreaView style={styles.safeArea}>
      <Theme>
        <ErrorBoundary
          onError={() => {
            console.log('error occured')
          }}
          FallbackComponent={Fallback}
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
            <>
              <RootStack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                <RootStack.Screen name="Home" component={TabNavigator} />
              </RootStack.Navigator>
              <MModal
                visible={premiumModal}
                onClose={() => {
                  setPremiumModal(false)
                }}>
                <SubscriptionAlert />
              </MModal>
            </>
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
