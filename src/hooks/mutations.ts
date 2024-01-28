import { useMutation } from '@tanstack/react-query'
import { postMessage } from '../services/apiService'

export const usePostMessage = () => {
  const mutation = useMutation({
    mutationFn: postMessage
  })
  return mutation
}
