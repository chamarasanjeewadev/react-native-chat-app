import { KeyboardAvoidingView, ScrollView, View, Platform } from 'react-native'
import { useFirstChat } from '../hooks/queries'
import { Thread } from '../components/organisms/Thread'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePostMessage } from '../hooks/mutations'
import React from 'react'
import ChatBar from '../components/organisms/ChatBar'
import { ThinkingMessage } from '../components/organisms/UserMessage'
import { MScreenView } from '../components/atoms/MScreenView'
import { ChatStackParamList } from '../navigators/ChatNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAudio } from '../hooks/AudioProvider'
import { useFocusEffect } from '@react-navigation/native'
import useSnackBar from '../hooks/useSnackBar'
type Props = NativeStackScreenProps<ChatStackParamList, 'Section'>
const SectionsScreen = ({ route, navigation }: Props) => {
  const { section, difficulty } = route.params
  const { refetch } = useFirstChat(difficulty, section?.id)
  const [chatThreads, setChatThread] = useState<Partial<MessageBack>[]>([])
  const { mutateAsync, isPending } = usePostMessage()
  const { playAudio, stopAudio } = useAudio()
  const ref = useRef<ScrollView>(null)
  const snackBar = useSnackBar()

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        await stopAudio()
      }
    }, [])
  )
  const scrollToBottom = () => {
    ref.current?.scrollToEnd({ animated: true })
  }

  const getInitialChat = useCallback(async () => {
    navigation.setOptions({ title: section?.title })
    await refetch().then(data => {
      const fetched = data?.data
      fetched && setChatThread([fetched])
      playAudio({ audioUrl: fetched?.audio_response })
    })
  }, [])

  useEffect(() => {
    getInitialChat()
  }, [])

  const updateChatThreadWithUserMessage = async (userChat: Partial<MessageBack>) => {
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
      console.log('play audio url', data?.audio_response)
      playAudio({ audioUrl: data?.audio_response })
    })
  }

  const updateChatWithAudioMessage = async (audio: AudioType) => {
    try {
      await mutateAsync({
        audio: audio?.file,
        sectionId: section?.id
      }).then(data => {
        setChatThread(x => [
          ...x,
          {
            type: 'USER',
            ...data,
            user_message: data?.user_message,
            audio_response: audio?.file,
            audio: audio.sound
          },
          {
            type: 'BOT',
            ...data,
            user_message: data?.text_response,
            audio_response: data?.audio_response
          }
        ])
        playAudio({ audioUrl: data?.audio_response })
        scrollToBottom()
      })
    } catch (error) {
      console.log('error', error)
      snackBar.showSnackBar({ text: 'Something went wrong' })
    }
  }

  const handleRetry = () => {
    setChatThread(chatThread => chatThread.slice(0, chatThreads.length - 2))
  }
  return (
    <MScreenView intent="chat">
      <ScrollView ref={ref} onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}>
        <View className=" gap-2 p-2">
          {chatThreads?.map((res, index) => (
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
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        className="p-2"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 105 : 0}>
        <ChatBar
          updateChatThread={updateChatThreadWithUserMessage}
          updateAudioChat={updateChatWithAudioMessage}
        />
      </KeyboardAvoidingView>
    </MScreenView>
  )
}

export default SectionsScreen
