import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { cn } from '../../utils/cnUtil'
import { VariantProps, cva } from 'class-variance-authority'
import { MFontFamily } from '../../utils/fonts/fontFamily'

interface MButtonProps extends TouchableOpacityProps {
  loading?: boolean
  leadingIcon?: React.JSX.Element
  trailingIcon?: React.JSX.Element
}

const myVarients = {
  text: {
    defaultText: 'text-primary-foreground',
    destructiveText: 'text-destructive-foreground',
    outlineText: 'text-primary',
    ghostText: 'text-primary',
    linkText: 'text-[#475467] underline'
  },
  intent: {
    default: 'bg-primary hover:bg-primary/90',
    destructive: 'bg-destructive hover:bg-destructive/90',
    outline:
      'text-primary-foreground border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: ' underline text-primary    ',
    primary: ['bg-blue-500', 'text-white', 'border-transparent']
  },
  size: {
    small: ['text-sm', 'py-1', 'px-2', 'm-3', 'py-3'],
    medium: ['text-base', 'py-2', 'px-4']
  }
}

const buttonStyles = cva(['font-semibold', 'border', 'rounded-lg'], {
  variants: myVarients,
  compoundVariants: [
    {
      intent: 'primary',
      size: 'small',
      className: ''
    },
    {
      intent: 'link',
      className: ' border-0 p-0 m-0 '
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
  const textColor = myVarients['text'][text ?? 'defaultText']
  console.log(textColor)
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        'flex flex-row  items-center justify-center gap-1 ',
        buttonStyles({ intent, size }),
        className,
        {
          'opacity-65': loading
        }
      )}>
      {loading ? (
        <ActivityIndicator color={'white'} className="px-2 " size="small" />
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
