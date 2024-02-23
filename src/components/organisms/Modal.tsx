import React, { ReactNode } from 'react'
import { Modal, View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MButton from '../atoms/MButton'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const CustomModal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      style={{ backgroundColor: 'red' }}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View>
        <View className=" flex-row-reverse justify-start bg-white">
          <MButton intent="buttonIcon" onPress={onClose}>
            <Icon name="close" />
          </MButton>
        </View>
        {children}
      </View>
    </Modal>
  )
}

export default CustomModal
