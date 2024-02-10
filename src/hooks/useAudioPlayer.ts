import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const useAudioPlayer = (audioFile) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(audioFile);
      setSound(sound);
    };

    loadAudio();

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioFile]);

  const playAudio = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return {
    playAudio,
    stopAudio,
    isPlaying,
  };
};

export default useAudioPlayer;
