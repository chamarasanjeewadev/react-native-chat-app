import { useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from '../../hooks/useSnackBar'

type AudioType = {
  sound: Audio.Sound
  file: string
}

const useAudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState<AudioType[]>([])
  const { showSnackBar } = useSnackBar()

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync()
      if (!granted) {
        showSnackBar({ text: 'Permission to access microphone denied' })
        throw new Error('Permission to access microphone denied')
      }

      if (isRecording) {
        await stopRecording()
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const x = { ...Audio.RecordingOptionsPresets.HIGH_QUALITY, outputFormat: '.wav' }
      const { recording: recordingObject } = await Audio.Recording.createAsync(x)

      setRecording(recordingObject)
      setIsRecording(x => !x)
      console.log('record started...', recordingObject)
    } catch (error) {
      console.error('Failed to start recording:', error)
      showSnackBar({ text: 'Failed to start recording' })
      await stopRecording()
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60)
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  const stopRecording = async () => {
    console.log('inside stop recording...')
    if (isRecording) {
      try {
        await recording.stopAndUnloadAsync()
        const { sound, status } = await recording.createNewLoadedSoundAsync()
        setIsRecording(false)
        setRecording(null)
        const uri = recording.getURI()
        setRecordings(x => [
          ...x,
          {
            sound: sound,
            file: recording.getURI()
          }
        ])
        console.log('record', uri)
      } catch (error) {
        console.error('Failed to stop recording:', error)
      }
    }
  }

  return {
    startRecording,
    stopRecording,
    isRecording,
    recordings
  }
}

export default useAudioRecorder
