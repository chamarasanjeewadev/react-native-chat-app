import {
  contextTranslate,
  feedbackGrammar,
  feedbackTranslate,
  firstChat,
  getSlowAudio,
  retry,
  subscriptionIntent
} from '../services/apiService'
import { QueryOptions, useQuery } from '@tanstack/react-query'
import { getMilaUserChats, signIn } from '../services/apiService'
import { queryKeys } from './queryKeys'
import { useAuthStore } from '../stores/AuthStore'
// import { useAuthStore } from '../stores/AuthStore'

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: signIn,
    select: data => {
      // const { setUser } = useAuthStore()
      const { user, user_metrics } = data
      const mappedUser: User = {
        ...user,
        stripe_price_id: user_metrics.stripe_price_id,
        proficiency: user_metrics?.proficiency,
        plan_expired_on: user_metrics?.plan_expired_on,
        experience: user_metrics?.experience,
        level: user_metrics.level,
        level_name: user_metrics?.level_name,
        next_level_exp_req: user_metrics?.next_level_exp_req,
        is_cancel_scheduled: user_metrics?.is_cancel_scheduled,
        target_language: user_metrics?.target_language as Language
      }
      // setUser(mappedUser)
      return mappedUser
    }
  })

export const useGetMilaChats = () =>
  useQuery({
    queryKey: queryKeys.chats.milaChats().queryKey,
    queryFn: getMilaUserChats,
    staleTime: 0
  })

export const useFirstChat = (difficulty: number, id: string) =>
  useQuery({
    queryKey: [queryKeys.chats.chat(id).queryKey, 'firstchat', difficulty],
    queryFn: () => firstChat(difficulty, id),
    enabled: false
  })

export const useContextTranslate = (text: string) =>
  useQuery({
    queryKey: queryKeys.translate.translateText(text).queryKey,
    queryFn: () => contextTranslate(text),
    enabled: !!text
    // throwOnError: true // error => error?.status >= 400
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

export const useGetSlowAudio = ({ sectionId, text }: { sectionId: string; text: string }) =>
  useQuery({
    queryKey: queryKeys.translate.slowAudio(sectionId, text).queryKey,
    queryFn: () => getSlowAudio(sectionId, text),
    enabled: false
  })
export const useRetry = ({ sectionId, difficulty }: { sectionId: string; difficulty: number }) =>
  useQuery({
    queryKey: queryKeys.translate.retry(difficulty, sectionId).queryKey,
    queryFn: () => retry(sectionId, difficulty),
    enabled: false
  })
export const useStripeSubscription = ({ priceId }: { priceId: string }) =>
  useQuery({
    queryKey: ['priceId', priceId],
    queryFn: () => subscriptionIntent(priceId),
    enabled: true
  })
