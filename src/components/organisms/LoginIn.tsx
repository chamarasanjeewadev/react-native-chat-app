import { View } from 'react-native'
import LoginIn from '../../assets/icons/svgs/LoggingIn.svg'
import { MText } from '../atoms/MText'

export const LoginInComp = () => {
  return (
    <View className="items-center  gap-2">
      <LoginIn />
      <MText intent="primaryHeading" size="xl">
        Logging you in...
      </MText>
      <MText intent="normalText">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris diam, accumsan sit
        amet elit non, feugiat varius ex.
      </MText>
    </View>
  )
}
