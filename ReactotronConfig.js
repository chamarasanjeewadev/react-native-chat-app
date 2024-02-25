import Reactotron, { networking } from 'reactotron-react-native'
import { queryClient } from './src/utils/queryClient'
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query'

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
