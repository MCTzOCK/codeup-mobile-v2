/**
 * src/app/offers/challenges.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.07.2024
 *
 */

import * as React from "react";
import { useNavigation } from "expo-router";
import WebView from "react-native-webview";
import { Box } from "native-base";
import { Linking } from "react-native";

export default function Challenges() {
  useNavigation().setOptions({
    headerTitle: "Snippets",
  });
  const webViewRef = React.useRef<WebView>(null);

  return (
    <Box flex={1}>
      <WebView
        source={{
          uri: `https://codeup.space/challenges/?codeup_mv2=true&token=${window.authToken as string}`,
        }}
        style={{
          flex: 1,
          backgroundColor: "#000",
        }}
        ref={webViewRef}
        originWhitelist={["*"]}
        onNavigationStateChange={async (navState) => {
          const { url } = navState;

          if (!url) return;

          if (!url.startsWith("https://codeup.space/")) {
            Linking.openURL(url);
            webViewRef.current?.goBack();
          }
        }}
      />
    </Box>
  );
}
