import { Text, View } from 'react-native'
import { useContextTranslate, useFeedbackGrammar, useFeedbackTranslate } from '../../hooks/queries'
import { BotMessage, BotWord } from './BotWord'
import { PlayAudio } from '../../assets/icons/PlayAudio'
import { TranslateIcon } from '../../assets/icons/TranslateIcon'
import { useState } from 'react'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { PlaySlow } from '../../assets/icons/PlaySlowIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
import clsx from 'clsx'
import { MText } from '../atoms/MText'
import { useAuthStore } from '../../stores/AuthStore'
import { LanguageEnum } from '../../utils/enums'
import MButton from '../atoms/MButton'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import UserResponse from './UserResponse'
import { notifyManager } from '@tanstack/react-query'
import { useSettingStore } from '../../stores/settingStore'
import { MScreenView } from '../atoms/MScreenView'
import { ChatBox, TranslateBox } from '../molecules/ChatBox'

export const Thread = ({
  thread,
  sectionId,
  difficulty
}: {
  thread: Partial<MessageBack>
  sectionId: string
  difficulty: number
}) => {
  const { data: tokens } = useContextTranslate(thread?.text_response)
  const { playAudio } = useAudioPlayer(thread?.audio_response)
  const { data: grammerResponse, refetch: refectchFeedbackGrammar } = useFeedbackGrammar({
    ai_text: thread?.text_response ?? thread?.lastAIMessage ?? '',
    text: thread?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty,
    message_id: thread?.response_message_id ?? thread?.lastAIMessageId ?? 0
  })

  const {
    data: feedbackTranslate,
    refetch,
    isFetching
  } = useFeedbackTranslate(
    thread?.text_response,
    difficulty,
    sectionId,
    thread?.response_message_id
  )
  const [showTranslate, showToggleTranslate] = useState(false)
  const { user } = useAuthStore()
  const [notation, showRomaji] = useSettingStore(state => [state.notation, state.showRomaji])
  return (
    <>
      <ChatBox>
        {thread?.type === 'USER' && <UserResponse userMessage={thread?.user_message} />}
        <BotMessage
          tokenization_response={tokens?.tokenization_response}
          showRomaji={showRomaji}
          language={{
            lang: user.target_language as LanguageEnum,
            notation: notation
          }}
        />
        {thread?.type !== 'USER' && (
          <View className="flex flex-row gap-2 ">
            <MButton leadingIcon={<PlayAudio />} onPress={playAudio} />
            <MButton
              leadingIcon={<TranslateIcon />}
              onPress={async () => {
                if (!showToggleTranslate) {
                  await refetch()
                }
                showToggleTranslate(x => !x)
              }}
            />
          </View>
        )}
      </ChatBox>

      {feedbackTranslate && showTranslate && !isFetching && (
        <TranslateBox>
          <MText>{feedbackTranslate?.translated_text}</MText>
        </TranslateBox>
      )}
    </>
  )
}
