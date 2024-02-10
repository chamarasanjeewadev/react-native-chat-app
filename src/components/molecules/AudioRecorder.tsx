import { useState } from 'react'
import { Audio } from 'expo-av'

const useAudioRecorder = () => {
  const [recording, setRecording] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState([])

  const startRecording = async () => {
    console.log('inside start rec...')
    try {
      const { granted } = await Audio.requestPermissionsAsync()
      if (!granted) {
        throw new Error('Permission to access microphone denied')
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const recordingObject = new Audio.Recording()
      await recordingObject.prepareToRecordAsync()
      await recordingObject.startAsync()

      setRecording(recordingObject)
      setIsRecording(x => !x)
      console.log('record started...', recordingObject)
    } catch (error) {
      console.error('Failed to start recording:', error)
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
            duration: getDurationFormatted(status.durationMillis),
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
