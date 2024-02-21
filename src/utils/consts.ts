// import { Track } from 'react-native-track-player'
import { Platform } from 'react-native'
import { themes } from './theme'

export const themeColor = 'blue'
export const themeColors: IThemeColorOptions[] = [
  {
    color: 'blue',
    bgColor: themes.blue.light['--primary']
  },
  {
    color: 'orange',
    bgColor: themes.orange.light['--primary']
  },
  {
    color: 'pink',
    bgColor: themes.pink.light['--primary']
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

export const MESSAGES = {
  TOEN_ERROR: 'token error',
  FEEDBACK_SUCCESS: 'Feedback sent successfully.',
  USER_UPDATE_SUCCESS: 'User updated successfully.',
  SUPPORT_SUCCESS: 'Message sent successfully.',
  SUPPORT_ERROR: 'Message send error.',
  SUBSCRIPTION_SUCCESS: 'The subscription was setup successfully',
  PAYMENT_SUCCESS: 'The payment was successfull',
  UPGRADE_TO_PREMIUM_ERROR: 'Upgrade to premium',
  CREDENTIALS_ERROR: 'Could not validate credentials'
}

export const FREE_TRIAL = 'price_trial'

export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4242' : 'http://localhost:4242'
export const MERCHANT_ID = 'merchant.com.stripe.react.native'
export const PUBLISHABLE_kEY =
  'pk_test_51NqNmxLjRcuP1fi9ehGBw2Gpe47xUWVPZ04KWAYcpk3KEakuJ83rkmhyCjiCH2grhfZKf38hyDLOa98IfcXzDXNu00X9gwgfle'
