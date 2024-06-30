/**
 * app/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */

import * as React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  ScrollView,
  SimpleGrid,
  Text,
  View,
} from "native-base";
import { router, useNavigation } from "expo-router";
import HomeCard from "@/src/components/HomeCard";
import { Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import HomeMyCourses from "@/src/components/HomeMyCourses";

export default function Index() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerTitle: "CodeUp",
  });

  return (
    <>
      <ScrollView minHeight={Dimensions.get("window").height}>
        <Box p={8} pb={24}>
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            mb={4}
            color={"brand.500"}
          >
            Angebote
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
                title={"Ideen"}
                icon={
                  <FontAwesome6 name="lightbulb" size={58} color="#F7DE1F" />
                }
                href={"/offers/ideas"}
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
          <TouchableOpacity
            onPress={() => {
              router.push("/offers");
            }}
          >
            <HStack space={2} pt={4} alignItems={"center"}>
              <Text fontSize={16} color={"brand.500"}>
                Alle Angebote
              </Text>
              <FontAwesome6 name="chevron-right" size={14} color="#F7DE1F" />
            </HStack>
          </TouchableOpacity>
          <HomeMyCourses />
        </Box>
      </ScrollView>
    </>
  );
}
