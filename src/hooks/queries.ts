import { translateQueryKeys, userQueryKeys } from './queryKeys/index'
import {
  contextTranslate,
  feedbackGrammar,
  feedbackTranslate,
  firstChat
} from '../services/apiService'
import { useQuery } from '@tanstack/react-query'
import { getMilaUserChats, signIn } from '../services/apiService'
import { queryKeys } from './queryKeys'

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: signIn
  })

export const useGetMilaChats = () =>
  useQuery({
    queryKey: queryKeys.chats.milaChats().queryKey,
    queryFn: getMilaUserChats
  })

export const useFirstChat = (difficulty: number, id: string) =>
  useQuery({
    queryKey: queryKeys.chats.chat(id).queryKey,
    queryFn: () => firstChat(difficulty, id),
    enabled: false
  })

export const useContextTranslate = (text: string) =>
  useQuery({
    queryKey: queryKeys.translate.translateText(text).queryKey,
    queryFn: () => contextTranslate(text),
    enabled: !!text
  })
export const useFeedbackTranslate = (
  text: string,
  difficulty_level: number,
  sectionId: string,
  message_id: number
) =>
  useQuery({
    queryKey: queryKeys.translate.feedbackText(text, sectionId, message_id).queryKey,
    queryFn: () =>
      feedbackTranslate({
        text,
        difficulty_level,
        sectionId,
        message_id
      }),
    enabled: false
  })
export const useFeedbackGrammar = (feedbackText: GrammarTranslateType) =>
  useQuery({
    queryKey: queryKeys.translate.feedbackGrammar(feedbackText).queryKey,
    queryFn: () => feedbackGrammar(feedbackText),
    enabled: false
  })
