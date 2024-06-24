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

export default function Index() {
  return (
    <>
      <Page>
        <Box w={"1/2"} mt={8} ml={8}>
          <Button size={"lg"} colorScheme={"darkBlue"}>
            Hello World
          </Button>
        </Box>
      </Page>
    </>
  );
}
