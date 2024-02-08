import { View, Text, TouchableOpacity } from 'react-native'
import { useGetMilaChats } from '../hooks/queries'
import React, { Suspense } from 'react'
import { Dropdown } from '../assets/icons/DropDown'
import { ConversationLogo } from '../assets/icons/ConversationLogo'
import ProgressCircle from '../assets/icons/ProgressCircle'
import { ConversationProgress, StudyMode } from '../utils/enums'
import { MFontFamily } from '../utils/fonts/fontFamily'
import { FadeIn } from '../components/molecules/Skeletons/FadeIn'

const ChatsScreen = ({ navigation }) => {
  const { data } = useGetMilaChats()
  return (
    <View>
      <Suspense fallback={<View>Loading...</View>}>
        {data?.sections?.map((section: Section, index: number) => (
          // <FadeIn key={index} />
          <View
            key={index}
            className="m-1 flex flex-row justify-between rounded-lg bg-white px-8 align-baseline shadow-lg">
            {/* <FadeIn /> */}

            <View className={'¥align-middle mx-5 flex flex-grow flex-col gap-0.5  '}>
              <Text
                className="text-lg font-normal  text-slate-700 dark:text-white"
                style={{ fontFamily: MFontFamily.poppins400 }}>
                {section?.title}
              </Text>
              <View className={'flex-grow-1 mb-2 flex flex-row justify-between '}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Section', { section })
                  }}>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_EASY}
                    progress={ConversationProgress.STARTED}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_MEDIUM}
                    progress={ConversationProgress.STARTED}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_HARD}
                    progress={ConversationProgress.STARTED}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="justify-center">
              <Dropdown />
            </View>
          </View>
        ))}
      </Suspense>
    </View>
  )
}
export default ChatsScreen
