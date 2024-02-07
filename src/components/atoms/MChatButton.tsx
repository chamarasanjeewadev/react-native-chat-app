import { ActivityIndicator, Pressable, PressableProps } from 'react-native'
import React, { PropsWithChildren } from 'react'
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
        'play-button flex flex-row gap-2  rounded-lg   bg-primary p-2 text-center ',
        className,
        { 'bg-gray-50': loading }
      )}
    >
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {children}
    </Pressable>
  )
}

export default MChatButton
