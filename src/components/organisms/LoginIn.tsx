import { View } from 'react-native'
import LoginIn from '../../assets/icons/svgs/LoggingIn.svg'
import { MText } from '../atoms/MText'

export const LoginInComp = () => {
  return (
    <View className="  items-center justify-center">
      <LoginIn />
      <MText intent="primaryHeading" size="large">
        Logging you in...
      </MText>
      <MText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris diam, accumsan sit
        amet elit non, feugiat varius ex.
      </MText>
    </View>
  )
}
