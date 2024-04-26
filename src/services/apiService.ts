import { axiosInstance } from '../utils/axiosApiUtil'
export const signIn = async () => {
  const result = await axiosInstance.post<AuthResponse>(`/user/login`)

  return result.data
}

export const getMilaUserChats = async () => {
  const result = await axiosInstance.get<ChatsResponse>(`/user/sections/mila`, {})

  return result.data
}
export const postMessage = async ({
  textInputValue,
  sectionId,
  audio
}: {
  textInputValue?: string
  sectionId: string
  audio?: string
}) => {
  console.log('insid post message...', audio)
  const formData = new FormData()
  formData.append('section_model', JSON.stringify({ difficulty_level: 1 }))
  if (textInputValue) {
    formData.append('text', textInputValue ?? '')
  }
  if (audio) {
    formData.append('audio', {
      uri: audio,
      name: 'audio.m4a',
      type: 'audio/x-wav'
    })
  }

  const result = await axiosInstance.post<MessageBack>(
    `/conversation/section/${sectionId}/message`,
    formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return result.data
}
export const postUserInfo = async (updatableInfo: UpdateUser) => {
  const result = await axiosInstance.patch<UserUpdateResponse>(`/user/update`, updatableInfo)
  return result.data
}

export const firstChat = async (difficulty_level: number, sectionId: string) => {
  const result = await axiosInstance.post<MessageBack>(`/conversation/section/${sectionId}`, {
    difficulty_level
  })
  return result.data
}

export const subscriptionIntent = async (priceId: string) => {
  const result = await axiosInstance.post<StripePaymentIntent>(`/stripe/create-payment-intent`, {
    price_id: priceId
  })
  return result.data
}
export const cancelSubscription = async () => {
  const result = await axiosInstance.post<string>(`/stripe/cancel-subscription`)
  return result.data
}
export const reactivateSubscription = async () => {
  const result = await axiosInstance.post<string>(`/stripe/reactivate-subscription`)
  return result.data
}
export const contextTranslate = async (text: string) => {
  const result = await axiosInstance.post<ContextTranslateBack>(`/feedback/contexttranslate`, {
    text
  })
  return result.data
}

export const getSlowAudio = async (sectionId: string, text: string) => {
  const result = await axiosInstance.post<string>(`conversation/get_slow_audio/${sectionId}`, {
    text
  })
  return result.data
}

export const getTokenAudio = async (text: string) => {
  const result = await axiosInstance.post<WordTranslations>(`feedback/word_info`, {
    text
  })
  return result.data
}
export const retry = (sectionId: string, difficulty: number) =>
  axiosInstance.post<RetryBack>(`/conversation/section/${sectionId}/retry`, {
    difficulty_level: difficulty
  })

export const feedbackTranslate = async ({
  sectionId,
  ...feedbackParams
}: FeedbackTranslateType) => {
  const result = await axiosInstance.post<TranslateBack>(
    `/feedback/translate/${sectionId}`,
    feedbackParams
  )
  return result.data
}
export const feedbackGrammar = async ({ sectionId, ...feedbackParams }: GrammarTranslateType) => {
  const result = await axiosInstance.post<GrammarBack>(
    `/feedback/grammar/${sectionId}`,
    feedbackParams
  )
  return result.data
}
