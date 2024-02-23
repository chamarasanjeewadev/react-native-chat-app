import { Modal, Text, View } from 'react-native'
import { SubscriptionAlert } from '../components/organisms/SubscriptionAlert'
import CustomModal from '../components/organisms/Modal'
import MButton from '../components/atoms/MButton'
import { useState } from 'react'

const HomeScreen = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <View className="flex-1">
        <Text>Home Screen</Text>
        <MButton onPress={() => setVisible(true)}>show</MButton>
        <CustomModal
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}>
          <SubscriptionAlert />
        </CustomModal>
      </View>
    </>
  )
}

export default HomeScreen
