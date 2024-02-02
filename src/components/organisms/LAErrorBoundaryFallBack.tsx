import React from 'react'
import { Button, Pressable, View } from 'react-native'

export const MilaErrorBoundryFallBack = ({ resetErrorBoundary }) => {
  return (
    <View>
      There was an error!
      <Pressable onPress={() => resetErrorBoundary()}>Try again</Pressable>
    </View>
  )
}
