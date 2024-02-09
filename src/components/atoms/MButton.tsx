import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import { VariantProps, cva } from 'class-variance-authority'

interface MButtonProps extends TouchableOpacityProps {
  buttonText: string
  loading?: boolean
}

const myVarients = {
  text: {
    defaultText: 'text-textsecondary',
    destructiveText: 'text-destructive-foreground',
    outlineText: 'text-[#6e9b0f44]',
    ghostText: 'text-primary',
    linkText: 'text-primary'
  },
  intent: {
    default: 'bg-primary hover:bg-primary/90',
    destructive: 'bg-destructive hover:bg-destructive/90',
    outline:
      'text-primary-foreground border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary',
    primary: ['bg-blue-500', 'text-white', 'border-transparent']
  },
  size: {
    small: ['text-sm', 'py-1', 'px-2'],
    medium: ['text-base', 'py-2', 'px-4']
  }
}

const buttonStyles = cva(['font-semibold', 'border', 'rounded'], {
  variants: myVarients,
  compoundVariants: [
    {
      intent: 'primary',
      size: 'small',
      className: 'bg-textprimary'
    }
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'small'
  }
})

export const MButton = ({
  children,
  intent,
  text,
  size,
  loading,
  className,
  ...props
}: MButtonProps & VariantProps<typeof buttonStyles>) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        buttonStyles({ intent, size }),
        'play-button flex  flex-row justify-center gap-1 rounded-lg   align-middle shadow-sm ',
        className,
        { 'opacity-65': loading }
      )}>
      {loading ? (
        <ActivityIndicator color={'white'} className="px-2  text-primary" size="small" />
      ) : (
        <Text className={cn(myVarients['text'][text])}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

export default MButton
