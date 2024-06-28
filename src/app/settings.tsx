/**
 * src/app/settings.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { useNavigation } from "expo-router";

export default function Settings() {
  useNavigation().setOptions({
    headerTitle: "Einstellungen",
  });
  return <></>;
}
