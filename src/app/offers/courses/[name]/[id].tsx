/**
 * src/app/offers/courses/[name]/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "native-base";

export default function CourseSectionViewer() {
  const { name, id } = useLocalSearchParams();
  return (
    <>
      <Text>
        {name}, {id}
      </Text>
    </>
  );
}
