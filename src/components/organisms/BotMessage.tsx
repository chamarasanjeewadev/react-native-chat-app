import { View } from 'react-native'
import { MText } from '../atoms/MText'
import { LanguageEnum } from '../../utils/enums'
import MButton from '../atoms/MButton'
import PlayAudio from '../../assets/icons/svgs/PlayAudio.svg'
import TranslateIcon from '../../assets/icons/svgs/translate.svg'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import { useState } from 'react'
import { useContextTranslate, useFeedbackTranslate } from '../../hooks/queries'
import { ChatBox } from '../molecules/ChatBox'
import PlaySlowIcon from '../../assets/icons/svgs/PlaySlow.svg'
import clsx from 'clsx'

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
      disabled={!audio}
      intent="chat"
      onPress={() => {
        playAudio({ audioUrl: audio })
      }}>
      <View>
        {romanized_character && <MText className="text-secondary">{romanized_character}</MText>}
        <MText>{value}</MText>
      </View>
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
  const [toggleTranslate, setToggleTranslate] = useState(false)
  const {
    data: translatedResponse,
    refetch,
    isFetching
  } = useFeedbackTranslate(text_response, difficulty, sectionId, response_message_id)
  const { playAudio } = useAudioPlayer()

  return (
    <>
      <ChatBox loading={false} intent={'mila'}>
        <BotText
          // audio_response={audio_response}
          text_response={text_response}
          response_message_id={response_message_id}
          showRomaji={showRomaji}
          {...props}
        />
        <View className="flex flex-row gap-2 ">
          <MButton
            intent="buttonIcon"
            leadingIcon={<PlayAudio className="color-chatbutton" />}
            onPress={async () => {
              playAudio({ audioUrl: audio_response })
            }}
          />
          <MButton
            intent="buttonIcon"
            leadingIcon={<PlaySlowIcon className="color-chatbutton" />}
            onPress={async () => {
              playAudio({ audioUrl: audio_response, rate: 0.75 })
            }}
          />
          <MButton
            loading={isFetching}
            className={clsx(toggleTranslate ? 'bg-primary' : '')}
            intent="buttonIcon"
            leadingIcon={<TranslateIcon className="color-chatbutton" />}
            onPress={async () => {
              setToggleTranslate(x => !x)
              if (!toggleTranslate) {
                await refetch()
              }
            }}
          />
        </View>
      </ChatBox>
      {translatedResponse && toggleTranslate && !isFetching && (
        <ChatBox
          loading={false}
          intent={'mila'}
          className="-mt-3 rounded-t-none bg-card text-card-foreground">
          <MText className=" flex-grow pt-2">{translatedResponse?.translated_text}</MText>
        </ChatBox>
      )}
    </>
  )
}
export const BotText = ({
  audio_response,
  text_response,
  showRomaji,
  language
}: BotMessageProps) => {
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
