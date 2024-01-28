import { Alert, Pressable, Text, View } from 'react-native'
import { useCallback } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
// when user log in, id token will be retrieved from azure and store on storage, user info will be stored automatically to storage
// id token is handled explicitly. In future it will be encrypted and maintain seperatly.
const SignInScreen = () => {
  const { data: user, isLoading, refetch: getUserInfo } = useGetUsersQuery()

  const handleAuthorize = useCallback(async () => {
    try {
      const authInfo = await getAuthToken()
      getUserInfo()
      console.log('user on authentication....', user)
    } catch (error) {
      console.log(error)
      Alert.alert('Failed to log in', error.message)
    }
  }, [])
  return (
    <>
      <View>
        <Text>Sign in Screen</Text>
      </View>
      <Pressable
        onPress={() => {
          handleAuthorize()
        }}
      >
        <Text>Authorize</Text>
      </Pressable>
    </>
  )
}

export default SignInScreen
