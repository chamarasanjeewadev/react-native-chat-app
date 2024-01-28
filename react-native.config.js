module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true
    },
    assets: ['./src/assets/fonts']
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null
      }
    }
  }
}
