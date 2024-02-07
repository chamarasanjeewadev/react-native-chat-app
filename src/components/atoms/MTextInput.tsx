import React, { FC } from 'react'
import { TextInput, TextInputProps, TextInput as RNTextInput } from 'react-native'
import { fontFamily } from '../../utils/fonts/fontFamily'

interface MTextInputProps extends TextInputProps {
  forwardedRef?: React.Ref<RNTextInput>
}

export const MTextInput = ({ forwardedRef, ...props }: MTextInputProps) => {
  return (
    <TextInput
      ref={forwardedRef}
      className=" editable:bg-muted rounded-lg  border border-textbordercolor  px-3 py-2 text-sm outline-none focus:border-textfocuscolor disabled:bg-muted "
      style={{ fontFamily: fontFamily.poppins400 }}
      {...props}
    />
  )
}
