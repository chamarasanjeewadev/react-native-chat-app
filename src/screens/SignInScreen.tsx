import { Text, View } from 'react-native'
import { useCallback } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
import Snackbar from 'react-native-snackbar'
import MChatButton from '../components/atoms/MChatButton'
import { useAuthStore } from '../stores/AuthStore'
// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
  const { isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { setUser } = useAuthStore()

  const handleAuthorize = useCallback(async () => {
    try {
      await getAuthToken()
      getUserInfo().then(data => {
        setUser(data?.data?.user)
      })
    } catch (error) {
      console.log(error)
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }, [])
  return (
    <View className="flex items-center justify-center h-screen">
      {
        <MChatButton
          loading={isLoading}
          disabled={isLoading}
          className=""
          onPress={() => handleAuthorize()}>
          <Text className="dark:text-white text-lg text-center py-2 align-middle items-center justify-center ">
            Authorize
          </Text>
        </MChatButton>
      }
    </View>
  )
}

export default SignInScreen
