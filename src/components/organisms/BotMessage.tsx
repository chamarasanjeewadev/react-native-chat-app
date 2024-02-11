import { View } from 'react-native'
import { MText } from '../atoms/MText'
import { LanguageEnum } from '../../utils/enums'
import MButton from '../atoms/MButton'
import { PlayAudio } from '../../assets/icons/PlayAudio'
import { TranslateIcon } from '../../assets/icons/TranslateIcon'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import { useState } from 'react'
import { useContextTranslate, useFeedbackTranslate } from '../../hooks/queries'
import { ChatBox, TranslateBox } from '../molecules/ChatBox'
import LoadingDots from '../atoms/LoadingDots'
import { ThinkingMila } from '../../assets/icons/ThinkingMila'

const BotWord = ({
  value,
  romanized_character
}: {
  value: string
  romanized_character: string
}) => {
  return (
    <View>
      <MText>{romanized_character}</MText>
      <MText>{value}</MText>
    </View>
  )
}

type BotMessageProps = {
  text_response?: string
  difficulty?: number
  sectionId?: string
  response_message_id
  showRomaji: boolean
  language: NotationType
  audio_response?: string
}

export const BotMessage = ({
  text_response,
  difficulty,
  sectionId,
  response_message_id,
  audio_response,
  showRomaji,
  ...props
}: BotMessageProps) => {
  const [showTranslate, showToggleTranslate] = useState(false)
  const {
    data: feedbackTranslate,
    refetch,
    isFetching,
    isLoading
  } = useFeedbackTranslate(text_response, difficulty, sectionId, response_message_id)
  const { playAudio } = useAudioPlayer(audio_response)
  return (
    <>
      <ChatBox loading={isFetching || isLoading} intent={'mila'} className="flex">
        {isFetching ? (
          <LoadingDots dots={3} borderRadius={50} size={15} bounceHeight={2} />
        ) : (
          <View>
            <View>
              <BotText
                text_response={text_response}
                response_message_id={response_message_id}
                showRomaji={showRomaji}
                {...props}
              />
            </View>
            <View className="flex flex-row gap-2 ">
              <MButton leadingIcon={<PlayAudio />} onPress={playAudio} />
              <MButton
                leadingIcon={<TranslateIcon />}
                onPress={async () => {
                  console.log('isfetching....')
                  // if (!showToggleTranslate) {
                  await refetch()
                  // }
                  showToggleTranslate(x => !x)
                }}
              />
            </View>
          </View>
        )}
        {feedbackTranslate && showTranslate && !isFetching && (
          <TranslateBox>
            <MText>{feedbackTranslate?.translated_text}</MText>
          </TranslateBox>
        )}
      </ChatBox>
      {(isFetching || isLoading) && <ThinkingMila />}
    </>
  )
}
export const BotText = ({ text_response, showRomaji, language }: BotMessageProps) => {
  const { data: tokens } = useContextTranslate(text_response)
  return (
    <>
      <View className="flex flex-row flex-wrap">
        {tokens?.tokenization_response?.map(({ token, furigana, romanization, zhuyin }, index) => (
          <BotWord
            key={index}
            value={token}
            romanized_character={
              showRomaji
                ? language.lang === LanguageEnum.Japanese
                  ? language.notation === 'Furigana'
                    ? furigana
                    : romanization
                  : language.notation === 'Romaji'
                    ? romanization
                    : zhuyin
                : null
            }
          />
        ))}
      </View>
    </>
  )
}
