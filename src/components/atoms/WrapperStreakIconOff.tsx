import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const StreakIconOff1 = () => {
  return (
    <View style={styles.wrapperStreakIconoff}>
      <Image
        style={styles.streakIconoff}
        resizeMode="cover"
        source={require('../assets/images/streak-icon.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  streakIconoff: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    left: 0,
    top: 1,
    transform: [
      {
        scale: 1.3
      }
    ]
  },
  wrapperStreakIconoff: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default StreakIconOff1
