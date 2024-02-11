import { View, ViewProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import LoadingDots from '../atoms/LoadingDots'
import { VariantProps, cva } from 'class-variance-authority'
interface MChatBoxProps extends ViewProps {
  loading: boolean
}
const chatBoxVarients = {
  intent: {
    user: 'bg-blue-100 rounded-tr-none ',
    mila: 'text-primary  bg-blue-400  rounded-tl-none'
  }
}

const chatBoxStyles = cva(['m-1  flex  flex-row flex-wrap  p-2  rounded-xl'], {
  variants: chatBoxVarients,
  compoundVariants: [],
  defaultVariants: {
    intent: 'user'
  }
})
export const ChatBox = ({
  children,
  loading,
  intent,
  className,
  ...props
}: MChatBoxProps & VariantProps<typeof chatBoxStyles>) => {
  return (
    <View className={cn(chatBoxStyles({ intent }), className)} {...props}>
      {/* {loading ? <LoadingDots dots={3} borderRadius={50} size={15} bounceHeight={2} /> : children} */}
      {children}
    </View>
  )
}
export const TranslateBox = ({ children, ...props }: ViewProps) => {
  return (
    <View
      className={cn(
        'rounded-bl-2xl  rounded-br-2xl  bg-slate-200 py-1 text-slate-800 dark:bg-slate-600 dark:text-white'
      )}
      {...props}>
      {children}
    </View>
  )
}
