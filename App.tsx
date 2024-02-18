import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import RootNavigator from './src/navigators/RootNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { clientPersister } from './src/utils/mmkvStorage'
// import { setupPlayer } from 'react-native-track-player/lib/trackPlayer'
import { navigationRef } from './src/navigators/rootNavigation'
import './global.css'
import Snackbar from 'react-native-snackbar'
import { getDisplayError } from './src/utils/errorUtil'
import BootSplash from 'react-native-bootsplash'
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error) => {
      console.log('error at query cache', error)
      const errormessage = error?.response?.data?.message
      const displayMessage = getDisplayError(errormessage)
      Snackbar.show({ text: displayMessage })
    }
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.log('error at mutation cache', error)
    }
  }),
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

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    }

    init().finally(async () => {
      await BootSplash.hide({ fade: true })
      console.log('BootSplash has been hidden successfully')
    })
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
