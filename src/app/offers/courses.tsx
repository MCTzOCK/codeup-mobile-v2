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
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { Image } from "expo-image";
import { Dimensions, ListRenderItem, TouchableOpacity } from "react-native";
import { router, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import REST from "@codeupspace/rest";
import { AccountManager } from "@/src/util/AccountManager";
import WebView from "react-native-webview";
import { defined_colors } from "@/src/constants/colors";
import { Course } from "@/src/util/productTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function Courses() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerTitle: "Kurse",
  });
  const [courses, setCourse] = React.useState<Course[]>([]);

  useEffect(() => {
    reloadCourses();
  }, []);

  const [query, setQuery] = React.useState<string>("");

  const reloadCourses = async () => {
    const res = await REST.Course.listCourses({
      token: window.authToken as string,
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
      <HStack justifyContent={"space-between"} p={2.5}>
        <Input
          placeholder={"Suche..."}
          flex={1}
          size={"lg"}
          onChangeText={(t) => setQuery(t)}
          value={query}
          colorScheme={"brand"}
          _focus={{
            borderColor: "brand.500",
            backgroundColor: "transparent",
          }}
        />
      </HStack>
      <FlatList
        data={
          query.length > 0
            ? courses.filter((c) =>
                c.name.toLowerCase().includes(query.toLowerCase()),
              )
            : courses
        }
        numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
        style={{
          gap: 10,
        }}
        renderItem={(i) => {
          return (
            <>
              <Card course={i.item} />
            </>
          );
        }}
      />
    </Box>
  );
}

const Card = (props: { course: Course }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        minHeight: 350,
        flex: 1,
        minWidth: 300,
        margin: 10,
      }}
      onPress={() => {
        router.push(`/offers/courses/${props.course._id}`);
      }}
    >
      <Box rounded={"md"} h={[425, 400]} bg={defined_colors.card}>
        <VStack
          flex={1}
          alignItems={"center"}
          justifyContent={"space-around"}
          p={2}
        >
          <Image
            source={props.course.splashImage}
            style={{
              width: 350,
              height: 200,
              backgroundColor: "transparent",
            }}
            contentFit={"contain"}
          />
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            color={"brand.500"}
            textAlign={"center"}
          >
            {props.course.name}
          </Heading>
          <Text textAlign={"center"}>
            {props.course.description.substring(0, 100)}...
          </Text>
          <Text textAlign={"center"}>
            von <Text color={"brand.500"}>@{props.course.creator}</Text>
          </Text>
          <Text textAlign={"center"}>
            {props.course.contentPositions.length}{" "}
            <Text color={"brand.500"}>Lektionen</Text>
          </Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};
