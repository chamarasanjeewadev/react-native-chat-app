import { View } from 'react-native'
import { MTextInput } from '../atoms/MTextInput'
import { useEffect, useRef, useState } from 'react'
import useAudioRecorder from '../molecules/AudioRecorder'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MButton from '../atoms/MButton'
const ChatBar = ({
  updateChatThread
}: {
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

  const { startRecording, stopRecording, isRecording, recordings } = useAudioRecorder()

  return (
    <>
      {/* for demo */}
      <View>
        {recordings &&
          [recordings[recordings.length - 1]]?.map((recordingLine, index) => (
            <MButton
              className="mb-2"
              key={index}
              onPress={async () => {
                await recordingLine.sound.replayAsync()
                // const data = await mutation.mutateAsync({
                //   // textInputValue: userResponseMsg,
                //   sectionId: section?.id,

                //   audio: recordingLine.file
                // })
              }}>
              Play
            </MButton>
          ))}
      </View>
      <View className="flex-row gap-2 text-base">
        <MTextInput
          forwardedRef={textInputRef}
          onChangeText={setUserResponseMsg}
          className="flex-grow border border-muted"
          placeholder="Type something ....."
        />

        {userResponseMsg ? (
          <MButton
            intent="buttonIcon"
            onPress={async () => {
              await handleSendButtonPress({ userMessage: userResponseMsg })
              setUserResponseMsg('')
            }}>
            <Icon name="send" size={30} color="#900" />
          </MButton>
        ) : (
          <MButton
            intent="buttonIcon"
            onPressIn={async () => {
              try {
                isRecording ? stopRecording() : startRecording()
              } catch (error) {
                console.log('error occured whil recording', error)
                await stopRecording()
              }
            }}
            onPressOut={stopRecording}>
            <Icon name="microphone-settings" size={30} color="#900" />
          </MButton>
        )}
      </View>
    </>
  )
}
export default ChatBar
