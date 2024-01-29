import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import {
  useContextTranslate,
  useFeedbackGrammar,
  useFeedbackTranslate,
  useGetUsersQuery
} from '../../hooks/queries'
import { BotWord } from './BotWord'
import { LanguageEnum, ThreadType } from '../../utils/enums'
import TrackPlayer from 'react-native-track-player'
import { PlayAudio } from '../../assets/icons/PlayAudio'
import { TranslateIcon } from '../../assets/icons/TranslateIcon'
import { useState } from 'react'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { PlaySlow } from '../../assets/icons/PlaySlowIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
import clsx from 'clsx'
import { feedbackGrammar } from '../../services/apiService'
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
  console.log("thread....",thread)
  const { data: tokens } = useContextTranslate(thread?.text_response)
  console.log("mapped",{
    ai_text: thread?.text_response,
    text: thread?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty,
    message_id: thread?.response_message_id
  })
  const { data: grammerResponse, refetch: refectchFeedbackGrammar } = useFeedbackGrammar({
    ai_text: thread?.text_response,
    text: thread?.user_message,
    sectionId: sectionId,
    difficulty_level: difficulty,
    message_id: thread?.response_message_id
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
  const { data: user } = useGetUsersQuery()

  return (
    <>
      <View className={clsx('flex flex-row flex-wrap')}>
        {thread?.type === 'USER' && (
          <View className={'flex flex-grow flex-col gap-2 p-2  bg-slate-500'}>
            <Text className="relative tracking-tight font-medium  font-japanese text-lg ">
              {thread?.user_message}
            </Text>
            <View className="flex justify-end flex-row gap-4">
              <TouchableOpacity
                onPress={async () => {
                  await refectchFeedbackGrammar()
                  console.log('feedback grammar data', grammerResponse)
                }}>
                <MilaHint />
              </TouchableOpacity>

              <RetryIcon />
              <PlaySlow />
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
      </View>
      <View className="pr-10 flex flex-row gap-2">
        <Pressable
          onPress={async () => {
            const url = thread?.audio_response!
            try {
              await TrackPlayer.reset()
              await TrackPlayer.add({
                url: url
              })
              await TrackPlayer.play()
            } catch (error) {
              console.log('issue playing track', error)
            }
          }}>
          <PlayAudio />
        </Pressable>
        <Pressable
          onPress={async () => {
            if (!showToggleTranslate) {
              await refetch()
            }
            showToggleTranslate(x => !x)
          }}>
          <TranslateIcon />
        </Pressable>
      </View>
      {feedbackTranslate && showTranslate && !isFetching && (
        <View className="py-1 rounded-br-2xl rounded-bl-2xl bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-white">
          <Text>{feedbackTranslate?.translated_text}</Text>
        </View>
      )}
    </>
  )
}
