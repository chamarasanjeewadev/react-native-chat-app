import { Text, View } from 'react-native'
import { MText } from '../atoms/MText'
import { LanguageEnum } from '../../utils/enums'

export const BotWord = ({
  value,
  learned,
  hasTranslation = false,
  translation = '',
  audio,
  romanized_character,
  kanji_length = 0
}) => {
  return (
    <View>
      <MText>{romanized_character}</MText>
      <MText>{value}</MText>
    </View>
  )
}

type BotMessageProps = {
  tokenization_response: Token[]
  showRomaji: boolean
  language: NotationType
}

export const BotMessage = ({ tokenization_response, showRomaji, language }: BotMessageProps) => {
  return (
    <View className="flex flex-row flex-wrap">
      {tokenization_response?.map(
        (
          { token, translation, furigana, audio, romanization, kanji_only_length, zhuyin, learned },
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
                ? language.lang === LanguageEnum.Japanese
                  ? language.notation === 'Furigana'
                    ? furigana
                    : romanization
                  : language.notation === 'Romaji'
                    ? romanization
                    : zhuyin
                : null
            }
            kanji_length={kanji_only_length || 0}
          />
        )
      )}
    </View>
  )
}
