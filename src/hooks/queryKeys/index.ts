import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const chatQueryKeys = createQueryKeys('chats', {
  detail: (id: string) => [id],
  milaChats: () => ({
    queryKey: ['milachats']
  }),
  chat: (id: string) => ({
    queryKey: [id]
  }),
  sections: (id: string) => ({
    queryKey: [id]
  })
})

export const authQueryKeys = createQueryKeys('auth', {
  detail: (id: string) => [id]
})

export const userQueryKeys = createQueryKeys('user', {
  user: null
})

export const translateQueryKeys = createQueryKeys('translate', {
  translateText: (text: string) => [text],
  feedbackGrammar: ({ sectionId, message_id }: Partial<GrammarTranslateType>) => [
    sectionId,
    message_id
  ],
  feedbackText: (text: string, sectionId: string, messageId: number) => [
    text,
    sectionId,
    messageId
  ],
  slowAudio: (text: string, sectionId: string) => [text, sectionId],
  tokenAudio: (text: string) => [text],
  retry: (difficulty: number, sectionId: string) => [difficulty, sectionId]
})

export const queryKeys = mergeQueryKeys(
  chatQueryKeys,
  authQueryKeys,
  translateQueryKeys,
  userQueryKeys
)
