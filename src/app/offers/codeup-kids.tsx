/**
 * src/app/offers/codeup-kids.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 30.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { Flow, KidsProject } from "@/src/util/productTypes";
import REST from "@codeupspace/rest";
import Loader from "@/src/components/Loader";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Input,
  ScrollView,
  VStack,
} from "native-base";
import { Dimensions, RefreshControl } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { defined_colors } from "@/src/constants/colors";

export default function CodeUpKids() {
  useNavigation().setOptions({
    headerTitle: "CodeUp Kids",
  });

  const [projects, setProjects] = React.useState<KidsProject[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    reloadProjects();
  }, []);

  const reloadProjects = async () => {
    setLoading(true);
    const res = await REST.Kids.getProjects(window.authToken as string);

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message:
          "Die CodeUp-Kids Projekte konnten nicht geladen werden: " +
          res.payload.error,
      });
      return;
    }

    setProjects(res.payload.projects);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reloadProjects} />
        }
      >
        <Box p={6} flex={1}>
          <HStack
            justifyContent={"space-between"}
            p={2.5}
            style={{
              gap: 10,
            }}
          >
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
            <Button
              colorScheme={"brand"}
              onPress={async () => {
                const name = await window.PopupManager.promptAsync({
                  title: "Projekt erstellen",
                  label: "Name",
                  helperText: "Gib den Namen für dein neues Projekt ein!",
                });

                if (!name) return;

                const res = await REST.Kids.createProject({
                  token: window.authToken as string,
                  name,
                });

                if (res.status !== 200) {
                  await window.PopupManager.alertAsync({
                    title: "Fehler",
                    message:
                      "Das Projekt konnte nicht erstellt werden: " +
                      res.payload.error,
                  });
                  return;
                }

                window.PopupManager.alertAsync({
                  title: "Erfolg",
                  message: "Das Projekt wurde erfolgreich erstellt!",
                });

                reloadProjects();
              }}
              leftIcon={<FontAwesome6 name={"plus"} size={24} color={"#000"} />}
            >
              Neu
            </Button>
          </HStack>
          <FlatList
            data={
              query.length > 0
                ? projects.filter((c) =>
                    c.name.toLowerCase().includes(query.toLowerCase()),
                  )
                : projects
            }
            numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
            style={{
              gap: 10,
            }}
            renderItem={(i) => {
              return (
                <>
                  <Card project={i.item} reload={reloadProjects} />
                </>
              );
            }}
          />
        </Box>
      </ScrollView>
    </>
  );
}

const Card = (props: { project: KidsProject; reload: () => void }) => {
  return (
    <Box
      rounded={"md"}
      h={250}
      bg={defined_colors.card}
      style={{
        minHeight: 100,
        flex: 1,
        minWidth: 300,
        margin: 10,
      }}
    >
      <VStack
        flex={1}
        alignItems={"center"}
        justifyContent={"space-around"}
        p={2}
      >
        <Heading
          size={"xl"}
          fontWeight={900}
          letterSpacing={1.5}
          color={"brand.500"}
          textAlign={"center"}
        >
          {props.project.name}
        </Heading>
        <HStack
          space={2}
          pt={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            colorScheme={"brand"}
            onPress={async () => {
              router.push(`/offers/codeup-kids/${props.project._id}`);
            }}
            leftIcon={<FontAwesome6 name={"eye"} size={24} color={"#000"} />}
          >
            Öffnen
          </Button>
          <Button
            colorScheme={"red"}
            onPress={async () => {
              if (
                !(await window.PopupManager.confirmAsync({
                  title: "Projekt löschen",
                  message: "Möchtest du dieses Projekt wirklich löschen?",
                }))
              )
                return;

              const res = await REST.Kids.deleteProject({
                token: window.authToken as string,
                id: props.project._id,
              });

              if (res.status !== 200) {
                await window.PopupManager.alertAsync({
                  title: "Fehler",
                  message:
                    "Das Projekt konnte nicht gelöscht werden: " +
                    res.payload.error,
                });
                return;
              }

              window.PopupManager.alertAsync({
                title: "Erfolg",
                message: "Das Projekt wurde erfolgreich gelöscht!",
              });

              props.reload();
            }}
            leftIcon={<FontAwesome6 name={"trash"} size={24} color={"#000"} />}
          >
            Löschen
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
