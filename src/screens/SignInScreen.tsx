import { Alert, Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useCallback, useState } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
import { fontFamily } from '../utils/fonts/fontFamily'
import { MText } from '../components/atoms/MText'
import Snackbar from 'react-native-snackbar'
import MChatButton from '../components/atoms/MChatButton'
import { useAuthStore } from '../stores/AuthStore'
// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
  const { data: user, isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { setIdToken: setAuthToken, idToken: authToken, setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const handleAuthorize = useCallback(async () => {
    try {
      setLoading(true)
      await getAuthToken()
      getUserInfo().then(res => {
        console.log('loginUser....', user)
        setUser(user)
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT
      })
      // Alert.alert('Failed to log in',)
    }
  }, [])
  return (
    <View className="flex items-center justify-center h-screen">
      {
        <MChatButton
          disabled={loading}
          className="bg-green w-[100px] mb-2 p-0 text-center h-auto"
          onPress={() => handleAuthorize()}>
          <Text className="dark:text-white text-lg text-center py-2 ">
            {loading ? 'loading..' : 'authorize'}
          </Text>
        </MChatButton>
      }
    </View>
  )
}

export default SignInScreen
