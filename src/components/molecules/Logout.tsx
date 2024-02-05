import * as React from 'react'
import MChatButton from '../atoms/MChatButton'
import { deleteIdToken } from '../../utils/tokenUtils'
import { useAuthStore } from '../../stores/AuthStore'
import { Text } from 'react-native'
import MButton from '../atoms/MButton'
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
    <MButton
      buttonText="Log out"
      onPress={() => {
        handleLogout()
      }}
    />
  )
}
