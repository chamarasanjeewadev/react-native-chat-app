import { LanguageEnum } from './enums'

export const isLangJapaneseOrChinese = (targetLanguage: LanguageEnum) => {
  return targetLanguage === LanguageEnum.Japanese || targetLanguage === LanguageEnum.Chinese
}
