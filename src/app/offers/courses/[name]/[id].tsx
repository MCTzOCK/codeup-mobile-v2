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
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Box,
  Button,
  Heading,
  Radio,
  ScrollView,
  Text,
  View,
} from "native-base";
import { Course, CourseSection } from "@/src/util/productTypes";
import { useEffect } from "react";
import REST from "@codeupspace/rest";
import WebView from "react-native-webview";
import Loader from "@/src/components/Loader";
import YoutubeIframe from "react-native-youtube-iframe";
import { Dimensions } from "react-native";

export default function CourseSectionViewer() {
  const { name, id } = useLocalSearchParams();

  const navigation = useNavigation();
  const [section, setSection] = React.useState<CourseSection | null>(null);

  useEffect(() => {
    if (!name || !id) return;
    reloadSection();
  }, [name, id]);

  const reloadSection = async () => {
    const res = await REST.Course.getSection({
      token: window.authToken as string,
      course: name as string,
      section: id as string,
    });

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Der Kurs konnte nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    let c = res.payload.content as CourseSection;

    let vidUrl = c.videoUrl;
    vidUrl = vidUrl.replace(
      /https\:\/\/(www.|)youtube.com\/watch\?v=/g,
      "https://www.youtube.com/embed/",
    );

    c.videoUrl = vidUrl;
    setSection(c);

    navigation.setOptions({
      headerTitle: (res.payload.content as CourseSection).displayName,
    });
  };

  const [quizAnswers, setQuizAnswers] = React.useState<{
    [key: string]: string;
  }>({});

  if (!section) return <Loader />;

  return (
    <>
      <ScrollView p={2}>
        <Box mb={18}>
          <Box alignItems={"center"} justifyContent={"center"}>
            <YoutubeIframe
              height={400}
              webViewStyle={{
                width:
                  Dimensions.get("window").width > 500
                    ? Dimensions.get("window").width / 2
                    : 400,
              }}
              videoId={section.videoUrl.split("/").pop()}
              play={false}
            />
          </Box>
          <Box p={6}>
            <Heading size="lg" mb={4} fontWeight={900} color={"brand.500"}>
              {section.displayName} - Quiz
            </Heading>
            {section.quiz.map((q, i) => (
              <>
                <Text>
                  {i + 1}. {q.question}
                </Text>
                <Radio.Group
                  name={q.question}
                  value={quizAnswers[q.question]}
                  onChange={(value) => {
                    const x = quizAnswers;
                    x[q.question] = value;
                    setQuizAnswers(x);
                  }}
                  colorScheme={"brand"}
                >
                  {q.answers.map((a) => (
                    <Radio value={a.answer} my={2}>
                      {a.answer}
                    </Radio>
                  ))}
                </Radio.Group>
              </>
            ))}
            {section.quiz.length > 0 && (
              <>
                <Button
                  colorScheme={"brand"}
                  onPress={async () => {
                    let correct = 0;
                    for (let q of section.quiz) {
                      if (
                        q.answers.find((a) => a.correct)?.answer ===
                        quizAnswers[q.question]
                      ) {
                        correct++;
                      }
                    }

                    window.PopupManager.alertAsync({
                      title: "Ergebnis",
                      message: `Du hast ${correct} von ${section.quiz.length} Fragen richtig beantwortet. ${
                        correct === section.quiz.length
                          ? "Damit ist diese Lektion abgeschlossen!"
                          : "Versuche es noch einmal, um die Lektion abzuschließen!"
                      }`,
                    });

                    if (correct === section.quiz.length) {
                      await REST.Course.updateCourseProgress({
                        token: window.authToken as string,
                        course: name as string,
                        section: id as string,
                      });
                      router.back();
                    }
                  }}
                >
                  Überprüfen
                </Button>
              </>
            )}
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
