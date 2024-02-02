import clsx from 'clsx'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, TextInput, View, ScrollView, Switch } from 'react-native'
import { avatarBackgroundColors, avatarImages } from '../utils/avatar'
import { LanguageEnum } from '../utils/enums'
import { themeColors } from '../utils/consts'
import MButton from '../components/atoms/MButton'
import { MHairLine } from '../components/atoms/MHairLine'
import { MText } from '../components/atoms/MText'
const avatarBgIndex = 1
const avatarIndex = 1
const targetLanguage = { value: LanguageEnum.Japanese }
const themeColor = 'blue'

export const targetLanguages: ITargetLanguageOption[] = [
  {
    // flag:<View></View> <UK_O />,
    value: LanguageEnum.British,
    label: (
      <>
        English
        <br />
        (UK)
      </>
    )
  },
  {
    // flag: <US_O />,
    value: LanguageEnum.American,
    label: (
      <>
        English
        <br />
        (US)
      </>
    )
  },
  {
    // flag: <FR_O />,
    value: LanguageEnum.French,
    label: <>French</>
  },
  {
    // flag: <MX_O />,
    value: LanguageEnum.Mexican,
    label: (
      <>
        Spanish
        <br />
        (MX)
      </>
    )
  },
  {
    // flag: <ES_O />,
    value: LanguageEnum.Spanish,
    label: (
      <>
        Spanish
        <br />
        (ES)
      </>
    )
  },
  {
    // flag: <GE_O />,
    value: LanguageEnum.German,
    label: <>German</>
  },
  {
    // flag: <JP_O />,
    value: LanguageEnum.Japanese,
    label: <>Japanese</>
  },
  {
    // flag: <CN_O />,
    value: LanguageEnum.Chinese,
    label: <>Chinese</>
  }
]

const SettingsScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation()
  return (
    <ScrollView>
      <View className="m-4">
        <View className="flex flex-row justify-between  ">
          <View>
            <MText className="text-lg font-semibold dark:text-white">
              {t('settings.personal-info.title')}
            </MText>
            <MText className="text-sm text-[#475569] dark:text-slate-300">
              {t('settings.personal-info.description')}
            </MText>
          </View>
          <MButton
            buttonText={t('save')}
            className="m-3 p-3 text-center"
            onPress={() => {
              console.log('pressed')
            }}
          />
        </View>
        <MHairLine />
        <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
            {t('settings.personal-info.name')}
          </MText>
          <TextInput
            value={'chamara'}
            className="outline-none border border-[#CBD5E1] rounded-lg px-3 py-2 focus:border-gray-300  text-sm max-sm:w-full  dark:bg-transparent dark:border-slate-300 dark:text-white"
            onChange={e => {
              // setFullName(e.currentTarget.value)
            }}
            // disabled={isSaving}
          />
        </View>
        <View className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
        <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
            {t('settings.personal-info.email')}
          </MText>
          <TextInput
            value={'chamara.sanjeewa@gmail.com'}
            className="outline-none border border-[#CBD5E1] rounded-lg px-3 py-2 focus:border-gray-300 w-[400px] text-sm max-sm:w-full disabled:bg-slate-200  dark:bg-transparent dark:border-slate-300 dark:text-white"
            readOnly
          />
        </View>
        <View className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
        <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
          <View className="w-[280px]">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.personal-info.profile-picture')}
            </MText>
            <MText className="text-sm text-[#475569] dark:text-slate-300 w-[280px]">
              {t('settings.personal-info.profile-picture.description')}
            </MText>
            <View className="w-full flex justify-center max-sm:justify-start">
              <View
                className={clsx(
                  'mt-6 w-[50px] h-[50px] rounded-full',
                  avatarBackgroundColors[avatarBgIndex].bgColor
                )}>
                <Image src={avatarImages[avatarIndex]} className="mt-1" />
              </View>
            </View>
          </View>
          <View className="flex flex-col gap-4 flex-1 w-0 max-sm:w-full">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.choose-avatar')}
            </MText>
            {/* <View className="flex flex-row gap-4 overflow-x-auto slim-scrollbar">
            {avatarImages.map((avatar, index) => (
             <Pressable
                className="cursor-pointer w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                key={index}
                onPress={() => {
                  // setAvatarIndex(index)
                }}>
                <Image
                  src={avatar}
                  key={index}
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                />
              </Pressable>
            ))}
          </View> */}
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.choose-background-color')}
            </MText>
            <View className="flex flex-row gap-5 overflow-x-auto slim-scrollbar">
              {avatarBackgroundColors.map((c, index) => (
                <Pressable
                  className={clsx(
                    c.bgColor,
                    'w-[50px] h-[50px] rounded-full cursor-pointer min-w-[50px]'
                  )}
                  key={`bg-${index}`}
                  onPress={() => {
                    // setAvatarBgIndex(index)
                  }}
                />
              ))}
            </View>
          </View>
          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
            <View className="w-[280px]">
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
                Dark Mode
              </MText>
            </View>
            <View className="w-[400px]">
              {/* <Switch
              checked={colorMode === 'dark'}
              color="blue"
              onChange={enabled => {
                setColorMode(enabled ? 'dark' : 'light')
              }}
            /> */}
            </View>
          </View>

          <View className="mt-6">
            <MText className="text-lg font-semibold dark:text-white">
              {t('settings.language')}
            </MText>
            <MText className="text-sm text-[#475569] dark:text-slate-300">
              {t('settings.language.description')}
            </MText>
          </View>
          <View className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />

          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
            <View className="w-[280px]">
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
                {t('settings.auto-submit')}
              </MText>
            </View>
            <View className="w-[400px] max-sm:w-full">
              {/* <Range
              min={1}
              max={10}
              value={threadhold}
              onChange={t => {
                setThreadhold(t)
              }}
              step={1}
              tooltip={value => `${value} sec`}
              color={themeColor}
            /> */}
            </View>
          </View>
          <View className="text-sm text-[#475569] dark:text-slate-300 mt-6">
            <MText>{t('settings.auto-submit.description', { seconds: 0 })}</MText>
          </View>

          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
            <View className="w-[280px]">
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
                {t('settings.auto-record')}
              </MText>
            </View>
            <View className="w-[400px]">
              {/* <Toggle
              checked={autoRecordEnabled}
              color="blue"
              onChange={enabled => {
                setAutoRecordEnabled(enabled)
              }}
            /> */}
            </View>
          </View>
          <MText className="text-sm text-[#475569] dark:text-slate-300 mt-2">
            {t('settings.auto-record.description')}
          </MText>

          {(targetLanguage.value === LanguageEnum.Japanese ||
            targetLanguage.value === LanguageEnum.Chinese) && (
            <View className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
          )}
          {(targetLanguage.value === LanguageEnum.Japanese ||
            targetLanguage.value === LanguageEnum.Chinese) && (
            <View
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                // setIsRomajiShown(!isRomajiShown)
              }}>
              {/* <Switch
              className={clsx(
                'text-white w-4 h-4',
                themeColor === 'orange' ? 'accent-orange-600' : '',
                themeColor === 'blue' ? 'accent-blue-600' : '',
                themeColor === 'pink' ? 'accent-pink-600' : ''
              )}
              checked={true}
            /> */}
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
                {t('settings.showPR')}
              </MText>
            </View>
          )}

          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
              {t('settings.proficiencylevel')}
            </MText>
            <View className="w-[400px] max-sm:w-full">
              {/* <Select
              options={proficiencyOptions}
              value={proficiencyOption}
              onChange={val => {
                setProficiencyOption(val)
              }}
              className="flex-1"
              disabled={isSaving}
            /> */}
            </View>
          </View>

          <View className="flex gap-8 max-sm:flex-col max-sm:gap-5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
              {t('settings.native-language')}
            </MText>
            <View className="w-[400px] max-sm:w-full">
              {/* MText/* <Select
              options={nativeLanguageOptions}
              value={nativeLanguage}
              onChange={val => {
                setNativeLanguage(val)
              }}
              className="flex-1"
              disabled={isSaving}
            /> */}
              <MText className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
                {t('settings.native-language.description')}
              </MText>
            </View>
          </View>
          <View className="flex gap-8 max-sm:flex-col max-sm:gap-5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
              {t('settings.target-language')}
            </MText>
            <View className="flex-1 flex gap-2 overflow-x-auto slim-scrollbar">
              {targetLanguages.map((option, index) => (
                <View
                  className={clsx(
                    'w-[90px] p-2 flex justify-center border',
                    targetLanguage.value === option.value
                      ? 'border-blue-400 rounded-lg'
                      : 'border-transparent'
                  )}
                  key={index}>
                  {/* <button
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => {
                    // setTargetLanguage(option)
                  }}>
                  {option.flag}
                  <View className="text-sm font-semibold text-[#334155] text-center mt-2">
                    {option.label}
                  </View>
                </button> */}
                </View>
              ))}
            </View>
          </View>
          <View className="mt-4 flex flex-col gap-4 text-sm pl-2">
            <View className="flex flex-col text-[#475467] dark:text-slate-300 text-left gap-4">
              <View className="flex max-md:flex-col">
                <MText> We care about your data in our</MText>
              </View>
              <Pressable
                className="cursor-pointer underline underline-offset-4 text-[#475467] dark:text-slate-300 w-fit"
                onPress={() => {}}>
                <MText>Terms and Conditions</MText>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default SettingsScreen
