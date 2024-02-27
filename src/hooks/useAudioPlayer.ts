import { PlaySlow } from './../assets/icons/PlaySlowIcon'
import { useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = () => {
  const [sound, setSound] = useState(null)
  const { showSnackBar } = useSnackBar()
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudioBySound = async (sound: Audio.Sound) => {
    // if (isPlaying) {
    await stopAudio()
    // }
    setIsPlaying(true)
    await sound.replayAsync()
    setIsPlaying(false)
  }
  const playAudio = async ({ audioUrl, rate = 1 }: PlayAudioProps) => {
    // if (isPlaying) {
    await stopAudio()
    // }

    // audioUrl =
    //   'https://landingmilaaidev.blob.core.windows.net/aimessages/user_10_1707894556.wav?se=2024-02-14T09%3A14%3A28Z&sp=r&sv=2022-11-02&sr=b&sig=U5x4kP5BguwlFBHWSVEDlIchrkkJ7R%2BfEo9G4WRltDc%3D'
    // audioUrl ="https://landingmilaaidev.blob.core.windows.net/aimessages/Mandarin_太好了.wav?se=2024-02-14T09%3A16%3A42Z&sp=r&sv=2022-11-02&sr=b&sig=YD8qdiao0lq/876giNHG2FNXHWgMQVfSIY9hlERi3aw%3D"
    console.log('insid play audio', audioUrl)

    // const encodedUrl = encodeURIComponent(audioUrl)
    try {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true
        })
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })

        setSound(sound)
        await sound.setRateAsync(rate, true)
        setIsPlaying(true)
        await sound.playAsync()
        setIsPlaying(false)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log('error occured', error)
      showSnackBar({ text: error })
    }
  }

  const stopAudio = async () => {
    console.log('stop audio.....')
    // if (sound) {
    await sound.stopAsync()
    setIsPlaying(false)
    // }
  }

  return {
    playAudio,
    stopAudio,
    isPlaying,
    playAudioBySound
  }
}

export default useAudioPlayer
