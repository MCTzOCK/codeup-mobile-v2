/**
 * src/app/offers/editor.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 30.06.2024
 *
 */

import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Loader from "@/src/components/Loader";
import { Box } from "native-base";
import WebView from "react-native-webview";

export default function Editor() {
  const { version } = useLocalSearchParams<{ version: string }>();

  useNavigation().setOptions({
    headerTitle: "Editor",
  });

  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (version === "1") {
      setUrl("https://codeup.space/ide");
    } else if (version === "2") {
      setUrl("https://codeup.space/editor");
    } else if (version === "3") {
      setUrl("https://codeup.space/projects");
    }
  }, [version]);

  if (!url) return <Loader />;

  return (
    <>
      <Box bg={"#000"} flex={1}>
        <WebView
          source={{
            uri: `${url}?codeup_mv2=true&token=${window.authToken as string}`,
          }}
          style={{ flex: 1, backgroundColor: "#000" }}
          originWhitelist={["*"]}
        />
      </Box>
    </>
  );
}
