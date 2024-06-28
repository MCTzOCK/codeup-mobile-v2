/**
 * src/app/offers.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 26.06.2024
 *
 */

import * as React from "react";
import { useNavigation } from "expo-router";

export default function Offers() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerTitle: "Angebote",
  });
  return <></>;
}
