import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export const MSection = ({ children, ...props }: ViewProps) => {
  return (
    <View className="mt-2 mb-2 pt-2 gap-2" {...props}>
      {children}
    </View>
  )
}
