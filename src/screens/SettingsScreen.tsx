import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProfileScreen from './ProfileScreen'
import { Membership } from '../components/molecules/Membership'
import { View, ScrollView } from 'react-native'
import MButton from '../components/atoms/MButton'
import { MScreenView } from '../components/atoms/MScreenView'

const SettingsScreen: FC = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(0)
  const tabs = [t('settings.tab.personal-info'), t('settings.tab.subscription')]

  const onChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <View className="mb-2 bg-white">
      <View className=" flex flex-row  justify-center  ">
        {tabs.map((tab, index) => (
          <MButton
            intent={activeTab === index ? 'primary' : 'secondary'}
            key={index}
            onPress={() => onChangeTab(index)}>
            {tab}
          </MButton>
        ))}
      </View>
      <ScrollView automaticallyAdjustContentInsets={false} className="mb-30">
        <MScreenView>
          {activeTab === 0 && <ProfileScreen />}
          {activeTab === 1 && <Membership />}
        </MScreenView>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
