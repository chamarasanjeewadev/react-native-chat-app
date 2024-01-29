import { Alert, Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useCallback } from 'react'
import { useGetUsersQuery } from '../hooks/queries'
import { getAuthToken } from '../utils/authUtil'
import { fontFamily } from '../utils/fonts/fontFamily'
import { MText } from '../components/atoms/MText'
import Snackbar from 'react-native-snackbar'
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
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT
      })
      // Alert.alert('Failed to log in',)
    }
  }, [])
  return (
    <View>
      <MText className="text-xl" style={{ fontSize: 20 }}>
        test font to test font
      </MText>
      <Button title="Authorize" onPress={() => handleAuthorize()} />
    </View>
  )
}

export default SignInScreen
