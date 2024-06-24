/**
 * components/MenuItems.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */

import * as React from "react";
import { Button, Heading, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { useEffect } from "react";

export default function MenuItems() {
  const router = useExpoRouter();

  const [items, setItems] = React.useState<
    {
      text: string;
      route: string;
    }[]
  >([
    {
      text: "Home",
      route: "/",
    },
    {
      text: "Test",
      route: "/test",
    },
  ]);

  useEffect(() => {
    console.log(router.routeInfo?.pathname);
  }, [router, router.routeInfo, router.routeInfo?.pathname]);

  return (
    <>
      <VStack space={4}>
        <Heading color={"brand.500"} fontWeight={900} textAlign={"center"}>
          CodeUp
        </Heading>
        <VStack space={2} p={2}>
          {items.map((item, index) => (
            <Button
              key={index}
              onPress={() => {
                router.navigate(item.route);
              }}
              colorScheme={"brand"}
              variant={
                router.routeInfo?.pathname === item.route ? "solid" : "ghost"
              }
            >
              {item.text}
            </Button>
          ))}
        </VStack>
      </VStack>
    </>
  );
}
