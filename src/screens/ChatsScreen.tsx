import { View, Text, Pressable, ScrollView } from 'react-native'
import { useGetMilaChats } from '../hooks/queries'
import React, { Suspense } from 'react'
import { AskFrom } from '../components/organisms/AskFrom'
import HouseIcon from '../assets/icons/HouseIcon'
import { Dropdown } from '../assets/icons/DropDown'

const ChatsScreen = ({ navigation }) => {
  const { data, isPending } = useGetMilaChats()

  return (
    <ScrollView>
      <Suspense fallback={<div>Loading...</div>}>
        {data?.sections?.map((section: Section, index: number) => (
          <Pressable
            onPress={() => {
              navigation.push('Section', { section })
            }}
          >
            <View className="flex align-middle justify-center flex-row border-red-200 py-3 w-full shadow-sm rounded-lg p-5 cursor-pointer bg-gray-200">
              <View>
                <HouseIcon />
              </View>
              <View className={'flex flex-col gap-0.5 justify-center align-middle  '}>
                <Text className="text-center font-semibold text-slate-700 dark:text-white">
                  {section?.title}
                </Text>
                <View className={'flex flex-row gap-4'}>
                  <HouseIcon />
                  <HouseIcon />
                  <HouseIcon />
                </View>
              </View>
              <View className={'flex justify-center'}>
                <Dropdown />
              </View>
            </View>
          </Pressable>
        ))}
      </Suspense>
    </ScrollView>
  )
}

export default ChatsScreen
