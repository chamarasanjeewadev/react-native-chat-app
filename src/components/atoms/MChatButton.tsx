import { ActivityIndicator, Pressable, PressableProps } from 'react-native'
import React, { FC, PropsWithChildren } from 'react'
import { cn } from '../../utils/cnUtil'

type MChatProps = PressableProps & { loading?: boolean }

export const MChatButton = ({
  children,
  loading,
  className,
  ...props
}: PropsWithChildren<MChatProps>) => {
  return (
    <Pressable
      {...props}
      className={cn(
        'rounded-lg text-center p-2 gap-2  play-button   flex flex-row bg-primary ',
        className,
        { 'bg-gray-50': loading }
      )}>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {children}
    </Pressable>
  )
}

export default MChatButton
