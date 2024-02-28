import { View } from 'react-native'
import { MText } from '../atoms/MText'
import MButton from '../atoms/MButton'
import MilaHintIcon from '../../assets/icons/svgs/milaHint.svg'
import RetryIcon from '../../assets/icons/svgs/retry.svg'
import PlaySlowIcon from '../../assets/icons/svgs/PlaySlow.svg'
import { ChatBox } from '../molecules/ChatBox'
import { ThinkingMila } from '../../assets/icons/ThinkingMila'
import LoadingDots from '../atoms/LoadingDots'
import { useFeedbackGrammar, useGetSlowAudio, useRetry } from '../../hooks/queries'
import { useState } from 'react'
import clsx from 'clsx'
import { useAudio } from '../../hooks/AudioProvider'
import PlayAudio from '../../assets/icons/svgs/PlayAudio.svg'

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
  const { playAudio, playAudioBySound } = useAudio()

  const [toggleTranslate, setToggleTranslate] = useState(false)
  return (
    <>
      <ChatBox loading={false} intent={'user'}>
        <MText size="large" className="font-normal text-userchat ">
          {chatMessage?.user_message}
        </MText>
        <View className=" flex-row justify-end gap-2 ">
          {chatMessage?.audio && (
            <MButton
              intent="buttonIcon"
              leadingIcon={<PlayAudio className="color-chatbutton" />}
              onPress={async () => {
                await playAudioBySound(chatMessage?.audio)
              }}
            />
          )}
          <MButton // disabled as of instructions
            loading={isFetching}
            className={clsx(toggleTranslate ? 'bg-primary' : '')}
            intent="buttonIcon"
            leadingIcon={<MilaHintIcon className="color-chatbutton" />}
            onPress={async () => {
              setToggleTranslate(x => !x)
              if (!toggleTranslate) {
                await refectchFeedbackGrammar()
              }
            }}
          />
          {isLast && (
            <MButton
              intent="buttonIcon"
              onPress={async () => {
                await fetchRetry().then(data => {
                  handleRetry(data.data)
                  console.log('refetch response', data.data)
                })
              }}
              leadingIcon={<RetryIcon className="color-chatbutton" />}
            />
          )}
          <MButton // disabled as of instructions
            intent="buttonIcon"
            onPress={async () => {
              await refetch().then(data => {
                playAudio({ audioUrl: data.data })
              })
            }}
            leadingIcon={<PlaySlowIcon className="color-chatbutton" />}
          />
        </View>
      </ChatBox>
      {grammerResponse && toggleTranslate && !isFetching && (
        <ChatBox
          loading={false}
          intent={'user'}
          className="-mt-3 rounded-t-none bg-card text-card-foreground">
          <MText className=" flex-grow pt-2">{grammerResponse?.corrected_text?.feedback}</MText>
        </ChatBox>
      )}
    </>
  )
}

export default UserMessage

export const ThinkingMessage = () => {
  return (
    <ChatBox intent="mila" loading={false} className="flex flex-col p-4">
      <LoadingDots dots={3} borderRadius={50} size={10} bounceHeight={2} />
      <ThinkingMila />
    </ChatBox>
  )
}
