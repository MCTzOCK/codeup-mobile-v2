/**
 * src/app/codeup/privacy.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import WebView from "react-native-webview";
import { useNavigation } from "expo-router";

export default function privacy() {
  useNavigation().setOptions({
    headerTitle: "Datenschutz",
  });
  return (
    <>
      <WebView
        source={{ uri: "https://codeup.space/legal/privacy" }}
        style={{ flex: 1 }}
      />
    </>
  );
}
