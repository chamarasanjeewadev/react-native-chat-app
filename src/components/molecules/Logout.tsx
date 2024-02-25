import * as React from 'react'
import { deleteIdToken } from '../../utils/tokenUtils'
import { useAuthStore } from '../../stores/AuthStore'
import MButton from '../atoms/MButton'
import { queryClient } from '../../utils/queryClient'
export const Logout = () => {
  const { setUser, setAuthenticated } = useAuthStore()
  const handleLogout = async () => {
    try {
      deleteIdToken()
      setUser(null)
      setAuthenticated(false)
      queryClient.invalidateQueries({ queryKey: ['user'] })
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
