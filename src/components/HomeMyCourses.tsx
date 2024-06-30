/**
 * src/components/HomeMyCourses.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 30.06.2024
 *
 */

import * as React from "react";
import { Box, Heading, ScrollView, Text, VStack } from "native-base";
import { Course } from "@/src/util/productTypes";
import REST from "@codeupspace/rest";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { defined_colors } from "@/src/constants/colors";
import { Image } from "expo-image";
import { useEffect } from "react";

export default function HomeMyCourses() {
  const [courses, setCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    reloadCoures();
  }, []);

  const reloadCoures = async () => {
    const res = await REST.Course.getEnrollments({
      token: window.authToken as string,
    });

    if (res.status === 200) {
      let x: Course[] = [];

      for (const y of res.payload.enrollments) {
        x.push(y.course);
      }

      setCourses(x);
    }
  };

  return (
    <>
      <Heading
        size={"xl"}
        fontWeight={900}
        letterSpacing={1.5}
        mb={4}
        mt={4}
        color={"brand.500"}
      >
        Meine Kurse
      </Heading>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        h={350}
      >
        {courses.map((course) => {
          return <Card course={course} />;
        })}
        {courses.length === 0 && (
          <VStack
            alignItems={"center"}
            justifyContent={"center"}
            h={350}
            w={400}
          >
            <Text>Keine Kurse gefunden</Text>
          </VStack>
        )}
      </ScrollView>
    </>
  );
}

const Card = (props: { course: Course }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        height: 350,
        width: 400,
        margin: 10,
      }}
      onPress={() => {
        router.push(`/offers/courses/${props.course._id}`);
      }}
    >
      <Box rounded={"md"} h={300} bg={defined_colors.card}>
        <VStack alignItems={"center"} justifyContent={"space-around"} p={2}>
          <Image
            source={props.course.splashImage}
            style={{
              width: 350,
              height: 150,
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
