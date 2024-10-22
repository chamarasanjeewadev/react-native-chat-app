import { View } from 'react-native'
import { MText } from '../atoms/MText'
import { LanguageEnum } from '../../utils/enums'
import MButton from '../atoms/MButton'
import PlayAudio from '../../assets/icons/svgs/PlayAudio.svg'
import TranslateIcon from '../../assets/icons/svgs/translate.svg'
import { useState } from 'react'
import { useContextTranslate, useFeedbackTranslate, useGetTokenAudio } from '../../hooks/queries'
import { ChatBox } from '../molecules/ChatBox'
import PlaySlowIcon from '../../assets/icons/svgs/PlaySlow.svg'
import clsx from 'clsx'
import { useAudio } from '../../hooks/AudioProvider'

const BotWord = ({
  audio,
  value,
  romanized_character
}: {
  audio
  value: string
  romanized_character: string
}) => {
  const { data, refetch, isFetching } = useGetTokenAudio({ text: value })
  const { playAudio } = useAudio()
  return (
    <MButton
      // disabled={!audio}
      intent="chat"
      onPress={() => {
        // load audio and then play
        refetch().then(data => {
          const audioResponse = data.data.audio_response_path
          const audio = audioResponse[value]
          console.log('data........', audio)
          playAudio({ audioUrl: audio })
        })
      }}>
      <View className="bg-red">
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
  tokenization_response?: Token[]
}

export const BotMessage = ({
  text_response,
  tokenization_response,
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
  const { playAudio } = useAudio()

  return (
    <>
      <ChatBox intent={'mai'} className={clsx(toggleTranslate && 'rounded-b-none')}>
        <BotText
          // audio_response={audio_response}
          text_response={text_response}
          response_message_id={response_message_id}
          showRomaji={showRomaji}
          tokenization_response={tokenization_response}
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
      {toggleTranslate && !isFetching && (
        <ChatBox
          intent={'mai'}
          className="z-1 -mt-1 rounded-t-none bg-card pt-2 text-card-foreground">
          <MText className=" flex-grow ">
            {translatedResponse?.translated_text ?? 'No translation found'}
          </MText>
        </ChatBox>
      )}
    </>
  )
}
export const BotText = ({
  audio_response,
  text_response,
  showRomaji,
  language,
  tokenization_response
}: BotMessageProps) => {
  // const { data: tokens } = useContextTranslate(text_response)
  console.log('tokenization response', tokenization_response)
  return (
    <>
      <View className="flex flex-row flex-wrap">
        {tokenization_response ? (
          tokenization_response?.map(({ token, furigana, romanization, zhuyin, audio }, index) => (
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
          ))
        ) : (
          <MText>{'dsafss'}</MText>
        )}
      </View>
    </>
  )
}
