import { View, ViewProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import LoadingDots from '../atoms/LoadingDots'
import { VariantProps, cva } from 'class-variance-authority'
import { MText } from '../atoms/MText'
interface MChatBoxProps extends ViewProps {
  loading: boolean
}
const chatBoxVarients = {
  intent: {
    user: 'bg-blue-100 rounded-tr-none ',
    mila: 'text-primary  bg-blue-400  rounded-tl-none'
  }
}

const chatBoxStyles = cva(['  flex  flex-row flex-wrap  p-2  rounded-xl'], {
  variants: chatBoxVarients,
  compoundVariants: [],
  defaultVariants: {
    intent: 'user'
  }
})
export const ChatBox = ({
  children,
  intent,
  className,
  ...props
}: MChatBoxProps & VariantProps<typeof chatBoxStyles>) => {
  return (
    <>
      <View className={cn(chatBoxStyles({ intent }), className)} {...props}>
        {children}
      </View>
    </>
  )
}
