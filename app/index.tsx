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
import Page from "@/components/Page";
import REST from "@codeupspace/rest";

export default function Index() {
  return (
    <>
      <Page>
        <Box w={"1/2"}>
          <Button
            size={"lg"}
            colorScheme={"darkBlue"}
            onPress={async () => {
              const res = await REST.Ideas.getProjectIdeas();
            }}
          >
            Hello World
          </Button>
        </Box>
      </Page>
    </>
  );
}
