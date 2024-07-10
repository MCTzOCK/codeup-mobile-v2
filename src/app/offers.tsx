/**
 * src/app/offers.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 26.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { Box, Heading, HStack, ScrollView, Text, View } from "native-base";
import HomeCard from "@/src/components/HomeCard";
import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function Offers() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerTitle: "Angebote",
  });

  return (
    <>
      <ScrollView>
        <Box p={8}>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            color={"brand.500"}
          >
            Lernen
          </Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            h={200}
          >
            <View
              flex={1}
              style={{
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10,
                flexDirection: "row",
              }}
              maxW={"100%"}
            >
              <HomeCard
                title={"Kurse"}
                icon={
                  <FontAwesome6 name="book-open" size={58} color="#F7DE1F" />
                }
                href={"/offers/courses"}
              />
              <HomeCard
                title={"Zertifikate"}
                icon={
                  <FontAwesome6 name="certificate" size={58} color="#F7DE1F" />
                }
                href={"/offers/certificates"}
              />
              <HomeCard
                title={"Challenges"}
                icon={<FontAwesome6 name="trophy" size={58} color="#F7DE1F" />}
                href={"/offers/challenges"}
              />
            </View>
          </ScrollView>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            mt={4}
            color={"brand.500"}
          >
            Entwickeln
          </Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            h={200}
          >
            <View
              flex={1}
              style={{
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10,
                flexDirection: "row",
              }}
              maxW={"100%"}
            >
              <HomeCard
                title={"Ideen"}
                icon={
                  <FontAwesome6 name="lightbulb" size={58} color="#F7DE1F" />
                }
                href={"/offers/ideas"}
              />
              <HomeCard
                title={"Kids"}
                icon={
                  <FontAwesome6
                    name="child-reaching"
                    size={58}
                    color="#F7DE1F"
                  />
                }
                href={"/offers/codeup-kids"}
              />
              <HomeCard
                title={"Snippets"}
                icon={
                  <FontAwesome6 name="file-code" size={58} color="#F7DE1F" />
                }
                href={"/offers/snippets"}
              />
              <HomeCard
                title={"Editor"}
                icon={<FontAwesome6 name="code" size={58} color="#F7DE1F" />}
                href={"/offers/editor-selection"}
              />
            </View>
          </ScrollView>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            mt={4}
            color={"brand.500"}
          >
            Austauschen
          </Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            h={200}
          >
            <View
              flex={1}
              style={{
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10,
                flexDirection: "row",
              }}
              maxW={"100%"}
            >
              <HomeCard
                title={"Forum"}
                icon={<FontAwesome6 name="comment" size={58} color="#F7DE1F" />}
                href={"/offers/forum"}
              />
              <HomeCard
                title={"Discovery"}
                icon={<FontAwesome6 name="cube" size={58} color="#F7DE1F" />}
                href={"/offers/discovery"}
              />
            </View>
          </ScrollView>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            mt={4}
            color={"brand.500"}
          >
            Planen
          </Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            h={200}
          >
            <View
              flex={1}
              style={{
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10,
                flexDirection: "row",
              }}
              maxW={"100%"}
            >
              <HomeCard
                title={"Tasks"}
                icon={
                  <FontAwesome6 name="check-square" size={58} color="#F7DE1F" />
                }
                href={"/offers/tasks"}
              />
              <HomeCard
                title={"Flows"}
                icon={
                  <FontAwesome6
                    name="diagram-project"
                    size={58}
                    color="#F7DE1F"
                  />
                }
                href={"/offers/flows"}
              />
            </View>
          </ScrollView>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            mt={4}
            color={"brand.500"}
          >
            Anderes
          </Heading>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            h={200}
          >
            <View
              flex={1}
              style={{
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 10,
                flexDirection: "row",
              }}
              maxW={"100%"}
            >
              <HomeCard
                title={"Blog"}
                icon={
                  <FontAwesome6 name="newspaper" size={58} color="#F7DE1F" />
                }
                href={"/codeup/blog"}
              />
              <HomeCard
                title={"Kontakt"}
                icon={
                  <FontAwesome6 name="address-card" size={58} color="#F7DE1F" />
                }
                href={"/codeup/contact"}
              />
              <HomeCard
                title={"Impressum"}
                icon={<FontAwesome6 name="section" size={58} color="#F7DE1F" />}
                href={"/codeup/imprint"}
              />
              <HomeCard
                title={"Datenschutz"}
                icon={<FontAwesome6 name="section" size={58} color="#F7DE1F" />}
                href={"/codeup/privacy"}
              />
            </View>
          </ScrollView>
        </Box>
      </ScrollView>
    </>
  );
}
