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
import { LoginInComp } from '../components/organisms/LoginIn'
console.log('firebase enabled............', Config.FIREBASE_ENABLED)

const SignInScreen = () => {
  const [isUserRegistering, setIsUserRegistering] = useState(false)
  const [idtoken, setIdToken] = useState('')
  function onAuthStateChanged(user) {
    console.log('user', user)
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId: Config.WEB_CLIENT_ID
    })
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  const { isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { setUser } = useAuthStore()
  const { showSnackBar } = useSnackBar()

  const handleAuthorize = useCallback(async () => {
    try {
      setIsUserRegistering(true)
      await getAuthToken()
      getUserInfo().then(data => {
        // TODO may be we dont need to update zustand storage
        setUser(data.data)
        setIsUserRegistering(false)
      })
    } catch (error) {
      console.log('error at sign in', error)
      showSnackBar({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT
      })
    } finally {
      setIsUserRegistering(false)
    }
  }, [])

  async function handleFirebaseSignIn() {
    try {
      const { idToken } = await GoogleSignin.signIn()
      console.log('idToken', idToken)
      setIdToken(idToken)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MScreenView className="flex h-screen   bg-corefig">
      <View className="mt-20">
        {!isUserRegistering ? (
          <View className="mt-20 items-center gap-2">
            <LoginLogo />
            <View className="w-3/6  items-center">
              <MText intent="primaryHeading" className=" text-lg ">
                Log in to your account
              </MText>
              <MText intent="normalText" className=" text-center ">
                Welcome back! Please enter your details.
              </MText>
            </View>
            <MButton
              className="w-full rounded-2xl bg-ash"
              leadingIcon={<GoogleLogo />}
              onPress={() =>
                // Config.FIREBASE_ENABLED.trim() !== 'TRUE'
                //   ? handleFirebaseSignIn()
                handleAuthorize()
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
              <MText intent="normalText" size="small">
                Don’t have an account?
              </MText>
              <MButton intent="link" size="large">
                Sign up.
              </MButton>
            </View>
            {idtoken && <MText>{idtoken}</MText>}
          </View>
        ) : (
          <LoginInComp />
        )}
      </View>
    </MScreenView>
  )
}

export default SignInScreen
