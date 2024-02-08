import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import ProfileScreen from './ProfileScreen'
import { Membership } from '../components/molecules/Membership'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { MLabelText } from '../components/atoms/MText'

const SettingsScreen: FC = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(1)
  const tabs = [t('settings.tab.personal-info'), t('settings.tab.subscription')]

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <View className=" flex-1 bg-white dark:bg-black">
      <View className=" flex flex-row  justify-center rounded-2xl py-2">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            className={clsx(
              'cursor-pointer rounded-lg px-2  py-2 text-sm font-semibold',
              index === activeTab
                ? 'bg-blue-50 text-blue-700 shadow-sm dark:text-slate-50'
                : 'text-slate-500',
              index === 0 && activeTab !== 0 ? 'pl-0 pr-3' : 'px-3'
            )}
            key={index}
            onPress={() => onChangeTab(index)}>
            <MLabelText>{tab}</MLabelText>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 0 && <ProfileScreen />}
      {activeTab === 1 && <Membership />}
    </View>
  )
}

export default SettingsScreen
