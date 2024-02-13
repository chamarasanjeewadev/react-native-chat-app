import { View } from 'react-native'
import { MText } from '../atoms/MText'
import MButton from '../atoms/MButton'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
import { PlaySlowIcon } from '../../assets/icons/PlaySlowIcon'
import { ChatBox } from '../molecules/ChatBox'
import { ThinkingMila } from '../../assets/icons/ThinkingMila'
import LoadingDots from '../atoms/LoadingDots'
import { useFeedbackGrammar, useGetSlowAudio, useRetry } from '../../hooks/queries'
import { useState } from 'react'
import useAudioPlayer from '../../hooks/useAudioPlayer'

type UserMessageProps = {
  chatMessage: Partial<MessageBack>
  sectionId: string
  difficulty_level: number
  isLast: boolean
  handleRetry: (retryBack: RetryBack) => void
}
const UserMessage = ({
  chatMessage,
  sectionId,
  difficulty_level,
  isLast,
  handleRetry
}: UserMessageProps) => {
  const {
    data: grammerResponse,
    refetch: refectchFeedbackGrammar,
    isFetching
  } = useFeedbackGrammar({
    ai_text: chatMessage?.text_response ?? chatMessage?.lastAIMessage ?? '',
    text: chatMessage?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty_level,
    message_id: chatMessage?.response_message_id ?? chatMessage?.lastAIMessageId ?? 0
  })

  const { refetch } = useGetSlowAudio({ sectionId, text: chatMessage?.user_message })
  const { refetch: fetchRetry } = useRetry({ sectionId, difficulty: difficulty_level })
  const { playAudio } = useAudioPlayer()

  const [showTranslate, showToggleTranslate] = useState(false)

  return (
    <ChatBox loading={false} intent={'user'}>
      <MText size="large" className="text-userchat font-normal ">
        {chatMessage?.user_message}
      </MText>
      <View className=" flex-row justify-end gap-2 ">
        <MButton
          leadingIcon={<MilaHint />}
          onPress={async () => {
            await refectchFeedbackGrammar()
            showToggleTranslate(x => !x)
          }}
        />
        {isLast && (
          <MButton
            onPress={async () => {
              await fetchRetry().then(data => {
                handleRetry(data.data)
                console.log('refetch response', data.data)
              })
            }}
            leadingIcon={<RetryIcon />}
          />
        )}
        <MButton
          onPress={async () => {
            await refetch().then(data => {
              console.log('audio url', data.data)
              playAudio({ audioUrl: data.data })
            })
          }}
          leadingIcon={<PlaySlowIcon />}
        />
      </View>
      {/* </View> */}
      {grammerResponse && showTranslate && !isFetching && (
        <MText className=" flex-grow pt-2">{grammerResponse?.translated_text}</MText>
      )}
    </ChatBox>
  )
}

export default UserMessage

export const ThinkingMessage = () => {
  return (
    <ChatBox intent="mila" loading={false} className="flex flex-col">
      <LoadingDots dots={3} borderRadius={50} size={15} bounceHeight={2} />
      <ThinkingMila />
    </ChatBox>
  )
}
