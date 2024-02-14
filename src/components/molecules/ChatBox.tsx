import { View, ViewProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import { VariantProps, cva } from 'class-variance-authority'
interface MChatBoxProps extends ViewProps {
  loading?: boolean
}

const chatBoxStyles = cva(['w-[90%]  p-2 pb-3  gap-1   rounded-xl'], {
  variants: {
    intent: {
      user: 'bg-userchatbg w-[90%] rounded-tr-none flex-reverse self-end',
      mila: 'bg-botchatbg  text-primary  rounded-tl-none'
    }
  },
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
