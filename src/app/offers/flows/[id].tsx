/**
 * src/app/offers/flows/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 29.06.2024
 *
 */

import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Flow } from "@/src/util/productTypes";
import REST from "@codeupspace/rest";
import Loader from "@/src/components/Loader";
import WebView from "react-native-webview";
import { Box, Text } from "native-base";

export default function FlowViewer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const n = useNavigation();

  const [flow, setFlow] = React.useState<Flow | null>(null);

  React.useEffect(() => {
    if (!id) return;

    reloadFlow();
  }, [id]);

  const reloadFlow = async () => {
    const res = await REST.ToDo.getV2Project({
      token: window.authToken as string,
      id: id as string,
    });

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Der Flow konnte nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    setFlow(res.payload.projects[0]);

    n.setOptions({
      headerTitle: res.payload.projects[0].name,
    });
  };

  if (!flow)
    return (
      <>
        <Text>{id}</Text>
      </>
    );

  return (
    <Box bg={"#000"} flex={1}>
      <WebView
        source={{
          uri: `https://codeup.space/planning/${flow._id}?codeup_mv2=true&token=${window.authToken as string}`,
        }}
        style={{ flex: 1, backgroundColor: "#000" }}
      />
    </Box>
  );
}
