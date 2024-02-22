import { Button, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
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
import LoginLogo from '../assets/icons/svgs/loginLogo.svg'
import GoogleLogo from '../assets/icons/svgs/google.svg'
import AppleLogo from '../assets/icons/svgs/appleIcon.svg'
import { MText } from '../components/atoms/MText'
import { MScreenView } from '../components/atoms/MScreenView'
import { Config } from 'react-native-config'
console.log('firebase enabled............', Config.FIREBASE_ENABLED)

// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
  const [idtoken, setIdToken] = useState('')
  function onAuthStateChanged(user) {
    console.log('user', user)
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId: '893224056607-efodmdrlm5gr0eug0judgksoa21hlioi.apps.googleusercontent.com'
      // webClientId: '428763486515-ifkgpqeaieivn7uirslu854j9h0bjsqg.apps.googleusercontent.com' // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    })
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  const { isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { setUser } = useAuthStore()
  const { showSnackBar } = useSnackBar()

  const handleAuthorize = useCallback(async () => {
    console.log('handle authorize')
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

  async function handleFirebaseSignIn() {
    try {
      // Check if your device supports Google Play
      // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn()
      console.log('idToken', idToken)
      setIdToken(idToken)
      // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      // // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MScreenView className="flex h-screen   bg-corefig">
      <View className="mt-20 items-center gap-2">
        <LoginLogo />
        <View className="w-3/6  items-center">
          <MText intent="primaryHeading" className=" text-lg ">
            Log in to your account
          </MText>
          <MText intent="primaryHeading" className=" text-center font-normal  ">
            Welcome back! Please enter your details.
          </MText>
        </View>
        <MButton
          className="w-full rounded-2xl bg-ash"
          leadingIcon={<GoogleLogo />}
          onPress={() =>
            Config.FIREBASE_ENABLED.trim() !== 'TRUE' ? handleFirebaseSignIn() : handleAuthorize()
          }>
          Log in with google
        </MButton>
        <MButton
          className="w-full rounded-2xl bg-ash"
          leadingIcon={<AppleLogo />}
          onPress={() => {
            console.log('sign in with apple')
          }}>
          Log in with apple
        </MButton>
        <View className="align-center flex-row items-center  justify-center gap-2 ">
          <MText>Don’t have an account?</MText>
          <MButton intent="link" size="large">
            Sign up.
          </MButton>
        </View>
        {idtoken && <MText>{idtoken}</MText>}
      </View>
    </MScreenView>
  )
}

export default SignInScreen
