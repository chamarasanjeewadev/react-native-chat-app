import React, { FC, PropsWithChildren } from 'react'
import { Text, TextProps } from 'react-native'
import { fontFamily } from '../../utils/fonts/fontFamily'

export const MText: FC<TextProps> = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text style={{ fontFamily: fontFamily.poppins400 }} {...props}>
      {children}
    </Text>
  )
}
