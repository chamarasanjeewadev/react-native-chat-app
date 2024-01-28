import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// eslint-disable-next-line import/no-extraneous-dependencies
import ErrorBoundary from 'react-native-error-boundary'
import RootNavigator from './RootNavigator'

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorBoundary = (error: any): boolean => {
  if (error && error.response && error.response.status && error.response.status >= 500) {
    return true
  }
  return false
}

// queryClient.setDefaultOptions({
//     queries: {
//         /* 500 errors will be thrown to the error boundary */
//         useErrorBoundary: getErrorBoundary,
//     },
//     mutations: {
//         /* 500 errors will be thrown to the error boundary */
//         useErrorBoundary: getErrorBoundary,
//     },
// });

const Navigators = () => (
  //   <QueryClientProvider client={queryClient}>
  //     <ErrorBoundary FallbackComponent={LAErrorBoundaryFallBack}>
  //       <SafeAreaProvider>
  //         <NavigationContainer>
  <RootNavigator />
  //<LANotificationPopup />
  //   <LANetworkError />
  // </NavigationContainer>
  //   </SafeAreaProvider>
  //     </ErrorBoundary>
  //   </QueryClientProvider>
)

export default Navigators
