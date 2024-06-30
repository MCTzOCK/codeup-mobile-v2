/**
 * src/app/offers/codeup-kids/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 30.06.2024
 *
 */

import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { KidsProject } from "@/src/util/productTypes";
import Loader from "@/src/components/Loader";
import REST from "@codeupspace/rest";
import { Box } from "native-base";
import WebView from "react-native-webview";

export default function KidsProjectViewer() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const n = useNavigation();

  const [project, setProject] = useState<KidsProject | null>(null);

  React.useEffect(() => {
    if (!id) return;
    reloadProject();
  }, [id]);

  const reloadProject = async () => {
    const res = await REST.Kids.getProject({
      token: window.authToken as string,
      id: id as string,
    });

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message:
          "Das Projekt konnte nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    setProject(res.payload.project);

    n.setOptions({
      headerTitle: res.payload.project.name,
    });
  };

  if (!project) return <Loader />;
  return (
    <>
      <Box bg={"#000"} flex={1}>
        <WebView
          source={{
            uri: `https://codeup.space/kids/${project._id}?codeup_mv2=true&token=${window.authToken as string}`,
          }}
          style={{ flex: 1, backgroundColor: "#000" }}
          originWhitelist={["*"]}
        />
      </Box>
    </>
  );
}
