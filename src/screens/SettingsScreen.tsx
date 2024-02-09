import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import ProfileScreen from './ProfileScreen'
import { Membership } from '../components/molecules/Membership'
import { View } from 'react-native'
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
    <MScreenView className="  ">
      <View className=" flex flex-row  justify-center  ">
        {tabs.map((tab, index) => (
          <MButton
            className={clsx(index === activeTab ? 'shadow-sm ' : 'bg-muted')}
            key={index}
            // text={!activeTab ? 'outlineText' : 'defaultText'}
            onPress={() => onChangeTab(index)}>
            {tab}
          </MButton>
        ))}
      </View>

      {activeTab === 0 && <ProfileScreen />}
      {activeTab === 1 && <Membership />}
    </MScreenView>
  )
}

export default SettingsScreen
