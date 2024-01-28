import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const StreakIconOn1 = () => {
  return (
    <View style={styles.wrapperStreakIconon}>
      <Image
        style={styles.streakIconon}
        resizeMode="cover"
        source={require('../assets/images/streak-iconon.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  streakIconon: {
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
  wrapperStreakIconon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default StreakIconOn1
