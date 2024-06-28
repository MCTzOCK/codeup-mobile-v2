/**
 * src/app/offers/courses/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.06.2024
 *
 */

import * as React from "react";
import REST from "@codeupspace/rest";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Course, CourseSection } from "@/src/util/productTypes";
import { useEffect } from "react";
import { AccountManager } from "@/src/util/AccountManager";
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Progress,
  ScrollView,
  Text,
} from "native-base";
import { Image } from "expo-image";
import Loader from "@/src/components/Loader";
import { defined_colors } from "@/src/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { RefreshControl } from "react-native";

export default function Name() {
  const { name } = useLocalSearchParams();
  const navigation = useNavigation();
  const [course, setCourse] = React.useState<Course | null>(null);
  const [enrolled, setEnrolled] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<string[]>([]);
  const [sections, setSections] = React.useState<CourseSection[]>([]);

  useEffect(() => {
    if (!name) return;
    reloadCourse();
  }, [name]);

  const reloadCourse = async () => {
    setRefreshing(true);
    const res = await REST.Course.getCourse({
      token: window.authToken as string,
      course: name as string,
    });

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Der Kurs konnte nicht geladen werden: " + res.payload.error,
      });
    } else {
      setCourse(res.payload.course);

      navigation.setOptions({
        headerTitle: (res.payload.course as Course).name,
      });
    }

    const enrolledRes = await REST.Course.getEnrollment({
      token: window.authToken as string,
      course: name as string,
    });

    if (enrolledRes.status === 200 && enrolledRes.payload.enrolled) {
      setEnrolled(true);

      const progressRes = await REST.Course.getCourseProgress({
        token: window.authToken as string,
        course: name as string,
      });

      if (progressRes.status === 200) {
        setProgress(progressRes.payload.progress);
      }
    }

    let s: CourseSection[] = [];

    for await (const x of res.payload.course.contentPositions) {
      if (x === "false") continue;

      const sectionRes = await REST.Course.getSection({
        token: window.authToken as string,
        section: x,
        course: name as string,
      });

      if (sectionRes.status === 200) {
        s.push(sectionRes.payload.content);
      }
    }

    setSections(s);
    setRefreshing(false);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  if (!course) return <Loader />;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadCourse} />
        }
      >
        <Box
          p={6}
          flex={1}
          flexDirection={["column", "row"]}
          style={{
            gap: 20,
          }}
        >
          <Box bg={defined_colors.card} flex={0.8} p={2} rounded={"lg"}>
            <Image
              source={course.splashImage}
              style={{
                width: "100%",
                height: 200,
              }}
              contentFit={"contain"}
            />
            <Heading color={"brand.500"} size={"lg"} mt={4} fontWeight={900}>
              {course.name}
              <Heading size={"sm"} fontWeight={400} color={"gray.500"}>
                &nbsp;&nbsp;von @{course.creator}
              </Heading>
            </Heading>
            <Text>{course.description}</Text>
            <Box p={2}></Box>
            <Heading color={"brand.500"} size={"lg"} fontWeight={900}>
              Status
            </Heading>
            {enrolled ? (
              <>
                <Text>
                  Du bist eingeschrieben und kannst deinen Fortschritt
                  nachverfolgen! Eine Lektion wird als abgeschlossen markiert,
                  wenn du alle Quizfragen richtig beantwortet hast.
                </Text>
                <Progress
                  colorScheme={"brand"}
                  max={course.contentPositions.length}
                  value={progress.length}
                  mt={2}
                />
              </>
            ) : (
              <>
                <Text>
                  Du bist nicht eingeschrieben und kannst deinen Fortschritt
                  nicht nachverfolgen!
                </Text>
                <Button
                  onPress={async () => {
                    const res = await REST.Course.changeEnrollment({
                      token: window.authToken as string,
                      course: name as string,
                    });

                    if (res.status === 200) {
                      await reloadCourse();
                    }
                  }}
                  colorScheme={"brand"}
                  mt={2}
                >
                  Einschreiben
                </Button>
              </>
            )}
          </Box>
          <Box flex={1}>
            <Heading color={"brand.500"} size={"lg"} fontWeight={900} mb={4}>
              Lektionen
            </Heading>
            {sections.length === 0 && (
              <>
                <Loader />
              </>
            )}
            {sections.map((section, i) => {
              return (
                <>
                  <Box key={i} bg={defined_colors.card} p={2} rounded={"lg"}>
                    <HStack justifyContent={"space-between"}>
                      <Heading color={"brand.500"} size={"lg"} fontWeight={900}>
                        {section.displayName}
                      </Heading>
                      {progress.includes(section._id) && (
                        <FontAwesome6
                          name={"check"}
                          size={24}
                          color={"#F7DE1F"}
                        />
                      )}
                    </HStack>
                    <Text>
                      Diese Lektion enthält {section.quiz.length} Quizfragen.
                    </Text>
                    <Button
                      onPress={() => {
                        router.push(`/offers/courses/${name}/${section._id}`);
                      }}
                      colorScheme={"brand"}
                      mt={2}
                    >
                      Ansehen
                    </Button>
                  </Box>
                  {i === sections.length - 1 ? (
                    <></>
                  ) : (
                    <Box h={16} alignItems={"center"}>
                      <Box
                        bg={
                          progress.includes(section._id)
                            ? "brand.600"
                            : "gray.500"
                        }
                        w={1}
                        h={4}
                      ></Box>
                      <Box
                        bg={
                          progress.includes(section._id)
                            ? "brand.600"
                            : "gray.500"
                        }
                        rounded={"full"}
                        h={8}
                        w={8}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        {progress.includes(section._id) && (
                          <>
                            <FontAwesome6
                              name={"check"}
                              size={24}
                              color={"#000"}
                            />
                          </>
                        )}
                      </Box>
                      <Box
                        bg={
                          progress.includes(
                            sections[i + 1] ? sections[i + 1]._id : "",
                          ) && progress.includes(section._id)
                            ? "brand.600"
                            : "gray.500"
                        }
                        w={1}
                        h={4}
                      ></Box>
                    </Box>
                  )}
                </>
              );
            })}
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
