import { useCallback, useEffect, useRef } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'

const useAudioPlayer = () => {
  const { showSnackBar } = useSnackBar()
  const soundRef = useRef(new Audio.Sound())

  // soundRef.current.setOnPlaybackStatusUpdate(status => {
  //   if (status.) {
  //     console.log('Sound has finished playing')
  //   }
  // })

  const syncAudio = useCallback(async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true
    })
  }, [])

  useEffect(() => {
    syncAudio()
    return () => {
      soundRef.current.unloadAsync()
    }
  }, [])

  const playAudioBySound = async (sound: Audio.Sound) => {
    await stopAudio()
    soundRef.current = sound
    await sound.replayAsync()
  }
  const playAudio = async ({ audioUrl, rate = 1 }: PlayAudioProps) => {
    await stopAudio()

    // audioUrl =
    //   'https://landingMaiaidev.blob.core.windows.net/aimessages/user_10_1707894556.wav?se=2024-02-14T09%3A14%3A28Z&sp=r&sv=2022-11-02&sr=b&sig=U5x4kP5BguwlFBHWSVEDlIchrkkJ7R%2BfEo9G4WRltDc%3D'
    // audioUrl ="https://landingMaiaidev.blob.core.windows.net/aimessages/Mandarin_太好了.wav?se=2024-02-14T09%3A16%3A42Z&sp=r&sv=2022-11-02&sr=b&sig=YD8qdiao0lq/876giNHG2FNXHWgMQVfSIY9hlERi3aw%3D"
    console.log('insid play audio', audioUrl)

    // const encodedUrl = encodeURIComponent(audioUrl)

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl })
      await sound.setRateAsync(rate, true)
      soundRef.current = sound
      await soundRef.current.playAsync()
    } catch (error) {
      console.log(error)
      showSnackBar({ text: error })
    }
  }

  const stopAudio = async () => {
    try {
      console.log('stop audio.....', soundRef.current)
      await soundRef.current.stopAsync()
      // await soundRef.current.unloadAsync()
    } catch (error) {
      console.log('sound...', error)
    }
  }

  return {
    playAudio,
    stopAudio,
    playAudioBySound
  }
}

export default useAudioPlayer
