/**
 * src/components/Loader.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 26.06.2024
 *
 */

import * as React from "react";
import { Spinner, View, VStack } from "native-base";

export default function Loader() {
  return (
    <>
      <View
        flex={1}
        bg={"#121212"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <VStack space={4} justifyContent={"center"} alignItems={"center"}>
          <Spinner
            accessibilityLabel={"Loading"}
            color={"brand.500"}
            size={"lg"}
          />
        </VStack>
      </View>
    </>
  );
}
