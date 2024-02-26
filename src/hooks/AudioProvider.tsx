import { createContext, useMemo, useContext } from 'react'
import useAudioPlayer from './useAudioPlayer'
import useAudioRecorder from './useAudioRecorder'

interface ToastContextProps {
  children: React.ReactNode
}
export type Audio = {
  playAudio: ({ audioUrl, rate }: PlayAudioProps) => Promise<void>
  stopAudio: () => void
  startRecording: () => Promise<void>
  stopRecording: () => Promise<void>
}
export const AudioContext = createContext<Audio>(null)

const AudioProvider: React.FC<ToastContextProps> = ({ children }) => {
  const { playAudio, stopAudio } = useAudioPlayer()
  const { startRecording, stopRecording } = useAudioRecorder()

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, startRecording, stopRecording }}>
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
