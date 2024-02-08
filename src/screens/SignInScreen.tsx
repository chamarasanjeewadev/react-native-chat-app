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
        const { user } = data?.data || {}
        setUser(user)
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
    <View className="flex h-screen items-center justify-center">
      {
        <MChatButton
          loading={isLoading}
          disabled={isLoading}
          className=""
          onPress={() => handleAuthorize()}>
          <Text className="items-center justify-center py-2 text-center align-middle text-lg dark:text-white ">
            Authorize
          </Text>
        </MChatButton>
      }
    </View>
  )
}

export default SignInScreen
