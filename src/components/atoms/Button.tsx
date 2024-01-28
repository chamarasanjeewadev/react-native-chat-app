import { Pressable, Text } from 'react-native'

const MIButton = ({ onPress }: any) => {
  return (
    <Pressable onPress={onPress}>
      <Text>I'm pressable!</Text>
    </Pressable>
  )
}

export default MIButton
