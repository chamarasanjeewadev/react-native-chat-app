import React, { useEffect, useState } from "react";
import { LogBox, Text } from "react-native";
import RootNavigator from "./src/navigators/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { clientPersister } from "./src/utils/mmkvStorage";
import { ErrorBoundary } from "react-error-boundary";
import { setupPlayer } from "react-native-track-player/lib/trackPlayer";
import { addTrack } from "./src/utils/musicPlayServices";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}
function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();

  async function setup() {
    await setupPlayer();
    // await addTrack()
  }

  useEffect(() => {
    setup();
  }, []);
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
