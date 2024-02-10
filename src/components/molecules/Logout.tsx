import * as React from 'react'
import { deleteIdToken } from '../../utils/tokenUtils'
import { useAuthStore } from '../../stores/AuthStore'
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
      intent="primary"
      size="large"
      loading={false}
      className="m-3  p-3 text-center"
      onPress={handleLogout}>
      {'Log out'}
    </MButton>
  )
}
