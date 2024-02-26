import { View } from 'react-native'
import { MTextInput } from '../atoms/MTextInput'
import { useEffect, useRef, useState } from 'react'
import Send from './../../assets/icons/svgs/chat/send.svg'
import Mic from './../../assets/icons/svgs/chat/microphone.svg'
import MButton from '../atoms/MButton'
import { useAudio } from '../../hooks/AudioProvider'

const ChatBar = ({
  updateAudioChat,
  updateChatThread
}: {
  updateAudioChat: (audio: AudioType) => void
  updateChatThread: (userChat: Partial<MessageBack>) => void
}) => {
  const textInputRef = useRef(null)
  const [userResponseMsg, setUserResponseMsg] = useState('')

  useEffect(() => {
    textInputRef.current.focus()
  }, [])

  const handleSendButtonPress = async ({ userMessage }: { userMessage: string }) => {
    updateChatThread({
      type: 'USER',
      user_message: userMessage
    })
    textInputRef.current.clear()
  }

  const { startRecording, stopRecording, recordings } = useAudio()

  return (
    <View className="flex-row gap-2 text-base">
      <MTextInput
        forwardedRef={textInputRef}
        onChangeText={setUserResponseMsg}
        className="flex-grow border border-muted bg-muted"
        placeholder="Type something ....."
      />

      {userResponseMsg ? (
        <MButton
          className="justify-right"
          intent="buttonIcon"
          leadingIcon={<Send />}
          onPress={async () => {
            await handleSendButtonPress({ userMessage: userResponseMsg })
            setUserResponseMsg('')
          }}></MButton>
      ) : (
        <MButton
          leadingIcon={<Mic />}
          intent="buttonIcon"
          onPressOut={async () => {
            try {
              await stopRecording()
              const recordingLine = recordings[recordings.length - 1]
              await updateAudioChat(recordingLine)
            } catch (error) {
              console.log('error occured while handling audio ', error)
            }
          }}
          onPressIn={() => {
            startRecording()
          }}></MButton>
      )}
    </View>
  )
}
export default ChatBar
