import React, { FC, PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { fontFamily } from '../../utils/fonts/fontFamily'

export const MText: FC<TextProps> = ({ ...props }: PropsWithChildren<TextProps>) => {
  return <Text {...props} style={{ fontFamily: fontFamily.poppins400 }}></Text>
}

export const MLabelText: FC<TextProps> = ({ ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      {...props}
      className="text-sm font-semibold color-textprimary "
      style={{ fontFamily: fontFamily.poppins400 }}></Text>
  )
}

export const MLabelTextDescription: FC<TextProps> = ({
  ...props
}: PropsWithChildren<TextProps>) => {
  return (
    <Text
      {...props}
      className="text-sm  color-textprimary"
      style={{ fontFamily: fontFamily.poppins400 }}></Text>
  )
}
