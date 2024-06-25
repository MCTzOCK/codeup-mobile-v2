/**
 * app/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */

import * as React from "react";
import { Box, Button, Text, View } from "native-base";
import Page from "@/src/components/Page";
import REST from "@codeupspace/rest";
import { router } from "expo-router";

export default function Index() {
  return (
    <>
      <Page>
        <Box w={"1/2"}>
          <Button
            size={"lg"}
            colorScheme={"brand"}
            onPress={async () => {
              router.push("/test");
            }}
          >
            Hello World
          </Button>
        </Box>
      </Page>
    </>
  );
}
