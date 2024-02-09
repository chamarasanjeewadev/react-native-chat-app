import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export const MScreenView = ({ children, ...props }: ViewProps) => {
  return (
    <View className="mx-2 mb-16" {...props}>
      {children}
    </View>
  )
}
