import { createContext, useMemo, useContext } from 'react'
import useAudioPlayer from './useAudioPlayer'
import useAudioRecorder from './useAudioRecorder'
import { Sound } from 'expo-av/build/Audio'

interface AudioContextProps {
  children: React.ReactNode
}
export type Audio = {
  playAudio: ({ audioUrl, rate }: PlayAudioProps) => Promise<void>
  stopAudio: () => Promise<void>
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
  recodedAudio: AudioType
  recordedAudioRef: AudioType
  playAudioBySound: (sound: Sound) => Promise<void>
  getRecorded: () => AudioType
}
export const AudioContext = createContext<Audio>(null)

const AudioProvider = ({ children }: AudioContextProps) => {
  const { playAudio, stopAudio, playAudioBySound } = useAudioPlayer()
  const {
    startRecording: startRecordingAudio,
    stopRecording,
    recodedAudio,
    recordedAudioRef,
    getRecorded
  } = useAudioRecorder()
  const startRecording = async () => {
    try {
      await stopAudio()
      await startRecordingAudio()
    } catch (error) {
      console.log('error occured', error)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        playAudio,
        stopAudio,
        startRecording,
        stopRecording,
        recodedAudio,
        recordedAudioRef,
        playAudioBySound,
        getRecorded
      }}>
      {children}
    </AudioContext.Provider>
  )
}

function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within a AudioProvider')
  }

  // Memoize the context value to avoid unnecessary recalculations
  const memoizedContext = useMemo(() => context, [context])

  return memoizedContext
}

export { AudioProvider, useAudio }
