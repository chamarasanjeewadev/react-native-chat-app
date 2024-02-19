import { Button, View } from 'react-native'
import { useCallback, useEffect } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
import Snackbar from 'react-native-snackbar'
import { useAuthStore } from '../stores/AuthStore'
import MButton from '../components/atoms/MButton'
import useSnackBar from '../hooks/useSnackBar'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
  function onAuthStateChanged(user) {
    console.log('user', user)
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId: '428763486515-ifkgpqeaieivn7uirslu854j9h0bjsqg.apps.googleusercontent.com' // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    })
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  const { isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { setUser } = useAuthStore()
  const { showSnackBar } = useSnackBar()

  const handleAuthorize = useCallback(async () => {
    try {
      await getAuthToken()
      getUserInfo().then(data => {
        // TODO may be we dont need to update zustand storage
        setUser(data.data)
      })
    } catch (error) {
      console.log('error at sign in', error)
      // showSnackBar({
      //   text: error.message,
      //   duration: Snackbar.LENGTH_SHORT
      // })
    }
  }, [])

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    console.log('idToken', idToken)
    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential)
  }
  return (
    <View className="flex h-screen items-center justify-center">
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
      {
        <MButton
          loading={isLoading}
          disabled={isLoading}
          className="text-lg"
          onPress={() => handleAuthorize()}>
          Authorize
        </MButton>
      }
    </View>
  )
}

export default SignInScreen
