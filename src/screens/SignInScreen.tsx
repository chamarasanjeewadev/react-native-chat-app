import { View } from 'react-native'
import { useCallback } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
import Snackbar from 'react-native-snackbar'
import { useAuthStore } from '../stores/AuthStore'
import MButton from '../components/atoms/MButton'
import useSnackBar from '../hooks/useSnackBar'
// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
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
      console.log(error)
      showSnackBar({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }, [])
  return (
    <View className="flex h-screen items-center justify-center">
      {
        <MButton
          buttonText="Authorize"
          loading={isLoading}
          disabled={isLoading}
          className="px-2 py-2 text-lg"
          onPress={() => handleAuthorize()}
        />
      }
    </View>
  )
}

export default SignInScreen
