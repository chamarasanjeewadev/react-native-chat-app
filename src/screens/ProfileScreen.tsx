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
import { isLangJapaneseOrChinese } from '../utils/commonFunctions'
import MChatButton from '../components/atoms/MChatButton'
import { useSettingStore } from '../stores/settingStore'
import { useState } from 'react'
import { MTextInput } from '../components/atoms/MTextInput'
import { SelectSubLanguage } from '../components/molecules/SubLanguageSelect'
import { MSection } from '../components/atoms/MSection'
const targetLanguage = { value: LanguageEnum.Japanese }

const schema = yup.object().shape({
  background_id: yup.number(),
  daily_commitment: yup.number(),
  full_name: yup.string(),
  icon_id: yup.number(),
  native_language: yup.string(),
  proficiency: yup.string(),
  target_language: yup.string()
})

const ProfileScreen = () => {
  const { data: user } = useGetUsersQuery()
  const { mutate } = useUserPost()
  const { t } = useTranslation()
  console.log('commitment', user?.user?.daily_commitment)

  const { control, handleSubmit, setValue, watch } = useForm<Partial<User>>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...user?.user,
      daily_commitment: user?.user?.daily_commitment,
      proficiency: user?.user_metrics?.proficiency
    }
  })
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [notation, setNotation] = useState<NotationType>({
    lang: user?.user?.target_language,
    notation: 'Romaji'
  })
  const [autoRecord, setUserState] = useSettingStore(state => [
    state.themeColor,
    state.setThemeColor,
    state.setUserState,
    state.showRomaji,
    state.setRomajiShown,
    state.autoSubmitThreadhold,
    state.autoRecord,
    state.audioOnly,
    state.setAudioOnly,
    state.colorMode,
    state.setColorMode
  ])
  const [autoRecordEnabled, setAutoRecordEnabled] = useState(autoRecord)
  const [autoSubmitThreadholdState, setAutoSubmitThreadhold] = useState(0)
  const latestIconId = watch('icon_id')
  const backgroundId = watch('background_id')
  const onSubmit = data => {
    setUserState({
      language: notation.lang,
      notation: notation.notation,
      autoRecord: autoRecordEnabled,
      autoSubmitThreadhold: autoSubmitThreadholdState
    })
    mutate(data)
  }

  return (
    <ScrollView automaticallyAdjustContentInsets={false}>
      <View className="mx-2 mt-2 mb-2 dark:bg-black">
        <MSection>
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
        </MSection>
        <MHairLine />
        <MSection className="flex ">
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 ">
            {t('settings.personal-info.name')}
          </MText>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, onBlur } }) => (
              <MTextInput
                key="firstName"
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={user?.user?.full_name}
              />
            )}
            name="full_name"
          />
        </MSection>
        <MHairLine />
        <MSection>
          <View className="flex max-sm:flex-col max-sm:gap-1.5">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
              {t('settings.personal-info.email')}
            </MText>
            <MTextInput editable={false} value={user?.user?.email} readOnly />
          </View>
        </MSection>
        {/* profilePic */}
        <MSection>
          <View className="w-[280px]">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.personal-info.profile-picture')}
            </MText>
            <MText className="text-sm text-[#475569] dark:text-slate-300">
              {t('settings.personal-info.profile-picture.description')}
            </MText>
            <View className="w-full flex justify-center ">
              <View
                className={clsx(
                  'mt-2 w-[50] h-[50] rounded-full flex  justify-center',
                  avatarBackgroundColors[backgroundId]?.bgColor
                )}>
                <Image className="mx-auto" resizeMode="cover" source={avatarImages[latestIconId]} />
              </View>
            </View>
          </View>
        </MSection>
        {/* avatar */}
        <MSection>
          <View className="flex flex-col mb-2">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.choose-avatar')}
            </MText>
            <Image src={avatarImages[user?.user?.icon_id]} className="py-2" />
            <ScrollView horizontal>
              <View className="flex flex-row gap-2 mb-4 overflow-x-auto slim-scrollbar">
                {avatarImages.map((avatar, index) => (
                  <Pressable
                    className="cursor-pointer w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                    key={index}
                    onPress={() => {
                      setValue('icon_id', index)
                    }}>
                    <Image resizeMode="cover" source={avatar} />
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <MHairLine />
          </View>
        </MSection>
        {/* background color */}
        <MSection>
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.choose-background-color')}
          </MText>
          <ScrollView horizontal className="py-2">
            <View className="flex flex-row gap-5 overflow-x-auto slim-scrollbar">
              {avatarBackgroundColors.map((c, index) => (
                <Pressable
                  className={clsx(
                    c.bgColor,
                    'w-[50px] h-[50px] rounded-full cursor-pointer min-w-[50px]'
                  )}
                  key={`bg-${index}`}
                  onPress={() => {
                    setValue('background_id', index)
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </MSection>
        {/* dark mode */}
        <MSection>
          <View className="flex gap-2 mt-2">
            <View className="">
              <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
                Dark Mode
              </MText>
            </View>
            <View className="">
              <Switch
                value={colorScheme === 'dark'}
                onChange={() => {
                  toggleColorScheme()
                }}></Switch>
            </View>
          </View>
        </MSection>
        {/* languageSettings */}
        <View className="">
          <MText className="text-lg font-semibold dark:text-white">{t('settings.language')}</MText>
          <MText className="text-sm text-[#475569] dark:text-slate-300">
            {t('settings.language.description')}
          </MText>
        </View>

        <MHairLine />
        {/* auto submit */}
        <MSection>
          <View className="w-[280px]">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.auto-submit')}
            </MText>
          </View>
          <View className="w-[400px] max-sm:w-full">
            <Slider
              minimumValue={0}
              maximumValue={10}
              value={autoSubmitThreadholdState}
              onValueChange={value => {
                console.log('value', value)
                setAutoSubmitThreadhold(value)
              }}
              tapToSeek
              StepMarker={({ stepMarked }) => {
                return <Text>0</Text>
              }}
              step={1}
              style={{ width: 300, height: 40 }}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>
          <MText className="text-sm text-[#475569] dark:text-slate-300">
            {t('settings.auto-submit.description', { seconds: 0 })}
          </MText>
        </MSection>
        {/* auto recording */}
        <MSection>
          <View className="">
            <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300">
              {t('settings.auto-record')}
            </MText>
          </View>
          <View className="w-[400px]">
            <Switch
              value={autoRecordEnabled}
              onValueChange={value => {
                console.log('value', value)
                setAutoRecordEnabled(value)
              }}></Switch>
            <MText className="text-sm text-[#475569] dark:text-slate-300 mt-2">
              {t('settings.auto-record.description')}
            </MText>
          </View>
        </MSection>
        {/* display notation */}
        {isLangJapaneseOrChinese(notation.lang) && (
          <MSection>
            <SelectSubLanguage
              notationInfo={notation}
              setNotation={setNotation}
              targetLanguage={user?.user?.target_language}
            />
          </MSection>
        )}
        <MHairLine />

        <MSection>
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
            {t('settings.proficiencylevel')}
          </MText>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <MDropdown value={value} items={proficiencyOptions} onValueChange={onChange} />
            )}
            name="proficiency"
          />
        </MSection>
        <MHairLine />
        {/* daily commitment */}
        <MSection>
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 ">
            {t('settings.daily-commit')}
          </MText>
          <View className=" ">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <MDropdown value={+value} items={dailyCommitOptions} onValueChange={onChange} />
              )}
              name="daily_commitment"
            />
            <MText className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
              {t('settings.daily-commit.description')}
            </MText>
          </View>
        </MSection>
        <MHairLine />
        {/* native language */}
        <MSection>
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
            {t('settings.native-language')}
          </MText>
          <View className="">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <MDropdown value={value} items={nativeLanguageOptions} onValueChange={onChange} />
              )}
              name="native_language"
            />
            <MText className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
              {t('settings.native-language.description')}
            </MText>
          </View>
        </MSection>
        <MHairLine />
        {/* target language */}
        <MSection>
          <MText className="text-sm font-semibold text-[#334155] dark:text-slate-300 ">
            {t('settings.target-language')}
          </MText>
          <ScrollView
            horizontal
            className="flex-1 gap-2 m-2 p-2 flex flex-row overflow-x-auto slim-scrollbar">
            {targetLanguages.map((option, index) => (
              <MChatButton
                onPress={() => {
                  setValue('target_language', option.value)
                  const notation: Notation =
                    option.value === 'Japanese'
                      ? 'Romaji'
                      : option.value === 'Mandarin Chinese'
                        ? 'Zhuyin'
                        : null
                  console.log('target language', option.value)
                  console.log('notation', notation)
                  setNotation({ lang: option.value, notation: notation })
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
        </MSection>
        <MSection>
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
        </MSection>
      </View>
    </ScrollView>
  )
}
export default ProfileScreen

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
