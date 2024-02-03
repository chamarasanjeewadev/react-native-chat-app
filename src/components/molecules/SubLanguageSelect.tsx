import { View } from 'react-native'
import { MCheckBoxWithCaption } from '../atoms/MCheckBox'
import { MText } from '../atoms/MText'
import { t } from 'i18next'
import { useState } from 'react'
import { MHairLine } from '../atoms/MHairLine'

interface TargetLangProps {
  targetLanguage: Language
  notationInfo: NotationType
  setNotation: React.Dispatch<React.SetStateAction<NotationType>>
}

export const SelectSubLanguage = ({
  targetLanguage,
  notationInfo,
  setNotation
}: TargetLangProps) => {
  const [isLanguageSelectionShown, setIsLanguageSelectionShown] = useState<boolean>(false)
  return (
    <>
      <MHairLine />
      <MCheckBoxWithCaption
        key={'selectNotation'}
        caption={t('settings.showPR')}
        value={isLanguageSelectionShown}
        onValueChange={newValue => setIsLanguageSelectionShown(newValue)}
      />
      <MText className="mt-4 text-[#475569] dark:text-slate-300 text-sm">
        {t('settings.showPR.description')}
      </MText>
      {isLanguageSelectionShown && (
        <View className="my-5 gap-4   dark:border-mila-gray-25 flex flex-row">
          {targetLanguage === 'Japanese' && (
            <>
              <MCheckBoxWithCaption
                key={'japaneseFurigana'}
                value={notationInfo.notation === 'Furigana'}
                caption={t('settings.furigana')}
                onValueChange={() => setNotation({ lang: 'Japanese', notation: 'Furigana' })}
              />
              <MCheckBoxWithCaption
                key={'japaneseRomaji'}
                value={notationInfo.notation === 'Romaji'}
                caption={t('settings.romaji')}
                onValueChange={() => setNotation({ lang: 'Japanese', notation: 'Romaji' })}
              />
            </>
          )}
          {targetLanguage === 'Mandarin Chinese' && (
            <>
              <MCheckBoxWithCaption
                key="chineseRomaji"
                value={notationInfo.notation === 'Romaji'}
                caption={t('settings.romaji')}
                onValueChange={() => setNotation({ lang: 'Mandarin Chinese', notation: 'Romaji' })}
              />
              <MCheckBoxWithCaption
                key="chineseZhuyin"
                value={notationInfo.notation === 'Zhuyin'}
                caption={'Zhuyin'}
                onValueChange={() => setNotation({ lang: 'Mandarin Chinese', notation: 'Zhuyin' })}
              />
            </>
          )}
        </View>
      )}
    </>
  )
}
