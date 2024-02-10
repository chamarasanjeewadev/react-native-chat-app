import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import RootNavigator from './src/navigators/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { clientPersister } from './src/utils/mmkvStorage'
// import { setupPlayer } from 'react-native-track-player/lib/trackPlayer'
import { navigationRef } from './src/navigators/rootNavigation'
import './global.css'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24
    }
  }
})

function App(): React.JSX.Element {
  LogBox.ignoreAllLogs()
  async function setup() {
    // await setupPlayer()
  }

  useEffect(() => {
    setup()
  }, [])
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </PersistQueryClientProvider>
  )
}
export default App
