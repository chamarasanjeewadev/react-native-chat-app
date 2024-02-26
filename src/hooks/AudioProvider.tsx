import { createContext, useMemo, useContext } from 'react'
import useAudioPlayer from './useAudioPlayer'
import useAudioRecorder from './useAudioRecorder'
import { Sound } from 'expo-av/build/Audio'

interface ToastContextProps {
  children: React.ReactNode
}
export type Audio = {
  playAudio: ({ audioUrl, rate }: PlayAudioProps) => Promise<void>
  stopAudio: () => void
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
  isRecording: boolean
  isPlaying: boolean
  recordings: AudioType[]
  playAudioBySound: (sound: Sound) => Promise<void>
}
export const AudioContext = createContext<Audio>(null)

const AudioProvider: React.FC<ToastContextProps> = ({ children }) => {
  const { playAudio, stopAudio, isPlaying, playAudioBySound } = useAudioPlayer()
  const {
    startRecording: startRecordingAudio,
    stopRecording,
    isRecording,
    recordings
  } = useAudioRecorder()
  const startRecording = async () => {
    try {
      if (isPlaying) {
        stopAudio()
      }
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
        isRecording,
        isPlaying,
        recordings,
        playAudioBySound
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
