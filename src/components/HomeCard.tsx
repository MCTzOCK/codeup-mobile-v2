/**
 * src/components/HomeCard.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 26.06.2024
 *
 */

import * as React from "react";
import { Box, Heading, Pressable, Text, VStack, ZStack } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import * as svg from "react-native-svg";
import { router } from "expo-router";

export default function HomeCard(props: {
  title: string;
  icon: React.ReactNode;
  href: string;
  gradient: string[];
}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          minHeight: 200,
          flex: 1,
          minWidth: 300,
        }}
        onPress={() => {
          router.push(props.href);
        }}
      >
        <Box rounded={"md"} h={200} bg={"indigo.500"}>
          <VStack
            flex={1}
            alignItems={"center"}
            justifyContent={"space-around"}
            p={6}
          >
            {props.icon}
            <Heading size={"xl"} fontWeight={900} letterSpacing={1.5}>
              {props.title}
            </Heading>
          </VStack>
        </Box>
      </TouchableOpacity>
    </>
  );
}
