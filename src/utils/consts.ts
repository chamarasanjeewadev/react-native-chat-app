import { UK_O } from './../assets/icons/Flags'
import { Track } from 'react-native-track-player'
import { LanguageEnum } from './enums'

export const themeColor = 'blue'
export const playListData: Track[] = [
  {
    id: 1,
    title: 'Maan Meri Jaan',
    artist: 'King',
    album: 'Champagne Talk',
    artwork: 'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500.jpg',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'second title',
    artist: 'King',
    album: 'Champagne Talk',
    artwork: 'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500.jpg',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
]
export const themeColors: IThemeColorOptions[] = [
  {
    color: 'blue',
    bgColor: 'bg-blue-300'
  },
  {
    color: 'orange',
    bgColor: 'bg-orange-300'
  },
  {
    color: 'pink',
    bgColor: 'bg-pink-300'
  }
]

export const proficiencyOptions: IOption[] = [
  {
    label: 'Just Started 🌱',
    value: 'Novice'
  },
  {
    label: 'Beginner 🌱',
    value: 'Beginner'
  },
  {
    label: 'Intermediate 🌾',
    value: 'Intermediate'
  },
  {
    label: 'Advanced 🌲',
    value: 'Advanced'
  },
  {
    label: 'Master 🌳',
    value: 'Master'
  }
]

export const FREE_TRIAL = 'price_trial'
