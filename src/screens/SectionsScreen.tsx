import { View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useFirstChat } from '../hooks/queries'
import { Thread } from '../components/organisms/Thread'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostMessage } from '../hooks/mutations'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
const difficulty = 1

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params
  let { data: firstChat, refetch } = useFirstChat(difficulty, section?.id)
  let [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([])
  const [userResponseMsg, setUserResponseMsg] = useState('')
  const textInputRef = useRef(null)
  const mutation = usePostMessage()
  const ref = useRef(null)

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
        lastAIMessage: chatThreads[chatThreads.length - 1].text_response
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
        className="flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000  thread-bot dark:bg-mila-gray-100">
        {chatThreads.map((res, index) => (
          <Thread key={index} thread={res} sectionId={section?.id} difficulty={difficulty} />
        ))}
      </ScrollView>

      <View className="flex flex-row justify-between mr-2 ml-2 align-middle ">
        <View className="w-[80%]">
          <TextInput
            ref={textInputRef}
            onChangeText={text => setUserResponseMsg(text)}
            className="border border-slate-200 rounded-2xl text-base h-14 font-medium outline-none  p-4"
            placeholder="Type something ..."
          />
        </View>
        <View className="flex flex-row gap-1 align-baseline">
          <TouchableOpacity onPress={handleSendButtonPress} className="self-center">
            <Icon name="send" size={30} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendButtonPress} className={'self-center'}>
            <Icon name="settings-voice" size={30} color="#900" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SectionsScreen
