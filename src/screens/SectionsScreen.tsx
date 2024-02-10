import { View, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native'
import { useFirstChat } from '../hooks/queries'
import { Thread } from '../components/organisms/Thread'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostMessage } from '../hooks/mutations'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import { MTextInput } from '../components/atoms/MTextInput'
import useAudioRecorder from '../components/molecules/AudioRecorder'
const difficulty = 1

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params
  let { data: firstChat, refetch } = useFirstChat(difficulty, section?.id)
  let [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([])
  const [localrec, setLocalRec] = useState(false)
  const { startRecording, stopRecording, isRecording, recording, recordings } = useAudioRecorder()
  const [userResponseMsg, setUserResponseMsg] = useState('')
  const textInputRef = useRef(null)
  const mutation = usePostMessage()
  const ref = useRef<TextInput>(null)

  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true })
  }

  const getInitialChat = useCallback(async () => {
    navigation.setOptions({ title: section?.title })
    await refetch()
    setChatThread([firstChat])
    textInputRef.current.focus()
  }, [])

  useEffect(() => {
    getInitialChat()
  }, [])

  const handleSendButtonPress = async () => {
    textInputRef.current.clear()
    setChatThread(chatThreads => [
      ...chatThreads,
      {
        type: 'USER',
        message: userResponseMsg,
        user_message: userResponseMsg,
        grammar: {
          corrected_text: {
            feedback: '',
            score: 0
          }
        },
        lastAIMessage: chatThreads[chatThreads.length - 1]?.text_response,
        lastAIMessageId: chatThreads[chatThreads.length - 1].response_message_id
      }
    ])
    const data = await mutation.mutateAsync({
      textInputValue: userResponseMsg,
      sectionId: section?.id
    })
    setChatThread(x => [...x, data])
    scrollToBottom()
  }

  return (
    <View className="flex-1 justify-between">
      <ScrollView
        ref={ref}
        className="thread  thread-bot dark:bg-mila-gray-100 relative flex min-w-[330px] flex-col gap-y-2  p-8 transition-all duration-1000">
        {chatThreads.map((res, index) => (
          <View key={index} className={'shadow-md '}>
            <Thread key={index} thread={res} sectionId={section?.id} difficulty={difficulty} />
          </View>
        ))}
      </ScrollView>

      <View className="ml-2 mr-2 flex flex-row justify-between align-middle ">
        <View className="w-[80%]">
          <MTextInput
            forwardedRef={textInputRef}
            onChangeText={text => setUserResponseMsg(text)}
            className="mb-2  rounded-2xl border border-slate-950 text-base   outline-none"
            placeholder="Type something ..."
          />
        </View>
        <View>
          {recordings &&
            recordings.map((recordingLine, index) => (
              <TouchableOpacity key={index} onPress={() => recordingLine.sound.replayAsync()}>
                <Text>Play</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View className="align-center flex gap-1">
          <TouchableOpacity onPress={handleSendButtonPress} className="self-center">
            <Icon name="send" size={30} color="#900" />
          </TouchableOpacity>
          {/* when press start button start recording
when the recording is done send it to backend as a chat message
get the response and append to chat */}
          <TouchableOpacity
            onPress={async () => {
              try {
                console.log('recording obe', isRecording)
                isRecording ? stopRecording() : startRecording()
              } catch (error) {
                console.log('error occured whil recording', error)
                // await stopRecording()
              }
            }}
            // leadingIcon={<Icon name="settings-voice" size={30} color="#900" />}
          >
            <Text>record</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <useAudioRecorder /> */}
    </View>
  )
}

export default SectionsScreen
