import React, { PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { MFontFamily } from '../../utils/fonts/fontFamily'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../utils/cnUtil'

const textStyles = cva(['text-sm', 'font-semibold'], {
  variants: {
    intent: {
      primaryHeading: 'font-semibold',
      label: 'text-muted-foreground ',
      description: 'text-slate-500',
      disabledInput: 'bg-muted border font-normal  border-muted rounded-md p-2'
    },
    size: {
      small: ['text-sm'],
      medium: ['text-base'],
      large: ['text-lg']
    }
  },
  compoundVariants: [
    {
      intent: 'label',
      size: 'small',
      className: 'text-slate-700'
    },
    {
      intent: 'label',
      size: 'large',
      className: 'text-black'
    }
  ],
  defaultVariants: {
    intent: 'label',
    size: 'small'
  }
})

export const MText = ({
  children,
  className,
  intent,
  size,
  ...props
}: PropsWithChildren<TextProps> & VariantProps<typeof textStyles>) => {
  return (
    <Text
      {...props}
      className={cn(textStyles({ intent, size }), className)}
      style={{ fontFamily: MFontFamily.poppins400 }}>
      {children}
    </Text>
  )
}
