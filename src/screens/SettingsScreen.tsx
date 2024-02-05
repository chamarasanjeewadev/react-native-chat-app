import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Gear } from '../assets/icons/Gear'
import clsx from 'clsx'
import ProfileScreen from './ProfileScreen'
import { Membership } from '../components/molecules/Membership'
import { Pressable, Text, View } from 'react-native'

const SettingsScreen: FC = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(0)
  const tabs = [t('settings.tab.personal-info'), t('settings.tab.subscription')]

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <View className=" flex-1">
      <View className=" py-2 rounded-2xl  flex flex-row justify-center">
        {tabs.map((tab, index) => (
          <Pressable
            className={clsx(
              'text-sm font-semibold py-2 rounded-lg cursor-pointer',
              index === activeTab
                ? 'bg-blue-50 shadow-sm text-blue-700 dark:text-slate-50'
                : 'text-slate-500',
              index === 0 && activeTab !== 0 ? 'pl-0 pr-3' : 'px-3'
            )}
            key={index}
            onPress={() => onChangeTab(index)}>
            <Text>{tab}</Text>
          </Pressable>
        ))}
      </View>

      {activeTab === 0 && <ProfileScreen />}
      {activeTab === 1 && <Membership />}
    </View>
  )
}

export default SettingsScreen
