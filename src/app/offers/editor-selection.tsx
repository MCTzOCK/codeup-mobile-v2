/**
 * src/app/offers/editor-selection.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 30.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { Box, Text, List, HStack, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";

export default function EditorSelection() {
  useNavigation().setOptions({
    headerTitle: "Editor auswählen",
  });
  return (
    <>
      <ScrollView>
        <Box p={6}>
          <Text>
            CodeUp bietet drei verschiedene Editoren an, die alle verschiedene
            Funktionen und Vorteile bieten!
          </Text>
          <List
            mt={4}
            rounded={"lg"}
            divider={
              <Box
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "gray",
                }}
              />
            }
          >
            <List.Item p={2}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  router.push("/offers/editor?version=1");
                }}
              >
                <HStack
                  space={4}
                  style={{
                    flex: 1,
                  }}
                >
                  <Text fontWeight={900} fontSize={"5xl"}>
                    v1
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    Der erste jemals entwickelte Editor von CodeUp. Er bietet
                    eine einfache ujnd schnelle Möglichkeit, simple
                    Frontend-Projekte zu erstellen. Du kannst hier HTML, CSS
                    (alternativ SASS oder SCSS) und JavaScript (alternativ
                    TypeScript) verwenden. Solltest du kein
                    &quot;klassisches&quot; Frontend-Projekt erstellen wollen,
                    kannst du ebenfalls InCode verwenden! Ebenfalls ist das
                    veröffentlichen deines Projektes möglich!
                  </Text>
                </HStack>
              </TouchableOpacity>
            </List.Item>
            <List.Item p={2}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  router.push("/offers/editor?version=2");
                }}
              >
                <HStack space={4}>
                  <Text fontWeight={900} fontSize={"5xl"}>
                    v2
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    Der zweite Editor bietet einen weit größeren
                    Funktionsumfang. Dazu zählen unter anderem die Möglichkeit,
                    Backend-Projekte zu erstellen, in Echtzeit mit anderen
                    Nutzern zu arbeiten und die Möglichkeit, statische Dateien
                    zu hosten. Auch die Veröffentlichung deines Projektes ist
                    inklusive des Backends möglich!
                  </Text>
                </HStack>
              </TouchableOpacity>
            </List.Item>
            <List.Item p={2}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flex: 1,
                }}
                onPress={() => {
                  router.push("/offers/editor?version=3");
                }}
              >
                <HStack space={4}>
                  <Text fontWeight={900} fontSize={"5xl"}>
                    v3
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    Der fortschrittlichste Editor von CodeUp. Er bietet eine
                    Vielzahl an Funktionen, wie zum Beispiel eine integrierte
                    Planungsumgebung, Datenbanken, Lokalisierung (mehrsprachige
                    Projekte), Dokumentationen und vieles mehr. Hier kannst du
                    nicht nur statische Webseiten entwickeln, sondern auch
                    dynamische Webanwendungen oder reine Backend-Projekte mit
                    Node.js. Selbstverständlich ist auch hier die
                    Veröffentlichung deines Projektes möglich!
                  </Text>
                </HStack>
              </TouchableOpacity>
            </List.Item>
          </List>
        </Box>
      </ScrollView>
    </>
  );
}
