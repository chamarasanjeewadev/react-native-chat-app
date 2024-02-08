import React, { FC, PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { MFontFamily } from '../../utils/fonts/fontFamily'

export const MText: FC<TextProps> = ({ ...props }: PropsWithChildren<TextProps>) => {
  return <Text {...props} style={{ fontFamily: MFontFamily.poppins400 }}></Text>
}

export const MLabelText: FC<TextProps> = ({ ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      className="text-sm font-semibold color-textprimary "
      {...props}
      style={{ fontFamily: MFontFamily.poppins400 }}></Text>
  )
}

export const MLabelTextDescription: FC<TextProps> = ({
  ...props
}: PropsWithChildren<TextProps>) => {
  return (
    <Text
      {...props}
      className="text-sm  color-textprimary"
      style={{ fontFamily: MFontFamily.poppins400 }}></Text>
  )
}
