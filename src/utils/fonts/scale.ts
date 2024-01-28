import { Dimensions } from 'react-native'

export const DEVICE_HEIGHT = Dimensions.get('window').height
export const DEVICE_WIDTH = Dimensions.get('window').width
export const PIXEL = (value: number): number => {
  // const newValue = value * 0.2 + 0.6;

  const newValue = value * 0.2 + DEVICE_WIDTH * 0.001
  if (DEVICE_WIDTH >= 1000) {
    return DEVICE_WIDTH * (newValue / 175)
  }
  if (DEVICE_WIDTH >= 800) {
    return DEVICE_WIDTH * (newValue / 150)
  }
  if (DEVICE_WIDTH >= 600) {
    return DEVICE_WIDTH * (newValue / 125)
  }
  return DEVICE_WIDTH * (newValue / 100)
}

export const font = (value: number): number => PIXEL(value)
