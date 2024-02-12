import { View } from 'react-native'
import { MText } from '../atoms/MText'
import { LanguageEnum } from '../../utils/enums'
import MButton from '../atoms/MButton'
import { PlayAudio } from '../../assets/icons/PlayAudio'
import { TranslateIcon } from '../../assets/icons/TranslateIcon'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import { useState } from 'react'
import { useContextTranslate, useFeedbackTranslate } from '../../hooks/queries'
import { ChatBox } from '../molecules/ChatBox'
import { PlaySlowIcon } from '../../assets/icons/PlaySlowIcon'

const BotWord = ({
  audio,
  value,
  romanized_character
}: {
  audio
  value: string
  romanized_character: string
}) => {
  const { playAudio } = useAudioPlayer()
  return (
    <MButton
      intent="link"
      onPress={() => {
        playAudio(audio)
      }}>
      <MText>{romanized_character}</MText>
      <MText>{value}</MText>
    </MButton>
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
    data: translatedResponse,
    refetch,
    isFetching
  } = useFeedbackTranslate(text_response, difficulty, sectionId, response_message_id)
  const { playAudio } = useAudioPlayer()

  return (
    <>
      <ChatBox loading={false} intent={'mila'} className="flex">
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
            <MButton
              leadingIcon={<PlayAudio />}
              onPress={async () => {
                playAudio({ audioUrl: audio_response })
              }}
            />
            <MButton
              leadingIcon={<PlaySlowIcon />}
              onPress={async () => {
                playAudio({ audioUrl: audio_response, rate: 0.75 })
              }}
            />
            <MButton
              leadingIcon={<TranslateIcon />}
              onPress={async () => {
                // if (!showToggleTranslate) {
                await refetch()
                // }
                showToggleTranslate(x => !x)
              }}
            />
          </View>
        </View>

        {translatedResponse && showTranslate && !isFetching && (
          <MText className=" flex-grow pt-2">{translatedResponse?.translated_text}</MText>
        )}
      </ChatBox>
    </>
  )
}
export const BotText = ({ text_response, showRomaji, language }: BotMessageProps) => {
  const { data: tokens } = useContextTranslate(text_response)
  return (
    <>
      <View className="flex flex-row flex-wrap">
        {tokens ? (
          tokens?.tokenization_response?.map(
            ({ token, furigana, romanization, zhuyin, audio }, index) => (
              <BotWord
                audio={audio}
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
            )
          )
        ) : (
          <MText>{text_response}</MText>
        )}
      </View>
    </>
  )
}
