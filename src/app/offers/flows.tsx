/**
 * src/app/offers/flows.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 29.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { Blog, Flow } from "@/src/util/productTypes";
import Loader from "@/src/components/Loader";
import REST from "@codeupspace/rest";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dimensions, RefreshControl, TouchableOpacity } from "react-native";
import { defined_colors } from "@/src/constants/colors";

export default function Flows() {
  useNavigation().setOptions({
    headerTitle: "Flows",
  });

  const [flows, setFlows] = React.useState<Flow[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    reloadFlows();
  }, []);

  const reloadFlows = async () => {
    setLoading(true);
    const res = await REST.ToDo.getV2Projects(window.authToken as string);

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Die Flows konnten nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    setFlows(res.payload.projects);
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
          <RefreshControl refreshing={loading} onRefresh={reloadFlows} />
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
                  title: "Flow erstellen",
                  label: "Name",
                  helperText: "Gib den Namen für den neuen Flow ein!",
                });

                if (!name) return;

                const res = await REST.ToDo.createV2Project({
                  token: window.authToken as string,
                  name,
                });

                if (res.status !== 200) {
                  await window.PopupManager.alertAsync({
                    title: "Fehler",
                    message:
                      "Der Flow konnte nicht erstellt werden: " +
                      res.payload.error,
                  });
                  return;
                }

                window.PopupManager.alertAsync({
                  title: "Erfolg",
                  message: "Der Flow wurde erfolgreich erstellt!",
                });

                reloadFlows();
              }}
              leftIcon={<FontAwesome6 name={"plus"} size={24} color={"#000"} />}
            >
              Neuer Flow
            </Button>
          </HStack>
          <FlatList
            data={
              query.length > 0
                ? flows.filter((c) =>
                    c.name.toLowerCase().includes(query.toLowerCase()),
                  )
                : flows
            }
            numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
            style={{
              gap: 10,
            }}
            renderItem={(i) => {
              return (
                <>
                  <Card flow={i.item} reload={reloadFlows} />
                </>
              );
            }}
          />
        </Box>
      </ScrollView>
    </>
  );
}

const Card = (props: { flow: Flow; reload: () => void }) => {
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
          {props.flow.name}
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
              router.push(`/offers/flows/${props.flow._id}`);
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
                  title: "Flow löschen",
                  message: "Möchtest du diesen Flow wirklich löschen?",
                }))
              )
                return;

              const res = await REST.ToDo.deleteV2Project({
                token: window.authToken as string,
                id: props.flow._id,
              });

              if (res.status !== 200) {
                await window.PopupManager.alertAsync({
                  title: "Fehler",
                  message:
                    "Der Flow konnte nicht gelöscht werden: " +
                    res.payload.error,
                });
                return;
              }

              window.PopupManager.alertAsync({
                title: "Erfolg",
                message: "Der Flow wurde erfolgreich gelöscht!",
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
