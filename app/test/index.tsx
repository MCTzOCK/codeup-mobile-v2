/**
 * app/test/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */

import * as React from "react";
import Page from "@/components/Page";
import { Heading } from "native-base";

export default function Index() {
  return (
    <>
      <Page>
        <Heading>Test Page</Heading>
      </Page>
    </>
  );
}
