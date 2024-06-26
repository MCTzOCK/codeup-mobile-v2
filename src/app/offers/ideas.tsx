/**
 * src/app/offers/ideas.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 26.06.2024
 *
 */

import * as React from "react";
import Page from "@/src/components/Page";
import Loader from "@/src/components/Loader";
import { useEffect } from "react";
import REST from "@codeupspace/rest";
import { Box, Button, Heading, HStack, ScrollView, Text } from "native-base";
import { router } from "expo-router";

export default function Ideas() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [ideas, setIdeas] = React.useState<
    {
      _id: string;
      title: string;
      description: string;
      exampleDeployedURL: string;
      exampleSourceURL: string;
      level: string;
      __v: number;
    }[]
  >([]);

  useEffect(() => {
    reloadIdeas();
  }, []);

  const reloadIdeas = async () => {
    const res = await REST.Ideas.getProjectIdeas();

    if (res.status === 200) {
      setIdeas(res.payload.ideas);
      setLoading(false);
    } else {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message:
          "Die Projektideen konnten nicht geladen werden: " + res.payload.error,
      });
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <Box p={6}>
      <ScrollView>
        <Heading
          size={"xl"}
          fontWeight={900}
          letterSpacing={1.5}
          mb={4}
          color={"brand.500"}
        >
          Einfach
        </Heading>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {ideas
            .filter((idea) => idea.level === "easy")
            .map((idea) => {
              return (
                <IdeaCard
                  title={idea.title}
                  description={idea.description}
                  level={idea.level}
                  exampleDeployedURL={idea.exampleDeployedURL}
                  exampleSourceURL={idea.exampleSourceURL}
                />
              );
            })}
        </ScrollView>
        <Heading
          size={"xl"}
          fontWeight={900}
          letterSpacing={1.5}
          mb={4}
          color={"brand.500"}
        >
          Mittel
        </Heading>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {ideas
            .filter((idea) => idea.level === "medium")
            .map((idea) => {
              return (
                <IdeaCard
                  title={idea.title}
                  description={idea.description}
                  level={idea.level}
                  exampleDeployedURL={idea.exampleDeployedURL}
                  exampleSourceURL={idea.exampleSourceURL}
                />
              );
            })}
        </ScrollView>
        <Heading
          size={"xl"}
          fontWeight={900}
          letterSpacing={1.5}
          mb={4}
          color={"brand.500"}
        >
          Schwer
        </Heading>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {ideas
            .filter((idea) => idea.level === "hard")
            .map((idea) => {
              return (
                <IdeaCard
                  title={idea.title}
                  description={idea.description}
                  level={idea.level}
                  exampleDeployedURL={idea.exampleDeployedURL}
                  exampleSourceURL={idea.exampleSourceURL}
                />
              );
            })}
        </ScrollView>
      </ScrollView>
    </Box>
  );
}

function IdeaCard(props: {
  title: string;
  description: string;
  level: string;
  exampleDeployedURL: string;
  exampleSourceURL: string;
}) {
  return (
    <Box rounded={"md"} bg={"indigo.500"} w={300} p={4} mr={4} mb={4} flex={1}>
      <Heading size={"md"} fontWeight={900} letterSpacing={1.5}>
        {props.title}
      </Heading>
      <Text>{props.description}</Text>
      <HStack space={2} pt={4} alignItems={"center"}>
        {props.exampleDeployedURL !== "" && (
          <Button
            colorScheme="brand"
            onPress={() => {
              router.push(props.exampleDeployedURL);
            }}
          >
            Vorschau
          </Button>
        )}
        {props.exampleSourceURL !== "" && (
          <Button
            colorScheme="brand"
            onPress={() => {
              router.push(props.exampleSourceURL);
            }}
          >
            Quellcode
          </Button>
        )}
      </HStack>
    </Box>
  );
}
