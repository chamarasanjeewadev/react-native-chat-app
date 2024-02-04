import * as React from 'react'
import MChatButton from '../atoms/MChatButton'
import { deleteIdToken } from '../../utils/tokenUtils'
import { useAuthStore } from '../../stores/AuthStore'
import { Text } from 'react-native'
export const Logout = () => {
  const { setUser } = useAuthStore()
  const handleLogout = async () => {
    try {
      deleteIdToken()
      setUser(null)
    } catch (error) {
      console.log('error deleting token...')
    }
  }
  return (
    <MChatButton
      className="bg-green w-[100px] mb-2 p-0 text-center h-auto bg-mila-gray-50"
      onPress={() => {
        handleLogout()
      }}>
      <Text className="dark:text-white text-lg text-center py-2 ">Log out</Text>
    </MChatButton>
  )
}
