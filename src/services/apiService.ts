import { Platform } from 'react-native'
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
  sectionId,
  audio
}: {
  textInputValue?: string
  sectionId: string
  audio?: string
}) => {
  const formData = new FormData()
  formData.append('text', textInputValue ?? '')
  formData.append('section_model', JSON.stringify({ difficulty_level: 1 }))
  console.log('audio uri..........', audio)
  formData.append('audio', {
    uri: audio,
    name: 'audio.wav',
    type: 'audio/x-wav'
  })
  // const audioBlob = await new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest()
  //   xhr.onload = function () {
  //     resolve(xhr.response)
  //   }
  //   xhr.onerror = function (e) {
  //     reject(new TypeError('Network request failed'))
  //   }
  //   xhr.responseType = 'blob'
  //   xhr.open('GET', audio, true)
  //   xhr.send(null)
  // })
  // formData.append('audio', audioBlob)
  // formData.append('audio', {
  //   uri: Platform.OS === 'android' ? audio : audio, //.replace('file://', ''),
  //   name: 'test.' + (Platform.OS === 'android' ? 'mp4' : 'm4a'), // Change the file extension based on platform
  //   type: 'audio/' + (Platform.OS === 'android' ? 'mp4' : 'm4a') // Adjust the mime type based on platform
  // })
  // formData.append('audio', {
  //   uri: audio,
  //   type: 'audio/mpeg', // Adjust the mime type based on your audio file type
  //   name: 'audio_recording.m4a' // Adjust the file name as needed
  // })
  const result = await axiosInstance.post<MessageBack>(
    `/conversation/section/${sectionId}/message`,
    formData
    // {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }
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
  const result = await axiosInstance.post<TranslateBack>(
    `/feedback/grammar/${sectionId}`,
    feedbackParams
  )
  return result.data
}
