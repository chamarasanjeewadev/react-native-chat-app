import Slider from '@react-native-community/slider'
import clsx from 'clsx'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import PaymentSheetSubscriptionExample from './../components/PaymentSheetSubscription'
import {
  Image,
  Pressable,
  View,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native'
import { avatarBackgroundColors, avatarImages } from '../utils/avatar'
import { LanguageEnum } from '../utils/enums'
import { MESSAGES, proficiencyOptions, themeColors } from '../utils/consts'
import { useColorScheme } from 'nativewind'
import MButton from '../components/atoms/MButton'
import { CN_O, ES_O, FR_O, GE_O, JP_O, MX_O, UK_O, US_O } from '../assets/icons/Flags'
import { MHairLine } from '../components/atoms/MHairLine'
import { MLabelText, MLabelTextDescription, MText } from '../components/atoms/MText'
import { useUserPost } from '../hooks/mutations'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup' // install @hookform/resolvers (not @hookform/resolvers/yup)
import * as yup from 'yup'
import { useGetUsersQuery } from '../hooks/queries'
import { MDropdown } from '../components/atoms/MDropdown'
import { isLangJapaneseOrChinese } from '../utils/commonFunctions'
import { useSettingStore } from '../stores/settingStore'
import { useState } from 'react'
import { MTextInput } from '../components/atoms/MTextInput'
import { SelectSubLanguage } from '../components/molecules/SubLanguageSelect'
import { MSection } from '../components/atoms/MSection'
import { Logout } from '../components/molecules/Logout'
import { Tick } from '../assets/icons/CheckIcon'
import Snackbar from 'react-native-snackbar'

const schema = yup.object().shape({
  background_id: yup.number(),
  daily_commitment: yup.number(),
  full_name: yup.string(),
  icon_id: yup.number(),
  native_language: yup.string(),
  proficiency: yup.string(),
  target_language: yup.string(),
  autoSubmitThreadhold: yup.number()
})

const ProfileScreen = () => {
  const { data: user } = useGetUsersQuery()
  const { mutate, isPending } = useUserPost()
  const { t } = useTranslation()
  const [autoRecord, autoSubmitThreadhold, themeColor, notation, setThemeColor, setUserState] =
    useSettingStore(state => [
      state.autoRecord,
      state.autoSubmitThreadhold,
      state.themeColor,
      state.notation,
      state.setThemeColor,
      state.setUserState
    ])
  const { control, handleSubmit, setValue, watch } = useForm<Partial<User>>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...user?.user,
      daily_commitment: user?.user?.daily_commitment,
      proficiency: user?.user_metrics?.proficiency,
      autoSubmitThreadhold: autoSubmitThreadhold
    }
  })
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const [notationState, setNotationState] = useState<NotationType>({
    lang: user?.user?.target_language,
    notation: notation
  })

  const [autoRecordEnabled, setAutoRecordEnabled] = useState(autoRecord)

  const latestIconId = watch('icon_id')
  const backgroundId = watch('background_id')
  const selectedLanguage = watch('target_language')
  const onSubmit = async data => {
    try {
      setUserState({
        language: notationState.lang,
        notation: notationState.notation,
        autoRecord: autoRecordEnabled,
        autoSubmitThreadhold: data?.autoSubmitThreadhold ?? 0
      })
      await mutate(data)
      Snackbar.show({ text: MESSAGES.USER_UPDATE_SUCCESS })
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <View>
      <ScrollView automaticallyAdjustContentInsets={false} className="mb-30">
        <View className="mx-2 mt-2 mb-16 ">
          <MSection>
            <View className="flex flex-row justify-between align-middle items-center ">
              <View>
                <MText className="text-lg font-semibold ">
                  {t('settings.personal-info.title')}
                </MText>
                <MLabelTextDescription className="text-sm  ">
                  {t('settings.personal-info.description')}
                </MLabelTextDescription>
              </View>
              <MButton
                loading={isPending}
                buttonText={t('save')}
                className="m-3 p-3 text-center"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </MSection>
          <MHairLine />
          <MSection className="flex gap-1 ">
            <MLabelText>{t('settings.personal-info.name')}</MLabelText>
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
            <MLabelText>{t('settings.personal-info.email')}</MLabelText>
            <MText className="border border-textbordercolor bg-textmutedcolor rounded-lg  text-sm p-2">
              {user?.user?.email}
            </MText>
          </MSection>

          <MHairLine />
          {/* profilePic */}
          <MSection className="mt-2">
            <MLabelText className="text-sm">
              {t('settings.personal-info.profile-picture')}
            </MLabelText>
            <MLabelTextDescription className="text-sm ">
              {t('settings.personal-info.profile-picture.description')}
            </MLabelTextDescription>

            <View
              className={clsx(
                'mt-2 w-[50] h-[50] rounded-full flex  justify-center align-middle items-center',
                avatarBackgroundColors[backgroundId]?.bgColor
              )}>
              <Image resizeMode="cover" source={avatarImages[latestIconId]} />
            </View>
          </MSection>
          {/* avatar */}
          <MSection>
            <View className="flex flex-col py-2 ">
              <MLabelText className="text-sm font-semibold">
                {t('settings.choose-avatar')}
              </MLabelText>
              <Image source={{ uri: avatarImages[user?.user?.icon_id] }} className="py-1" />
              <ScrollView horizontal>
                <View className="flex flex-row gap-2 mb-4  slim-scrollbar">
                  {avatarImages.map((avatar, index) => (
                    <Pressable
                      className="w-[50] h-[50] min-w-[50] min-h-[50]"
                      key={index}
                      onPress={() => {
                        setValue('icon_id', index)
                      }}>
                      <Image resizeMode="cover" source={avatar} />
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* background color */}
            <MLabelText className="text-sm font-semibold ">
              {t('settings.choose-background-color')}
            </MLabelText>
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
                <MLabelText className="text-sm font-semibold  ">Dark Mode</MLabelText>
              </View>
              <View>
                <Switch
                  value={colorScheme === 'dark'}
                  onChange={() => {
                    toggleColorScheme()
                  }}></Switch>
              </View>
            </View>
          </MSection>
          {/* languageSettings */}
          <View className="mb-2 mt-2">
            <MText className="text-lg font-semibold ">{t('settings.language')}</MText>
            <MLabelTextDescription className="text-sm ">
              {t('settings.language.description')}
            </MLabelTextDescription>
          </View>

          <MHairLine />
          {/* auto submit */}
          <MSection>
            <View>
              <MLabelText className="text-sm font-semibold ">
                {t('settings.auto-submit')}
              </MLabelText>
            </View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    minimumValue={0}
                    maximumValue={10}
                    value={value}
                    onValueChange={onChange}
                    tapToSeek
                    StepMarker={({ stepMarked }) => {
                      //TODO
                      return <Text>0</Text>
                    }}
                    step={1}
                    style={{ width: 300, height: 40 }}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                  />
                )}
                name="autoSubmitThreadhold"
              />
            </View>
            <MLabelTextDescription className="">
              {t('settings.auto-submit.description', { seconds: 0 })}
            </MLabelTextDescription>
          </MSection>
          {/* auto recording */}
          <MSection>
            <View className="">
              <MLabelText className="text-sm font-semibold ">
                {t('settings.auto-record')}
              </MLabelText>
            </View>
            <View className="">
              <Switch
                value={autoRecordEnabled}
                onValueChange={value => {
                  setAutoRecordEnabled(value)
                }}></Switch>
              <MLabelTextDescription className="text-sm ">
                {t('settings.auto-record.description')}
              </MLabelTextDescription>
            </View>
          </MSection>
          {/* display notation */}
          {isLangJapaneseOrChinese(selectedLanguage) && (
            <>
              <MHairLine />
              <MSection className="mt-2">
                <SelectSubLanguage
                  notationInfo={notationState}
                  setNotation={setNotationState}
                  targetLanguage={selectedLanguage}
                />
              </MSection>
            </>
          )}
          <MHairLine />

          <MSection className="gap-1">
            <MLabelText>{t('settings.proficiencylevel')}</MLabelText>
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
          <MSection className="gap-1">
            <MLabelText>{t('settings.daily-commit')}</MLabelText>
            <View className=" ">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDropdown value={+value} items={dailyCommitOptions} onValueChange={onChange} />
                )}
                name="daily_commitment"
              />
              <MLabelTextDescription className="mt-2">
                {t('settings.daily-commit.description')}
              </MLabelTextDescription>
            </View>
          </MSection>
          <MHairLine />
          {/* native language */}
          <MSection className="gap-1">
            <MLabelText>{t('settings.native-language')}</MLabelText>
            <View className="">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MDropdown value={value} items={nativeLanguageOptions} onValueChange={onChange} />
                )}
                name="native_language"
              />
              <MLabelTextDescription>
                {t('settings.native-language.description')}
              </MLabelTextDescription>
            </View>
          </MSection>
          <MHairLine />
          {/* target language */}
          <MSection>
            <MLabelText>{t('settings.target-language')}</MLabelText>
            <ScrollView horizontal className="p-2">
              <View className="flex flex-row gap-1">
                {targetLanguages.map((option, index) => (
                  <Controller
                    key={index}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TouchableOpacity
                        value={value}
                        key={index}
                        onPress={() => {
                          onChange(option.value)
                        }}
                        className={clsx('mx-2 px-2  flex justify-center ', {
                          'border border-blue-400 rounded-lg': value === option.value
                        })}>
                        <View className="text-sm  text-textprimary font-semibold text-center mt-2">
                          <View>{option.flag}</View>
                          <MText className="text-sm mt-2">{option.label}</MText>
                          <MText className="text-sm text-center">{option.shortText}</MText>
                        </View>
                      </TouchableOpacity>
                    )}
                    name="target_language"
                  />
                ))}
              </View>
            </ScrollView>
          </MSection>
          <MHairLine />
          <MSection>
            <MLabelText> {t('settings.theme')}</MLabelText>
            <View className="flex gap-2  flex-row">
              {themeColors.map((color, index) => (
                <Pressable
                  style={{ backgroundColor: color.bgColor }}
                  className={clsx(
                    ' text-center w-12 h-12 flex-row  rounded-lg flex justify-center items-center'
                  )}
                  key={index}
                  onPress={() => {
                    setThemeColor(color.color)
                  }}>
                  {color.color === themeColor && <Tick />}
                </Pressable>
              ))}
            </View>
          </MSection>
          <MSection>
            <View className="flex flex-row justify-between ">
              <Logout />
              <MButton
                buttonText={t('save')}
                className="m-3 p-3 text-center"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </MSection>
          <MSection>
            <View className="flex gap-2 justify-center align-middle text-center">
              <View className="flex flex-row">
                <MText> We care about your data in our</MText>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://milaai.app/help/privacy-policy')
                  }}>
                  <MText className="text-[#475467] underline ml-2">privacy policy.</MText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://milaai.app/help/terms-conditions')
                }}>
                <MText className="text-[#475467] underline ">Terms and Conditions</MText>
              </TouchableOpacity>
            </View>
          </MSection>
        </View>
      </ScrollView>
    </View>
  )
}
export default ProfileScreen

export const targetLanguages: ITargetLanguageOption[] = [
  {
    flag: <UK_O />,
    value: LanguageEnum.British,
    label: <Text>English </Text>,
    shortText: '(UK)'
  },
  {
    flag: <US_O />,
    value: LanguageEnum.American,
    label: <>English </>,
    shortText: '(US)'
  },
  {
    flag: <FR_O />,
    value: LanguageEnum.French,
    label: <>French</>
  },
  {
    flag: <MX_O />,
    value: LanguageEnum.Mexican,
    label: <>Spanish </>,
    shortText: '(MX)'
  },
  {
    flag: <ES_O />,
    value: LanguageEnum.Spanish,
    label: <>Spanish </>,
    shortText: '(ES)'
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
