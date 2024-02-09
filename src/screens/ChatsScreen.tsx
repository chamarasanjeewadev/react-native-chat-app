import { View } from 'react-native'
import { useGetMilaChats } from '../hooks/queries'
import React, { Suspense } from 'react'
import { Dropdown } from '../assets/icons/DropDown'
import ProgressCircle from '../assets/icons/ProgressCircle'
import { ConversationProgress, StudyMode } from '../utils/enums'
import MButton from '../components/atoms/MButton'
import { MText } from '../components/atoms/MText'

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
              <MText intent="description" size="large">
                {section?.title}
              </MText>
              <View className={'flex-grow-1 mb-2 flex flex-row justify-between '}>
                <MButton
                  className="m-0 bg-transparent p-0 px-0 py-0"
                  onPress={() => {
                    navigation.push('Section', { section })
                  }}>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_EASY}
                    progress={ConversationProgress.STARTED}
                  />
                </MButton>
                <MButton
                  className="m-0 bg-transparent p-0 px-0 py-0"
                  onPress={() => {
                    navigation.push('Section', { section })
                  }}>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_MEDIUM}
                    progress={ConversationProgress.STARTED}
                  />
                </MButton>
                <MButton
                  className="m-0 bg-transparent p-0 px-0 py-0"
                  onPress={() => {
                    navigation.push('Section', { section })
                  }}>
                  <ProgressCircle
                    difficulty={StudyMode.CONVERSATION_EASY}
                    progress={ConversationProgress.STARTED}
                  />
                </MButton>
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
