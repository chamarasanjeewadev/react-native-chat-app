import { Text, TouchableOpacity, View } from 'react-native'
import { MTextInput } from '../atoms/MTextInput'
import { useRef, useState } from 'react'
import useAudioRecorder from '../molecules/AudioRecorder'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MButton from '../atoms/MButton'
const ChatBar = ({
  updateChatThread
}: {
  updateChatThread: (userChat: Partial<MessageBack>) => void
}) => {
  const textInputRef = useRef(null)
  const [userResponseMsg, setUserResponseMsg] = useState('')

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
      {/* <View>
        {recordings &&
          recordings.map((recordingLine, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await recordingLine.sound.replayAsync()
                // const data = await mutation.mutateAsync({
                //   // textInputValue: userResponseMsg,
                //   sectionId: section?.id,

                //   audio: recordingLine.file
                // })
              }}>
              <Text>Play</Text>
            </TouchableOpacity>
          ))}
      </View> */}
      <View className="ml-2 mr-2 flex flex-row items-center gap-2  text-base">
        <MTextInput
          forwardedRef={textInputRef}
          onChangeText={setUserResponseMsg}
          className="mb-2  flex-grow border"
          placeholder="Type something ....."
        />

        {userResponseMsg ? (
          <MButton
            onPress={() => {
              handleSendButtonPress({ userMessage: userResponseMsg })
              setUserResponseMsg('sdddd')
            }}>
            <Icon name="send" size={30} color="#900" />
          </MButton>
        ) : (
          <MButton
            onPress={async () => {
              try {
                isRecording ? stopRecording() : startRecording()
              } catch (error) {
                console.log('error occured whil recording', error)
                // await stopRecording()
              }
            }}>
            <Icon name="microphone" size={30} color="#900" />
          </MButton>
        )}
      </View>
    </>
  )
}
export default ChatBar
