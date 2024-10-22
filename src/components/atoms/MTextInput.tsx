import React from 'react'
import { TextInput, TextInputProps, TextInput as RNTextInput } from 'react-native'
import { MFontFamily } from '../../utils/fonts/fontFamily'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../utils/cnUtil'

interface MTextInputProps extends TextInputProps {
  forwardedRef?: React.Ref<RNTextInput>
}

const textStyles = cva(
  [
    'text-sm',
    'editable:bg-muted items-center border border-muted rounded-lg p-2 focus:border-slate-500 disabled:bg-muted flex-1'
  ],

  {
    variants: {
      intent: {
        normal: 'text-muted-foreground '
      },
      size: {
        small: ['text-sm'],
        medium: ['text-base'],
        large: ['text-lg']
      }
    },
    defaultVariants: {
      intent: 'normal',
      size: 'small'
    }
  }
)

export const MTextInput = ({
  forwardedRef,
  intent,
  size,
  className,
  ...props
}: MTextInputProps & VariantProps<typeof textStyles>) => {
  return (
    <TextInput
      // multiline
      ref={forwardedRef}
      style={{ fontFamily: MFontFamily.poppins400 }}
      {...props}
      className={cn(textStyles({ intent, size }), className)}
    />
  )
}
