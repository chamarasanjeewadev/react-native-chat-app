import { Pressable, PressableProps } from 'react-native'
import React, { FC, PropsWithChildren } from 'react'

export const MChatButton: FC<PressableProps> = ({
  children,
  ...props
}: PropsWithChildren<PressableProps>) => {
  return (
    <Pressable
      {...props}
      className="rounded-lg text-center text-orange-900 p-2 shadow-sm play-button dark:bg-slate-800 dark:active:bg-slate-400 dark:text-white bg-orange-50 active:bg-orange-200 border-orange-100 ">
      {children}
    </Pressable>
  )
}

export default MChatButton
