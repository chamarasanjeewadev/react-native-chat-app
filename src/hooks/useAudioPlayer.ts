import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = audioFile => {
  const [sound, setSound] = useState(null)
  const { showSnackBar } = useSnackBar()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioFile })
      setSound(sound)
    }

    loadAudio()

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [audioFile])

  const playAudio = async () => {
    try {
      if (sound) {
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
