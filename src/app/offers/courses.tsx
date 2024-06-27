/**
 * src/app/courses.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.06.2024
 *
 */

import * as React from "react";
import { Box, FlatList, Heading, Image, Text, VStack } from "native-base";
import { Dimensions, ListRenderItem, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import REST from "@codeupspace/rest";
import { AccountManager } from "@/src/util/AccountManager";
import { SvgXml } from "react-native-svg";
import WebView from "react-native-webview";

interface Course {
  __v: number;
  _id: string;
  available: string;
  contentPositions: string[];
  createdAt: string;
  creator: string;
  description: string;
  friendlyName: string;
  name: string;
  splashImage: string;
}

export default function Courses() {
  const [courses, setCourse] = React.useState<Course[]>([]);

  useEffect(() => {
    reloadCourses();
  }, []);

  const reloadCourses = async () => {
    const res = await REST.Course.listCourses({
      token: AccountManager.getToken() as string,
    });

    if (res.status === 200) {
      setCourse(res.payload.courses);
    } else {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Die Kurse konnten nicht geladen werden: " + res.payload.error,
      });
    }
  };

  return (
    <Box p={6} flex={1}>
      <FlatList
        data={[...courses]}
        numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
        style={{
          gap: 10,
        }}
        renderItem={(i) => {
          return (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  minHeight: 350,
                  flex: 1,
                  minWidth: 300,
                  margin: 10,
                }}
                onPress={() => {
                  router.push("/offers/course/" + i.item.friendlyName);
                }}
              >
                <Box rounded={"md"} h={350} bg={"indigo.500"}>
                  <VStack
                    flex={1}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    p={2}
                  >
                    <WebView
                      style={{
                        width: 350,
                        height: 300,
                        backgroundColor: "transparent",
                        overflow: "hidden",
                      }}
                      source={{
                        html: `<div style="overflow: hidden;background: transparent;padding: 1rem;display: flex;align-items: center;justify-content: center"><img src="${i.item.splashImage}" style="width: 100%; height: 100%; object-fit: contain; background-color: transparent"/></div>`,
                      }}
                    />
                    <Heading
                      size={"xl"}
                      fontWeight={900}
                      letterSpacing={1.5}
                      color={"brand.500"}
                      textAlign={"center"}
                    >
                      {i.item.name}
                    </Heading>
                    <Text textAlign={"center"}>
                      {i.item.description.substring(0, 100)}...
                    </Text>
                    <Text textAlign={"center"}>
                      von <Text color={"brand.500"}>@{i.item.creator}</Text>
                    </Text>
                    <Text textAlign={"center"}>
                      {i.item.contentPositions.length}{" "}
                      <Text color={"brand.500"}>Lektionen</Text>
                    </Text>
                  </VStack>
                </Box>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </Box>
  );
}
