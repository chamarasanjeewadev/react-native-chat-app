import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = audioUrl => {
  const [sound, setSound] = useState(null)
  const { showSnackBar } = useSnackBar()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })
      setSound(sound)
    }

    loadAudio()

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [audioUrl])

  const playAudio = async () => {
    try {
      if (sound) {
        console.log('playing audio....', sound)
        await sound.playAsync()
        setIsPlaying(true)
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
