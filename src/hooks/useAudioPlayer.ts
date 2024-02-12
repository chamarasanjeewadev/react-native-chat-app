import { useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const { showSnackBar } = useSnackBar()
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = async (audioUrl: string) => {
    try {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        })
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl }, { shouldPlay: true })
        setSound(sound)
        console.log('Playing Sound')
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
