import { Text, View } from 'react-native'
import { MText } from '../atoms/MText'

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
    <View className="bot-word relative cursor-default whitespace-pre text-xl font-medium font-semibold tracking-tight text-slate-800 dark:text-white">
      <MText className="text-center text-xs">{romanized_character}</MText>
      <MText className={'font-chinese text-center text-xl tracking-widest'}>{value}</MText>
    </View>
  )
}
