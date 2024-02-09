import { Text, View } from 'react-native'
import { useContextTranslate, useFeedbackGrammar, useFeedbackTranslate } from '../../hooks/queries'
import { BotWord } from './BotWord'
import TrackPlayer from 'react-native-track-player'
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
const showRomaji = true
const japaneseNotation = 'Furigana'
const chineseNotation = 'Romaji'

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

  return (
    <>
      <View className={clsx('m-1 flex flex-row flex-wrap rounded-md bg-white p-2')}>
        {thread?.type === 'USER' && (
          <View className={'flex flex-grow flex-col gap-1 p-2 align-middle  '}>
            <Text className="font-japanese relative text-lg  font-medium tracking-tight  ">
              {thread?.user_message}
            </Text>
            <View className="flex flex-row justify-end gap-2 align-middle">
              <MButton
                leadingIcon={<MilaHint />}
                onPress={async () => {
                  await refectchFeedbackGrammar()
                }}
              />
              <MButton leadingIcon={<RetryIcon />} />
              <MButton leadingIcon={<PlaySlow />} />
            </View>
          </View>
        )}
        <View className="flex flex-row flex-wrap">
          {tokens?.tokenization_response?.map(
            (
              {
                token,
                translation,
                furigana,
                audio,
                romanization,
                kanji_only_length,
                zhuyin,
                learned
              },
              index
            ) => (
              <BotWord
                index={index}
                key={index}
                value={token}
                hasTranslation={!!translation}
                translation={translation}
                audio={audio}
                learned={learned}
                romanized_character={
                  showRomaji
                    ? user.target_language === LanguageEnum.Japanese
                      ? japaneseNotation === 'Furigana'
                        ? furigana
                        : romanization
                      : chineseNotation === 'Romaji'
                        ? romanization
                        : zhuyin
                    : null
                }
                kanji_length={kanji_only_length || 0}
              />
            )
          )}
        </View>
        {thread?.type !== 'USER' && (
          <View className="flex flex-row gap-2 pr-2 pt-2 align-middle text-orange-900 ">
            <MButton
              leadingIcon={<PlayAudio />}
              onPress={async () => {
                const url = thread?.audio_response
                try {
                  await TrackPlayer.reset()
                  await TrackPlayer.add({
                    url: url
                  })
                  await TrackPlayer.play()
                } catch (error) {
                  console.log('issue playing track', error)
                }
              }}
            />

            <MButton
              leadingIcon={<TranslateIcon />}
              className="play-button rounded-lg border-orange-100 bg-orange-50 p-2 text-orange-900 shadow-sm active:bg-orange-200  dark:bg-slate-800 dark:text-white dark:active:bg-slate-400"
              onPress={async () => {
                if (!showToggleTranslate) {
                  await refetch()
                }
                showToggleTranslate(x => !x)
              }}>
              <TranslateIcon />
            </MButton>
          </View>
        )}
      </View>

      {feedbackTranslate && showTranslate && !isFetching && (
        <View className="rounded-bl-2xl rounded-br-2xl bg-slate-200 py-1 text-slate-800 dark:bg-slate-600 dark:text-white">
          <MText>{feedbackTranslate?.translated_text}</MText>
        </View>
      )}
    </>
  )
}
