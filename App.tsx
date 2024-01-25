import React from "react";
import { LogBox, Text } from "react-native";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { clientPersister } from "./src/utils/mmkvStorage";
import { ErrorBoundary } from "react-error-boundary";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      <ErrorBoundary
        onError={() => {
          console.log("error occured");
        }}
        fallback={<Text>Something went wrong!</Text>}
        onReset={() => {
          console.log("need to reset...");
        }}
      >
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ErrorBoundary>
    </PersistQueryClientProvider>
  );
}
export default App;
