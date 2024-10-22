import { ScrollView, View } from 'react-native'
import { useGetMaiChats } from '../hooks/queries'
import React, { Suspense } from 'react'
import { Dropdown } from '../assets/icons/DropDown'
import ProgressCircle from '../assets/icons/ProgressCircle'
import { ConversationProgress, StudyMode } from '../utils/enums'
import MButton from '../components/atoms/MButton'
import { MText } from '../components/atoms/MText'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChatStackParamList } from '../navigators/ChatNavigator'
import Button from '../components/atoms/MButtonDemo'

type Props = NativeStackScreenProps<ChatStackParamList, 'Chat'>
const ConversationsScreen = ({ navigation }: Props) => {
  const { data } = useGetMaiChats()
  return (
    <ScrollView>
      <View className=" gap-2">
        <Button intent="primary">Hello primary</Button>

        <Button intent="secondary" size="large">
          Hello secondary
        </Button>
      </View>
      {/* <Button intent="secondary">Hello world</Button> */}
      {/* <Suspense fallback={<View>Loading...</View>}>
        {data?.sections
          .sort((a, b) => b.title.localeCompare(a.title))
          ?.map((section: Section, index: number) => (
            <View
              key={index}
              className="m-1 flex flex-row justify-between rounded-lg bg-white px-8  shadow-lg">
              <View className={'mx-5 flex flex-grow flex-col gap-0.5 align-middle'}>
                <MText intent="description" size="large">
                  {section?.title}
                </MText>
                <View className={'flex-grow-1 mb-2 flex flex-row justify-between'}>
                  <MButton
                    className="m-0 bg-transparent p-0 px-0 py-0"
                    onPress={() => {
                      navigation.push('Section', {
                        section,
                        difficulty: StudyMode.CONVERSATION_EASY
                      })
                    }}>
                    <ProgressCircle
                      difficulty={StudyMode.CONVERSATION_EASY}
                      progress={ConversationProgress.STARTED}
                    />
                  </MButton>
                  <MButton
                    className="m-0 bg-transparent p-0 px-0 py-0"
                    onPress={() => {
                      navigation.push('Section', {
                        section,
                        difficulty: StudyMode.CONVERSATION_MEDIUM
                      })
                    }}>
                    <ProgressCircle
                      difficulty={StudyMode.CONVERSATION_MEDIUM}
                      progress={ConversationProgress.STARTED}
                    />
                  </MButton>
                  <MButton
                    className="m-0 bg-transparent p-0 px-0 py-0"
                    onPress={() => {
                      navigation.push('Section', {
                        section,
                        difficulty: StudyMode.CONVERSATION_HARD
                      })
                    }}>
                    <ProgressCircle
                      difficulty={StudyMode.CONVERSATION_HARD}
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
      </Suspense> */}
    </ScrollView>
  )
}
export default ConversationsScreen
