/**
 * src/app/offers/forum.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 29.06.2024
 *
 */

import * as React from "react";
import WebView from "react-native-webview";
import { useNavigation } from "expo-router";
import { Box } from "native-base";

export default function Forum() {
  useNavigation().setOptions({
    headerTitle: "Forum",
  });
  return (
    <Box flex={1}>
      <WebView
        source={{
          uri: `https://codeup.space/forum/?codeup_mv2=true&token=${window.authToken as string}`,
        }}
        style={{
          flex: 1,
          backgroundColor: "#000",
        }}
      />
    </Box>
  );
}
