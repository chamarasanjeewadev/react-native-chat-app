import Slider from '@react-native-community/slider'
import clsx from 'clsx'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Pressable, TextInput, View, ScrollView, Switch, Button, Text } from 'react-native'
import { avatarBackgroundColors, avatarImages } from '../utils/avatar'
import { LanguageEnum } from '../utils/enums'
import { proficiencyOptions, themeColors } from '../utils/consts'
import { useColorScheme } from 'nativewind'
import MButton from '../components/atoms/MButton'
import { CN_O, ES_O, FR_O, GE_O, JP_O, MX_O, UK_O, US_O } from '../assets/icons/Flags'
import { MHairLine } from '../components/atoms/MHairLine'
import { MText } from '../components/atoms/MText'
import { useUserPost } from '../hooks/mutations'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup' // install @hookform/resolvers (not @hookform/resolvers/yup)
import * as yup from 'yup'
import { useGetUsersQuery } from '../hooks/queries'
import { MDropdown } from '../components/atoms/MDropdown'
import MCheckBox from '../components/atoms/MCheckBox'
import { isLangJapaneseOrChinese } from '../utils/commonFunctions'
import MChatButton from '../components/atoms/MChatButton'
import { useSettingStore } from '../stores/settingStore'
import { useState } from 'react'
const avatarBgIndex = 1
const avatarIndex = 1
const targetLanguage = { value: LanguageEnum.Japanese }
const themeColor = 'blue'

const schema = yup.object().shape({
  background_id: yup.number(),
  daily_commitment: yup.number(),
  full_name: yup.string(),
  icon_id: yup.number(),
  native_language: yup.string(),
  proficiency: yup.string(),
  target_language: yup.string()
})

const SettingsScreen = ({ navigation }) => {
  const { data: user, isLoading, refetch: getUserInfo } = useGetUsersQuery()
  const { mutate } = useUserPost()
  const { t, i18n } = useTranslation()
  const { control, handleSubmit, errors, setValue, reset, getValues, watch } = useForm({
    resolver: yupResolver(schema)
  })
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme()

  const [
    themeColor,
    setThemeColor,
    showRomaji,
    setRomajiShown,
    japaneseNotation,
    setJapaneseNotation,
    chineseNotation,
    setChineseNotation,
    autoSubmitThreadhold,
    setAutoSubmitThreadhold,
    autoRecord,
    setAutoRecord,
    audioOnly,
    setAudioOnly,
    colorMode,
    setColorMode
  ] = useSettingStore(state => [
    state.themeColor,
    state.setThemeColor,

    state.showRomaji,
    state.setRomajiShown,

    state.japaneseNotation,
    state.setJapaneseNotation,

    state.chineseNotation,
    state.setChineseNotation,

    state.autoSubmitThreadhold,
    state.setAutoSubmitThreadhold,
    state.autoRecord,
    state.setAutoRecord,
    state.audioOnly,
    state.setAudioOnly,

    state.colorMode,
    state.setColorMode
  ])
  const [autoRecordEnabled, setAutoRecordEnabled] = useState(autoRecord)
  const userInfo: User = user?.user || ({} as User)
  const defaultValues = {
    full_name: userInfo?.full_name ?? '',
    icon_id: userInfo?.icon_id,
    background_id: userInfo?.background_id,
    content: '',
    email: userInfo?.email
  }

  const onSubmit = data => {
    console.log('on submit triggered...', data)
    setAutoRecord(autoRecordEnabled)
    mutate(data)
    console.log(data)
  }
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <MHairLine />
        <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
            {t('settings.personal-info.name')}
          </MText>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={defaultValues.full_name}
              />
            )}
            name="full_name"
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
                  avatarBackgroundColors[userInfo?.background_id]?.bgColor
                )}>
                <Image resizeMode="cover" source={avatarImages[avatarImages[userInfo?.icon_id]]} />
              </View>
            </View>
          </View>
          <View className="flex flex-col mb-2">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.choose-avatar')}
            </MText>
            <Image src={avatarImages[avatarIndex]} className="mt-1" />
            <View className="flex flex-row gap-4 overflow-x-auto slim-scrollbar">
              {avatarImages.map((avatar, index) => (
                <Pressable
                  className="cursor-pointer w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                  key={index}
                  onPress={() => {
                    // setAvatarIndex(index)
                    setValue('icon_id', index)
                  }}>
                  <Image resizeMode="cover" source={avatar} />
                </Pressable>
              ))}
            </View>
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
                    setValue('background_id', index)
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
              <Switch
                value={colorScheme === 'dark'}
                onChange={() => {
                  toggleColorScheme()
                }}></Switch>
              {/* <Switch
              checked={colorMode === 'dark'}
              color="blue"
              onChange={enabled => {
                setColorMode(enabled ? 'dark' : 'light')
              }}
            /> */}
            </View>
          </View>
          <MHairLine />
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
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />
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
            onChange={(enabled) => {
              setAutoRecordEnabled(enabled)
            }}
          /> */}
              <Switch
                value={autoRecordEnabled}
                onChange={value => {
                  // toggleColorScheme()
                  setAutoRecordEnabled(value)
                }}></Switch>
            </View>
          </View>
          <MText className="text-sm text-[#475569] dark:text-slate-300 mt-2">
            {t('settings.auto-record.description')}
          </MText>

          {isLangJapaneseOrChinese(targetLanguage.value) && (
            <View className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25">
              <MCheckBox />
            </View>
          )}
          {isLangJapaneseOrChinese(targetLanguage.value) && (
            <View className="flex gap-2 items-center cursor-pointer">
              <MCheckBox />
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
                {t('settings.showPR')}
              </MText>
            </View>
          )}
          <MHairLine />
          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
              {t('settings.proficiencylevel')}
            </MText>
            <MDropdown
              items={proficiencyOptions}
              onValueChange={value => {
                setValue('proficiency', value)
              }}
            />
          </View>
          <MHairLine />
          <View className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
            <View className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
              <MText>{t('settings.daily-commit')}</MText>
            </View>
            <View className="w-[400px] max-sm:w-full">
              <MDropdown
                items={dailyCommitOptions}
                onValueChange={value => {
                  setValue('daily_commitment', value)
                }}
              />
              <MText className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
                {t('settings.daily-commit.description')}
              </MText>
            </View>
          </View>
          <View className="flex gap-8 max-sm:flex-col max-sm:gap-5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
              {t('settings.native-language')}
            </MText>
            <View className="w-[400px] max-sm:w-full">
              <MDropdown
                items={nativeLanguageOptions}
                onValueChange={value => {
                  setValue('native_language', value)
                }}
              />
              <MText className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
                {t('settings.native-language.description')}
              </MText>
            </View>
          </View>
          <View className="flex fl gap-8 max-sm:flex-col max-sm:gap-5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
              {t('settings.target-language')}
            </MText>
            <ScrollView
              horizontal={true}
              className="flex-1 gap-2 m-2 p-2 flex flex-row gap-2 overflow-x-auto slim-scrollbar">
              {targetLanguages.map((option, index) => (
                <MChatButton
                  onPress={() => {
                    setValue('target_language', option.value)
                  }}
                  className={clsx(
                    'w-[90px] p-2 flex justify-center border',
                    targetLanguage.value === option.value
                      ? 'border-blue-400 rounded-lg'
                      : 'border-transparent'
                  )}
                  key={index}>
                  <View className="text-sm font-semibold text-[#334155] text-center mt-2">
                    <MText>{option.label}</MText>
                    <View>{option.flag}</View>
                  </View>
                </MChatButton>
              ))}
            </ScrollView>
          </View>
          <View className="mt-4 flex flex-col gap-4 text-sm pl-2">
            <View className="flex flex-col text-[#475467] dark:text-slate-300 text-left gap-4">
              <View className="flex max-md:flex-col">
                <MText> We care about your data in our</MText>
              </View>
              <Pressable className="cursor-pointer underline underline-offset-4 text-[#475467] dark:text-slate-300 w-fit">
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

