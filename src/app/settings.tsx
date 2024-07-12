/**
 * src/app/settings.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { useLoggedIn } from "@/src/hooks/useLoggedIn";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { Image } from "expo-image";
import Loader from "@/src/components/Loader";
import FormField from "@/src/components/FormField";
import { useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import REST from "@codeupspace/rest";
import { AccountManager } from "@/src/util/AccountManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import PopupManager from "@/src/util/PopupManager";

export default function Settings() {
  useNavigation().setOptions({
    headerTitle: "Einstellungen",
  });

  const { userInfo } = useLoggedIn();

  const [firstName, setFirstName] = React.useState<string>(userInfo.firstName);
  const [lastName, setLastName] = React.useState<string>(userInfo.lastName);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
    }
  }, [userInfo]);

  const update = async (o: { keyName: string; keyValue: string }) => {
    const res = await REST.Account.update({
      token: window.authToken as string,
      keyValue: o.keyValue,
      keyName: o.keyName,
    });

    if (!res.payload.success) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Es ist ein Fehler aufgetreten: " + res.payload.error,
      });
      return;
    }

    const t = res.payload.newToken;

    AccountManager.setToken(t);
    await AsyncStorage.setItem("token", t);
    window.authToken = t;
    router.replace("settings");
  };

  if (!userInfo) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView>
        <Box p={6}>
          <Box
            flex={1}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            style={{
              gap: 20,
            }}
          >
            <Image
              source={{
                uri: `https://codeup.space/api/account/${userInfo.username}/picture`,
              }}
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#27272a",
                borderRadius: 20,
              }}
            />
            <Heading
              size={"lg"}
              fontWeight={900}
              letterSpacing={1.5}
              mb={4}
              color={"brand.500"}
            >
              {userInfo.firstName + " " + userInfo.lastName}
            </Heading>
          </Box>
          <Box
            flex={1}
            p={6}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            style={{
              gap: 20,
            }}
          >
            <HStack space={4} alignItems={"center"}>
              <FormField
                label={"Vorname"}
                type={"text"}
                placeholder={"Vorname"}
                value={firstName}
                onChangeText={setFirstName}
                helperText={"Dein Vorname"}
              />
              <IconButton
                icon={<FontAwesome6 name={"save"} size={24} />}
                colorScheme={"brand"}
                variant={"solid"}
                onPress={async () => {
                  await update({
                    keyName: "firstName",
                    keyValue: firstName,
                  });
                }}
              />
            </HStack>
            <HStack space={4} alignItems={"center"}>
              <FormField
                label={"Nachname"}
                type={"text"}
                placeholder={"Nachname"}
                value={lastName}
                onChangeText={setLastName}
                helperText={"Dein Nachname"}
              />
              <IconButton
                icon={<FontAwesome6 name={"save"} size={24} />}
                colorScheme={"brand"}
                variant={"solid"}
                onPress={async () => {
                  await update({
                    keyName: "lastName",
                    keyValue: lastName,
                  });
                }}
              />
            </HStack>
            <Button
              colorScheme={"red"}
              leftIcon={<FontAwesome6 name={"right-from-bracket"} size={24} />}
              onPress={async () => {
                if (
                  !(await window.PopupManager.confirmAsync({
                    title: "Abmelden?",
                    message: "Willst du dich wirklich abmelden?",
                  }))
                )
                  return;

                await AccountManager.setToken("");
                await AsyncStorage.setItem("token", "");
                window.authToken = "";
                router.replace("");
              }}
            >
              Abmelden
            </Button>
            <Text fontSize={"lg"}>
              Für weitere Einstellungen, verwende bitte unsere Webseite unter{" "}
              <Pressable
                onPress={() => {
                  Linking.openURL("https://codeup.space/account/settings");
                }}
              >
                <Text color={"brand.500"}>https://codeup.space</Text>
              </Pressable>
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
