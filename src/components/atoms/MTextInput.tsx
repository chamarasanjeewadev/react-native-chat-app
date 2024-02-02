import React, { FC } from 'react'
import { TextInput, TextInputProps, TextInput as RNTextInput } from 'react-native'
import { fontFamily } from '../../utils/fonts/fontFamily'

interface MTextInputProps extends TextInputProps {
  forwardedRef?: React.Ref<RNTextInput>
}

export const MTextInput: FC<MTextInputProps> = ({ forwardedRef, ...props }: MTextInputProps) => {
  return <TextInput ref={forwardedRef} style={{ fontFamily: fontFamily.poppins400 }} {...props} />
}
