import { Pressable, PressableProps, Text } from 'react-native'
import React, { FC, PropsWithChildren } from 'react'
import { t } from 'i18next'
import { fontFamily } from '../../utils/fonts/fontFamily'
import { MText } from './MText'

interface MButtonProps extends PressableProps {
  buttonText: string
}

export const MButton = ({
  // children,
  buttonText,
  ...props
}: MButtonProps) => {
  return (
    <Pressable
      {...props}
      className="rounded-lg justify-center align-middle text-center text-orange-900 p-2 shadow-sm play-button dark:bg-slate-800 dark:active:bg-slate-400 dark:text-white bg-orange-50 active:bg-orange-200 border-orange-100 ">
      <MText className="text-center ">{buttonText}</MText>
    </Pressable>
  )
}

export default MButton
