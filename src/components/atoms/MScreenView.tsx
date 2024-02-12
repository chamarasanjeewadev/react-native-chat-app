import { VariantProps, cva } from 'class-variance-authority'
import { View } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { cn } from '../../utils/cnUtil'

interface MChatBoxProps extends ViewProps {
  loading?: boolean
}
const chatBoxVarients = {
  intent: {
    screen: 'mx-2 mb-16 ',
    chat: 'flex flex-1 justify-between '
  }
}

const screenStyles = cva(['mx-2 mt-2 '], {
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
    // <View className="mx-2 mb-16" {...props}>
    <View className={cn(screenStyles({ intent }), className)} {...props}>
      {children}
    </View>
  )
}
