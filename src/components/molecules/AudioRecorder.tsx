import { useState } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from '../../hooks/useSnackBar'
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality } from 'expo-av/build/Audio'

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

      const recordOptions: Audio.RecordingOptions = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          bitRate: 16000, //TODO put these in config
          sampleRate: 12000,
          numberOfChannels: 1,
          extension: '.wav',
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.AAC
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios, // Copy other settings from HIGH_QUALITY preset
          // extension: '.wav',
          sampleRate: 44100, // Set the sample rate to 44.1 kHz, a common standard for audio recording
          bitRate: 128000
        }
        // ios: {
        //   bitRate: 16000,
        //   sampleRate: 12000,
        //   numberOfChannels: 1,
        //   extension: '.wav',
        //   outputFormat: AndroidOutputFormat.DEFAULT,
        //   audioQuality: IOSAudioQuality.MEDIUM
        // }
      }
      const { recording: recordingObject } = await Audio.Recording.createAsync(recordOptions)

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
