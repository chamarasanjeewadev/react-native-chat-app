import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  cancelSubscription,
  postMessage,
  postUserInfo,
  reactivateSubscription
} from '../services/apiService'

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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
  return mutation
}

export const useCancelStripeSubscription = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
  return mutation
}

export const useReactivateStripeSubscription = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: reactivateSubscription,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
  return mutation
}
