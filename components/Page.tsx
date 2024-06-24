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
import { Box, HStack, Text } from "native-base";
import MenuItems from "@/components/MenuItems";

export default function Page(props: { children: React.ReactNode }) {
  return (
    <>
      <SafeAreaView>
        <HStack h={"100%"}>
          <Box
            flex={["10%", "20%"]}
            bg={"gray.900"}
            roundedRight={"xl"}
            p={2}
            shadow={"xl"}
          >
            <MenuItems />
          </Box>
          <Box flex={["90%", "80%"]} p={4}>
            {props.children}
          </Box>
        </HStack>
      </SafeAreaView>
    </>
  );
}
