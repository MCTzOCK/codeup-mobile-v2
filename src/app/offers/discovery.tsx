/**
 * src/app/offers/discovery.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { DiscoveryItem } from "@/src/util/productTypes";
import Loader from "@/src/components/Loader";
import { useEffect } from "react";
import REST from "@codeupspace/rest";
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { Dimensions, Linking, TouchableOpacity } from "react-native";
import { defined_colors } from "@/src/constants/colors";
import { useLoggedIn } from "@/src/hooks/useLoggedIn";

export default function Discovery() {
  useNavigation().setOptions({
    headerTitle: "Discovery",
  });

  const [query, setQuery] = React.useState<string>("");
  const [items, setItems] = React.useState<DiscoveryItem[]>([]);

  useEffect(() => {
    reloadItems();
  }, []);

  const reloadItems = async () => {
    const res = await REST.Discovery.getDiscoveryProjects();

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message:
          "Die Entdeckungen konnten nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    setItems(res.payload.projects);
  };

  if (!items || items.length === 0) return <Loader />;

  return (
    <>
      <Box p={6}>
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
              ? items.filter((c) =>
                  c.name.toLowerCase().includes(query.toLowerCase()),
                )
              : items
          }
          numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
          style={{
            gap: 10,
          }}
          renderItem={(i) => {
            return (
              <>
                <Card item={i.item} reload={reloadItems} />
              </>
            );
          }}
        />
      </Box>
    </>
  );
}

const Card = (props: { item: DiscoveryItem; reload: () => void }) => {
  const { userInfo } = useLoggedIn();
  return (
    <Box
      rounded={"md"}
      h={250}
      bg={defined_colors.card}
      style={{
        minHeight: 350,
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
          {props.item.name}
        </Heading>
        <Text>{props.item.description}</Text>
        <Text textAlign={"center"}>
          von <Text color={"brand.500"}>@{props.item.author}</Text>
        </Text>
        <Text textAlign={"center"}>{props.item.stars.length} ⭐️</Text>
        <HStack space={4}>
          <Button
            colorScheme={"brand"}
            onPress={() => {
              Linking.openURL(`https://${props.item.domain}`);
            }}
          >
            Ansehen
          </Button>
          <Button
            colorScheme={"brand"}
            onPress={async () => {
              await REST.Discovery.starProject({
                token: window.authToken as string,
                projectId: props.item.id,
              });

              await window.PopupManager.alertAsync({
                title: "Erfolg",
                message: `Du hast dem Projekt einen Stern ${
                  props.item.stars.includes(userInfo?.id)
                    ? "entfernt"
                    : "hinzugefügt"
                }!`,
              });

              props.reload();
            }}
          >
            Stern&nbsp;
            {props.item.stars.includes(userInfo?.id)
              ? "Entfernen"
              : "Hinzufügen"}
          </Button>
          <Button
            colorScheme={"brand"}
            onPress={async () => {
              const comment = await window.PopupManager.promptAsync({
                title: "Kommentar",
                label: "Inhalt",
                helperText: "Gib deinen Kommentar ein!",
              });

              if (!comment) return;

              const res = await REST.Discovery.commentProject({
                token: window.authToken as string,
                comment: comment,
                projectId: props.item.id,
              });

              if (res.status !== 200) {
                await window.PopupManager.alertAsync({
                  title: "Fehler",
                  message: "Dein Kommentar konnte nicht gespeichert werden!",
                });
                return;
              }

              await window.PopupManager.alertAsync({
                title: "Erfolg",
                message: "Dein Kommentar wurde gespeichert!",
              });
            }}
          >
            Kommentieren
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
