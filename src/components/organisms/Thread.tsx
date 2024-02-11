import { useContextTranslate, useFeedbackGrammar } from '../../hooks/queries'
import { BotMessage } from './BotWord'
import { useAuthStore } from '../../stores/AuthStore'
import UserMessage from './UserResponse'
import { useSettingStore } from '../../stores/settingStore'

export const Thread = ({
  thread,
  sectionId,
  difficulty
}: {
  thread: Partial<MessageBack>
  sectionId: string
  difficulty: number
}) => {
  const { data: grammerResponse, refetch: refectchFeedbackGrammar } = useFeedbackGrammar({
    ai_text: thread?.text_response ?? thread?.lastAIMessage ?? '',
    text: thread?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty,
    message_id: thread?.response_message_id ?? thread?.lastAIMessageId ?? 0
  })

  const { user } = useAuthStore()
  const [notation, showRomaji] = useSettingStore(state => [state.notation, state.showRomaji])
  return (
    <>
      {thread?.type === 'USER' ? (
        <UserMessage userMessage={thread?.user_message} />
      ) : (
        <BotMessage
          text_response={thread?.text_response}
          // tokenization_response={tokens?.tokenization_response}
          showRomaji={showRomaji}
          language={{
            lang: user.target_language,
            notation: notation
          }}
          response_message_id={thread?.response_message_id}
          audio_response={thread?.audio_response}
          tokenization_response={[]}
        />
      )}
      {/* </ChatBox> */}
    </>
  )
}
