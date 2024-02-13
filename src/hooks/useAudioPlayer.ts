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
    console.log('insid play audio', audioUrl)

    // audioUrl =
    //   'https://landingmilaaidev.blob.core.windows.net/aimessages/British_to.wav?se=2024-02-13T10%3A53%3A40Z&sp=r&sv=2022-11-02&sr=b&sig=RNwUJ5jislKWb46wbUTZOJzgMFzGz8EDetAfUgf6IZo%3D'
    // // audioUrl =
    //   'https://landingmilaaidev.blob.core.windows.net/aimessages/Japanese_です.wav?se=2024-02-13T10%3A50%3A49Z&sp=r&sv=2022-11-02&sr=b&sig=6JO2FdbdRD3hju8P0MQoCedT2FlOItisZwnU14a3Weg%3D'
    // const encodedUrl = encodeURIComponent(audioUrl)
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
