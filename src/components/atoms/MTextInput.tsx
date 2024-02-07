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
      className=" text-sm outline-none  border border-textbordercolor  editable:bg-muted rounded-lg px-3 py-2 focus:border-textfocuscolor disabled:bg-muted "
      style={{ fontFamily: fontFamily.poppins400 }}
      {...props}
    />
  )
}
