import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import { VariantProps, cva } from 'class-variance-authority'
import { MFontFamily } from '../../utils/fonts/fontFamily'

interface MButtonProps extends TouchableOpacityProps {
  loading?: boolean
  leadingIcon?: React.JSX.Element
  trailingIcon?: React.JSX.Element
}

const buttonVarients = {
  text: {
    defaultText: 'text-primary-foreground',
    destructiveText: 'text-destructive-foreground',
    outlineText: 'text-primary',
    ghostText: 'text-primary',
    linkText: 'text-[#475467] underline',
    settingsActiveText: 'color-card-foreground',
    settingsDeactiveText: 'color-card-foreground'
  },
  intent: {
    default: 'bg-primary hover:bg-primary/90',
    destructive: 'bg-destructive hover:bg-destructive/90',
    outline:
      'text-primary-foreground border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: ' underline text-primary    ',
    primary: ['bg-primary', 'text-white', 'border-transparent'],
    chat: '',
    buttonIcon: 'bg-chatbuttonbg color-chatbutton   shadow-sm border-0  ',
    settingsActive: 'bg-card color-card-foreground border-transparent',
    settingsDeActive: 'bg-muted color-card-foreground border-transparent'
  },
  size: {
    small: ['text-sm', 'py-2', 'px-4'],
    medium: ['text-base', 'py-2', 'px-4'],
    large: ['text-lg', 'py-2', 'px-4']
  }
}

const buttonStyles = cva(['font-semibold border rounded-lg'], {
  variants: buttonVarients,
  compoundVariants: [
    {
      intent: 'primary',
      size: 'small',
      className: ''
    },
    {
      intent: 'link',
      className: ' border-0 p-0 m-0 '
    },
    {
      intent: 'chat',
      className: ' border-0 p-0 m-0 '
    },
    {
      intent: 'buttonIcon',
      className: ' border-0 p-2 color-chatbutton'
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
  leadingIcon,
  trailingIcon,
  ...props
}: MButtonProps & VariantProps<typeof buttonStyles>) => {
  const textColor = buttonVarients['text'][text ?? 'defaultText']
  // const textSize = buttonVarients['size'][size ?? 'sm']?.[0]//TODO
  return (
    <TouchableOpacity
      className={cn(
        ' flex-row  items-center justify-center gap-1 ',
        buttonStyles({ intent, size }),
        className,
        {
          'opacity-65': loading
        }
      )}
      {...props}>
      {loading ? (
        <ActivityIndicator color={'white'} className="px-2 " size="small" />
      ) : intent === 'chat' ? (
        <>{children}</>
      ) : (
        <>
          {leadingIcon && leadingIcon}
          {children && (
            <Text style={{ fontFamily: MFontFamily.poppins400 }} className={cn(textColor)}>
              {children}
            </Text>
          )}
          {trailingIcon && trailingIcon}
        </>
      )}
    </TouchableOpacity>
  )
}

export default MButton
