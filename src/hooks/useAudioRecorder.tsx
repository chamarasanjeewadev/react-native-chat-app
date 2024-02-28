import { useCallback, useEffect, useRef } from 'react'
import { Audio } from 'expo-av'
import useSnackBar from './useSnackBar'
import { AndroidAudioEncoder, AndroidOutputFormat } from 'expo-av/build/Audio'
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

const useAudioRecorder = () => {
  const recodingRef = useRef<Audio.Recording>(null)
  const recordedAudioRef = useRef<AudioType>(null)
  const { showSnackBar } = useSnackBar()

  const initRecorder = useCallback(async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true
    })
  }, [])

  useEffect(() => {
    initRecorder()
    return () => {
      // recodingRef.current.stopAndUnloadAsync()
      // recodedAudioRef.current = null
    }
  }, [])

  const startRecording = async () => {
    try {
      // await stopRecording()

      // await Audio.setAudioModeAsync({
      //   allowsRecordingIOS: true,
      //   playsInSilentModeIOS: true
      // })
      const { granted } = await Audio.requestPermissionsAsync()
      if (!granted) {
        showSnackBar({ text: 'Permission to access microphone denied' })
        throw new Error('Permission to access microphone denied')
      }

      const { recording: recordingObject } = await Audio.Recording.createAsync(recordOptions)
      recodingRef.current = recordingObject
    } catch (error) {
      console.error('Failed to start recording:', error)
      showSnackBar({ text: 'Failed to start recording' })
      await stopRecording()
    }
  }

  const getRecorded = () => {
    return recordedAudioRef.current
  }

  const stopRecording = async () => {
    try {
      await recodingRef.current.stopAndUnloadAsync()
      const { sound } = await recodingRef.current.createNewLoadedSoundAsync()
      recordedAudioRef.current = {
        sound: sound,
        file: recodingRef.current.getURI()
      }
    } catch (error) {
      console.error('Failed to stop recording:', error)
    }
  }
  return {
    startRecording,
    stopRecording,
    recordedAudioRef: recordedAudioRef.current,
    getRecorded
  }
}

export default useAudioRecorder
