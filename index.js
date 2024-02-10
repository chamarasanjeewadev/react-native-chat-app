/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
// import TrackPlayer from 'react-native-track-player'
// import { playbackService } from './src/utils/musicPlayServices'
import './src/utils/i18n/config'
AppRegistry.registerComponent(appName, () => App)
// TrackPlayer.registerPlaybackService(() => playbackService)
