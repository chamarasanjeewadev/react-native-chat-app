import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postMessage, postUserInfo } from '../services/apiService'

export const usePostMessage = () => {
  const mutation = useMutation({
    mutationFn: postMessage
  })
  return mutation
}
export const useUserPost = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: postUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
  return mutation
}
