import { VariantProps, cva } from 'class-variance-authority'
import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { cn } from '../../utils/cnUtil'

interface MChatBoxProps extends ViewProps {
  loading?: boolean
}
const chatBoxVarients = {
  intent: {
    screen: 'mb-16 ',
    chat: 'flex flex-1 justify-between p-0 '
  }
}

const screenStyles = cva(['bg-white m-0 p-2  dark:bg-black '], {
  variants: chatBoxVarients,
  compoundVariants: [],
  defaultVariants: {
    intent: 'screen'
  }
})
export const MScreenView = ({
  children,
  intent,
  className,
  ...props
}: MChatBoxProps & VariantProps<typeof screenStyles>) => {
  return (
    <View className={cn(screenStyles({ intent }), className)} {...props}>
      {children}
    </View>
  )
}
