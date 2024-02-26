import { View } from 'react-native'
import { MTextInput } from '../atoms/MTextInput'
import { useEffect, useRef, useState } from 'react'
import useAudioRecorder from '../molecules/AudioRecorder'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Send from './../../assets/icons/svgs/chat/send.svg'
import Mic from './../../assets/icons/svgs/chat/microphone.svg'
import MButton from '../atoms/MButton'
import { usePostMessage } from '../../hooks/mutations'
const ChatBar = ({
  sectionId,
  updateChatThread
}: {
  sectionId: string
  updateChatThread: (userChat: Partial<MessageBack>) => void
}) => {
  const { mutateAsync, isPending } = usePostMessage()
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
                const data = await mutateAsync({
                  sectionId: sectionId,
                  audio: recordingLine.file
                }).then(data => {
                  updateChatThread({
                    type: 'BOT',
                    ...data,
                    user_message: data?.text_response,
                    audio_response: data?.audio_response
                  })
                })
              }}>
              Play
            </MButton>
          ))}
      </View>
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
            }}>
            {/* <Send /> */}
            {/* <Icon name="send" size={30} /> */}
          </MButton>
        ) : (
          <MButton
            leadingIcon={<Mic />}
            intent="buttonIcon"
            onPressOut={async () => {
              try {
                console.log('is recording.....', isRecording)
                // if (isRecording) {
                console.log('is recording.....')
                await stopRecording()
                const recordingLine = recordings[recordings.length - 1]
                await mutateAsync({
                  sectionId: sectionId,
                  audio: recordingLine.file
                }).then(data => {
                  if (data) {
                    updateChatThread({
                      type: 'USER',
                      // ...data,
                      user_message: data?.user_message,
                      audio_response: recordingLine?.file
                    })
                    updateChatThread({
                      type: 'BOT',
                      // ...data,
                      user_message: data?.text_response,
                      audio_response: data?.audio_response
                    })
                  }
                })
                // } else {
                //   await startRecording()
                // }
                // isRecording ? stopRecording() : startRecording()
              } catch (error) {
                console.log('error occured whil recording', error)
                // await stopRecording()
              }
            }}
            onPressIn={() => {
              console.log('is pressout.....')
              startRecording()
            }}></MButton>
        )}
      </View>
    </>
  )
}
export default ChatBar
