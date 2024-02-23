import { Modal, Text, View } from 'react-native'
import { SubscriptionAlert } from '../components/organisms/SubscriptionAlert'
import MModal from '../components/organisms/Modal'
import MButton from '../components/atoms/MButton'
import { useState } from 'react'

const HomeScreen = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <View className="flex-1">
        <Text>Home Screen</Text>
        <MButton onPress={() => setVisible(true)}>show</MButton>
        <MModal
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}>
          <SubscriptionAlert />
        </MModal>
      </View>
    </>
  )
}

export default HomeScreen
