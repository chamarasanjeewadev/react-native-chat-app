import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { useReducer } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

export const FadeIn = () => {
  const [dark, toggle] = useReducer(s => !s, false)

  const colorMode = dark ? 'dark' : 'light'
  return (
    <Pressable onPress={toggle} style={styles.container}>
      <MotiView
        transition={{
          type: 'timing'
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: dark ? '#696161' : '#ffffff' }}
      >
        <Skeleton colorMode={colorMode} radius="round" height={50} width={50} />
        <Spacer />
        <Skeleton colorMode={colorMode} width={250} />
        <Spacer height={8} />
        <Skeleton colorMode={colorMode} width={'100%'} />
        <Spacer height={8} />
        <Skeleton colorMode={colorMode} width={'100%'} />
      </MotiView>
    </Pressable>
  )
}
const Spacer = ({ height = 16 }) => <View style={{ height }} />

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  padded: {
    padding: 16
  }
})
