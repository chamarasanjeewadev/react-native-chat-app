import { View, TextInput, ScrollView } from 'react-native'
import { useFirstChat } from '../hooks/queries'
import { Thread } from '../components/organisms/Thread'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostMessage } from '../hooks/mutations'
import React from 'react'
import ChatBar from '../components/organisms/ChatBar'
import { ThinkingMessage } from '../components/organisms/UserResponse'
const difficulty = 1

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params
  let { data: firstChat, refetch } = useFirstChat(difficulty, section?.id)
  let [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([])
  const textInputRef = useRef(null)
  const { mutateAsync, isPending } = usePostMessage()
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

  const handleSendButtonPress = async ({ userMessage }: { userMessage: string }) => {
    setChatThread(chatThreads => [
      ...chatThreads,
      {
        type: 'USER',
        message: userMessage,
        user_message: userMessage,
        grammar: {
          corrected_text: {
            feedback: '',
            score: 0
          }
        },
        lastAIMessage: chatThreads[chatThreads.length - 1]?.text_response,
        lastAIMessageId: chatThreads[chatThreads.length - 1]?.response_message_id
      }
    ])
    await mutateAsync({
      textInputValue: userMessage,
      sectionId: section?.id
    }).then(data => {
      setChatThread(x => [...x, data])
    })

    // textInputRef.current.clear()
    scrollToBottom()
  }

  return (
    <View className="flex-1 justify-between">
      <ScrollView
        ref={ref}
        className="thread  thread-bot dark:bg-mila-gray-100 relative flex min-w-[330px] flex-col gap-y-2  p-8 transition-all duration-1000">
        <>
          {chatThreads.map((res, index) => (
            <Thread key={index} thread={res} sectionId={section?.id} difficulty={difficulty} />
          ))}
          {isPending && <ThinkingMessage />}
        </>
      </ScrollView>
      <ChatBar handleSendButtonPress={handleSendButtonPress} />
    </View>
  )
}

export default SectionsScreen
