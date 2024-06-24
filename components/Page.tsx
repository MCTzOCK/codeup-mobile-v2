/**
 * components/Page.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */

import * as React from "react";
import { SafeAreaView } from "react-native";

export default function Page(props: { children: React.ReactNode }) {
  return (
    <>
      <SafeAreaView>{props.children}</SafeAreaView>
    </>
  );
}
