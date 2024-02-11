import { useFeedbackGrammar } from '../../hooks/queries'
import { BotMessage } from './BotMessage'
import { useAuthStore } from '../../stores/AuthStore'
import UserMessage from './UserResponse'
import { useSettingStore } from '../../stores/settingStore'

export const Thread = ({
  thread: chatMessage,
  sectionId,
  difficulty
}: {
  thread: Partial<MessageBack>
  sectionId: string
  difficulty: number
}) => {
  const { data: grammerResponse, refetch: refectchFeedbackGrammar } = useFeedbackGrammar({
    ai_text: chatMessage?.text_response ?? chatMessage?.lastAIMessage ?? '',
    text: chatMessage?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty,
    message_id: chatMessage?.response_message_id ?? chatMessage?.lastAIMessageId ?? 0
  })

  const { user } = useAuthStore()
  const [notation, showRomaji] = useSettingStore(state => [state.notation, state.showRomaji])
  return (
    <>
      {chatMessage?.type === 'USER' ? (
        <UserMessage userMessage={chatMessage?.user_message} />
      ) : (
        <BotMessage
          text_response={chatMessage?.text_response}
          // tokenization_response={tokens?.tokenization_response}
          showRomaji={showRomaji}
          language={{
            lang: user.target_language,
            notation: notation
          }}
          response_message_id={chatMessage?.response_message_id}
          audio_response={chatMessage?.audio_response}
        />
      )}
    </>
  )
}
