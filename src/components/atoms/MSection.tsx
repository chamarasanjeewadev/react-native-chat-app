import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'

export const MSection = ({ children, ...props }: ViewProps) => {
  return (
    <View className="mb-2 mt-2 gap-2 pt-2" {...props}>
      {children}
    </View>
  )
}

export const MSubSection = ({ children, ...props }: ViewProps) => {
  return (
    <View className="mb-2 mt-2 pt-2 " {...props}>
      {children}
    </View>
  )
}
