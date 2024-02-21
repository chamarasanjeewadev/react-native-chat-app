import Reactotron, { networking } from 'reactotron-react-native'
import { queryClient } from './src/utils/queryClient'
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query'
// Reactotron.setAsyncStorageHandler(AsyncStorage)
//   .configure() // controls connection & communication settings
//   .use(networking())
//   .useReactNative() // add all built-in react native plugins
//   .connect() // let's connect!
const queryClientManager = new QueryClientManager({
  queryClient
})
Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe()
    }
  })
  .use(networking())
  .useReactNative()
  .connect()
