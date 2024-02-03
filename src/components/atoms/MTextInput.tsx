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
      className=" text-sm outline-none  border border-[#CBD5E1] rounded-lg px-3 py-2 focus:border-gray-300  disabled:bg-slate-200  dark:bg-transparent dark:border-slate-300 dark:text-white"
      style={{ fontFamily: fontFamily.poppins400 }}
      {...props}
    />
  )
}
