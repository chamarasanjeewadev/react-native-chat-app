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
    <View className="cursor-default font-semibold relative text-xl tracking-tight font-medium whitespace-pre bot-word text-slate-800 dark:text-white">
      <MText className="text-xs text-center">{romanized_character}</MText>
      <MText className={'text-center text-xl tracking-widest font-chinese'}>{value}</MText>
    </View>
  )
}
