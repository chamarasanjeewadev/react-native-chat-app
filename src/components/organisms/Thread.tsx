import { Pressable, Text, View } from 'react-native'
import { useContextTranslate, useFeedbackTranslate, useGetUsersQuery } from '../../hooks/queries'
import { BotWord } from './BotWord'
import { LanguageEnum, ThreadType } from '../../utils/enums'
import classNames from 'classnames'
import TrackPlayer from 'react-native-track-player'
import { PlayAudio } from '../../assets/icons/PlayAudio'
import { TranslateIcon } from '../../assets/icons/TranslateIcon'
import { useState } from 'react'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { PlaySlow } from '../../assets/icons/PlaySlowIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
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
  const { data: feedbackTranslate, refetch } = useFeedbackTranslate(
    thread?.text_response,
    difficulty,
    sectionId,
    thread?.response_message_id
  )
  const [showTranslate, showToggleTranslate] = useState(false)
  const { data: user } = useGetUsersQuery()

  return (
    <>
      <View className={classNames('flex flex-row flex-wrap')}>
        {thread?.type === 'USER' && (
          <View className="flex flex-col gap-2 p-4 thread min-w-[330px] relative transition-all duration-1000 bg-orange-50">
            <Text className="relative tracking-tight font-medium text-lg font-japanese text-xl text-orange-700">
              {thread.user_message}
            </Text>
            <View className="flex justify-end flex-row gap-2">
              <MilaHint />
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
                value={token.replace(/\s/g, '&nbsp;')}
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
          }}
        >
          <PlayAudio />
        </Pressable>
        <Pressable
          onPress={async () => {
            showToggleTranslate(x => !x)
            refetch()
          }}
        >
          <TranslateIcon />
        </Pressable>
      </View>
      {feedbackTranslate && showTranslate && (
        <View className="mt-6 pt-10 px-4 pb-4 rounded-br-2xl rounded-bl-2xl bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-white">
          <Text>{feedbackTranslate?.translated_text}</Text>
        </View>
      )}
    </>
  )
}
