import { axiosInstance } from '../utils/axiosApiUtil'
export const signIn = async () => {
  const result = await axiosInstance.post<AuthResponse>(`/user/login`)
  return result.data
}

export const getMilaUserChats = async () => {
  const result = await axiosInstance.get<AuthResponse>(`/user/sections/mila`, {})
  return result.data
}
export const postMessage = async ({
  textInputValue,
  sectionId
}: {
  textInputValue: string
  sectionId: string
}) => {
  const formData = new FormData()
  formData.append('text', textInputValue ?? '')
  formData.append('section_model', JSON.stringify({ difficulty_level: 1 }))
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

export const firstChat = async (difficulty_level: number, sectionId: string) => {
  const result = await axiosInstance.post<MessageBack>(`/conversation/section/${sectionId}`, {
    difficulty_level
  })
  return result.data
}
export const contextTranslate = async (text: string) => {
  const result = await axiosInstance.post<ContextTranslateBack>(`/feedback/contexttranslate`, {
    text
  })
  return result.data
}
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
  console.log('feedback params', feedbackParams)
  const result = await axiosInstance.post<TranslateBack>(
    `/feedback/grammar/${sectionId}`,
    feedbackParams
  )
  return result.data
}