export const targetLanguages: ITargetLanguageOption[] = [
  {
    flag: <UK_O />,
    value: LanguageEnum.British,
    label: <Text>English (UK)</Text>
  },
  {
    flag: <US_O />,
    value: LanguageEnum.American,
    label: <>English (US)</>
  },
  {
    flag: <FR_O />,
    value: LanguageEnum.French,
    label: <>French</>
  },
  {
    flag: <MX_O />,
    value: LanguageEnum.Mexican,
    label: <>Spanish (MX)</>
  },
  {
    flag: <ES_O />,
    value: LanguageEnum.Spanish,
    label: <>Spanish (ES)</>
  },
  {
    flag: <GE_O />,
    value: LanguageEnum.German,
    label: <>German</>
  },
  {
    flag: <JP_O />,
    value: LanguageEnum.Japanese,
    label: <>Japanese</>
  },
  {
    flag: <CN_O />,
    value: LanguageEnum.Chinese,
    label: <>Chinese</>
  }
]

const dailyCommitOptions: IOption[] = [
  {
    label: '5 minutes',
    value: 5
  },
  {
    label: '10 minutes',
    value: 10
  },
  {
    label: '15 minutes',
    value: 15
  },
  {
    label: '20 minutes',
    value: 20
  },
  {
    label: '30 minutes',
    value: 30
  },
  {
    label: '40 minutes',
    value: 40
  },
  {
    label: '50 minutes',
    value: 50
  },
  {
    label: '60 minutes',
    value: 60
  }
]

const nativeLanguageOptions: IOption[] = [
  {
    label: 'American English',
    value: 'American English'
  },
  {
    label: 'British English',
    value: 'British English'
  },
  {
    label: '普通话',
    value: 'Mandarin Chinese'
  },
  {
    label: 'Español',
    value: 'Spanish'
  },
  {
    label: 'Mexicano',
    value: 'Mexican Spanish'
  },
  {
    label: 'Français',
    value: 'French'
  },
  {
    label: 'Deutsch',
    value: 'German'
  },
  {
    label: 'Italiano',
    value: 'Italian'
  },
  {
    label: '日本語',
    value: 'Japanese'
  },
  {
    label: 'Русский',
    value: 'Russian'
  },
  {
    label: 'Português',
    value: 'Portuguese'
  },
  {
    label: 'Português Brasileiro',
    value: 'Brazilian Portuguese'
  },
  {
    label: 'Čeština',
    value: 'Czech'
  },
  {
    label: 'Dansk',
    value: 'Danish'
  },
  {
    label: 'Nederlands',
    value: 'Dutch'
  },
  {
    label: 'Suomi',
    value: 'Finnish'
  },
  {
    label: 'Ελληνικά',
    value: 'Greek'
  },
  {
    label: 'עִבְֿרִית‎',
    value: 'Hebrew'
  },
  {
    label: 'Bahasa Indonesia',
    value: 'Indonesian'
  },
  {
    label: '한국어',
    value: 'Korean'
  },
  {
    label: 'Norsk',
    value: 'Norwegian'
  },
  {
    label: 'Polski',
    value: 'Polish'
  },
  {
    label: 'Română',
    value: 'Romanian'
  },
  {
    label: 'Svenska',
    value: 'Swedish'
  },
  {
    label: 'Türkçe',
    value: 'Turkish'
  },
  {
    label: 'Українська',
    value: 'Ukrainian'
  }
]
