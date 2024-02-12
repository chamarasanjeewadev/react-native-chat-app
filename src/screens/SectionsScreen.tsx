import { View, TextInput, ScrollView } from 'react-native'
import { useFirstChat } from '../hooks/queries'
import { Thread } from '../components/organisms/Thread'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostMessage } from '../hooks/mutations'
import React from 'react'
import ChatBar from '../components/organisms/ChatBar'
import { ThinkingMessage } from '../components/organisms/UserMessage'
import { MScreenView } from '../components/atoms/MScreenView'
const difficulty = 1

const SectionsScreen = ({ route, navigation }) => {
  const { section } = route.params
  let { data: firstChat, refetch } = useFirstChat(difficulty, section?.id)
  let [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([])
  const { mutateAsync, isPending } = usePostMessage()

  const ref = useRef<ScrollView>(null)

  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true })
  }

  const getInitialChat = useCallback(async () => {
    navigation.setOptions({ title: section?.title })
    await refetch()
    setChatThread([firstChat])
  }, [])

  useEffect(() => {
    getInitialChat()
  }, [])

  const updateChatThread = async (userChat: Partial<MessageBack>) => {
    setChatThread(chatThreads => [
      ...chatThreads,
      {
        ...userChat,
        lastAIMessage: chatThreads[chatThreads.length - 1]?.text_response,
        lastAIMessageId: chatThreads[chatThreads.length - 1]?.response_message_id,
        grammar: {
          corrected_text: {
            feedback: '',
            score: 0
          }
        }
      }
    ])
    await mutateAsync({
      textInputValue: userChat?.user_message,
      sectionId: section?.id
    }).then(data => {
      setChatThread(x => [...x, data])
      scrollToBottom()
    })
  }

  const handleRetry = (retryBack: RetryBack) => {
    console.log(retryBack)
    setChatThread(chatThread => chatThread.slice(0, chatThreads.length - 2))
  }

  return (
    <MScreenView intent="chat">
      <ScrollView ref={ref}>
        <>
          {chatThreads.map((res, index) => (
            <Thread
              handleRetry={handleRetry}
              key={index}
              thread={res}
              sectionId={section?.id}
              difficulty={difficulty}
              isLast={index === chatThreads.length - 1 || index === chatThreads.length - 2}
            />
          ))}
          {isPending && <ThinkingMessage />}
        </>
      </ScrollView>
      <ChatBar updateChatThread={updateChatThread} />
    </MScreenView>
  )
}

export default SectionsScreen
