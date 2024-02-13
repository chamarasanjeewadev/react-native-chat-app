import { BotMessage } from './BotMessage'
import { useAuthStore } from '../../stores/AuthStore'
import UserMessage from './UserMessage'
import { useSettingStore } from '../../stores/settingStore'

export const Thread = ({
  thread: chatMessage,
  sectionId,
  difficulty,
  isLast,
  handleRetry
}: {
  thread: Partial<MessageBack>
  sectionId: string
  difficulty: number
  isLast: boolean
  handleRetry: (retryBack: RetryBack) => void
}) => {
  const { user } = useAuthStore()
  const [notation, showRomaji] = useSettingStore(state => [state.notation, state.showRomaji])
  return (
    <>
      {chatMessage?.type === 'USER' ? (
        <UserMessage
          isLast={isLast}
          handleRetry={handleRetry}
          chatMessage={chatMessage}
          sectionId={sectionId}
          difficulty_level={difficulty}
        />
      ) : (
        <BotMessage
          text_response={chatMessage?.text_response}
          sectionId={sectionId}
          difficulty={difficulty}
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
