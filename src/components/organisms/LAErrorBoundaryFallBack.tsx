import React from 'react'
import { Button, Pressable } from 'react-native'

export const MilaErrorBoundryFallBack = ({ resetErrorBoundary }) => {
  return (
    <div>
      There was an error!
      <Pressable onPress={() => resetErrorBoundary()}>Try again</Pressable>
    </div>
  )
}
