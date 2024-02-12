import { PlaySlow } from './../assets/icons/PlaySlowIcon'
import { useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const { showSnackBar } = useSnackBar()
  const [isPlaying, setIsPlaying] = useState(false)

  type PlayAudioProps = {
    audioUrl: string
    rate?: number
  }
  const playAudio = async ({ audioUrl, rate = 1 }: PlayAudioProps) => {
    try {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        })
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })

        setSound(sound)
        console.log('Playing Sound')
        await sound.setRateAsync(rate, true)
        await sound.playAsync()
        setIsPlaying(true)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log('error occured', error)
      showSnackBar({ text: error })
    }
  }

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync()
      setIsPlaying(false)
    }
  }

  return {
    playAudio,
    stopAudio,
    isPlaying
  }
}

export default useAudioPlayer
