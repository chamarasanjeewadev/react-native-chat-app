import { ScrollView, View } from 'react-native'
import { useGetMilaChats } from '../hooks/queries'
import React, { Suspense } from 'react'
import { Dropdown } from '../assets/icons/DropDown'
import ProgressCircle from '../assets/icons/ProgressCircle'
import { ConversationProgress, StudyMode } from '../utils/enums'
import MButton from '../components/atoms/MButton'
import { MText } from '../components/atoms/MText'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChatStackParamList } from '../navigators/ChatNavigator'

import Logo from './../assets/icons/logo.svg'

type Props = NativeStackScreenProps<ChatStackParamList, 'Chat'>
const ConversationsScreen = ({ navigation }: Props) => {
  const { data } = useGetMilaChats()
  return (
    <ScrollView>
      <Suspense fallback={<View>Loading...</View>}>
        {data?.sections?.map((section: Section, index: number) => (
          <View
            key={index}
            className="m-1 flex flex-row justify-between rounded-lg bg-white px-8 align-baseline shadow-lg">
            <View className={'mx-5 flex flex-grow flex-col gap-0.5 align-middle  '}>
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
                  <Logo width={120} height={40} />
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
    </ScrollView>
  )
}
export default ConversationsScreen
