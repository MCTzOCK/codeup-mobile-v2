/**
 * src/components/LoginComponent.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

import * as React from "react";
import {
  Box,
  FormControl,
  Heading,
  ScrollView,
  VStack,
  Stack,
  Input,
  Button,
  Text,
  Pressable,
  HStack,
  useToast,
  Center,
} from "native-base";
import FormField from "@/src/components/FormField";

export default function LoginComponent() {
  const [action, setAction] = React.useState<"login" | "register">("login");

  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [registerUsername, setRegisterUsername] = React.useState("");
  const [registerFirstname, setRegisterFirstname] = React.useState("");
  const [registerLastname, setRegisterLastname] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerPasswordRepeat, setRegisterPasswordRepeat] =
    React.useState("");

  const toast = useToast();

  return (
    <>
      <ScrollView
        flex={1}
        contentContainerStyle={{
          alignItems: "center",
        }}
        bg={"#121212"}
      >
        <Box pt={16}></Box>
        <Box rounded={"lg"} p={4} bg={"black"} minW={"2/3"} maxW={"3/4"}>
          {action === "login" ? (
            <>
              <Heading color={"brand.500"} size={"lg"} fontWeight={900}>
                Anmelden
              </Heading>
              <VStack space={4}>
                <FormField
                  value={loginUsername}
                  onChangeText={setLoginUsername}
                  helperText={"Bitte gib deinen Benutzernamen ein."}
                  label={"Benutzername"}
                  placeholder={"Benutzername"}
                  type={"text"}
                />
                <FormField
                  value={loginPassword}
                  onChangeText={setLoginPassword}
                  helperText={"Bitte gib dein Passwort ein."}
                  label={"Passwort"}
                  placeholder={"Passwort"}
                  type={"password"}
                />
                <Button
                  colorScheme={"brand"}
                  size={"md"}
                  onPress={async () => {
                    const x = await window.PopupManager.selectAsync({
                      title: "Select",
                      message: "Select an item",
                      choices: [
                        {
                          value: "1",
                          label: "Item 1",
                        },
                        {
                          value: "2",
                          label: "Item 2",
                        },
                      ],
                    });

                    console.log(x);
                  }}
                >
                  Anmelden
                </Button>
                <Text>
                  Du hast noch keinen Account?{" "}
                  <Pressable
                    onPress={() => {
                      setAction("register");
                    }}
                  >
                    <Text color={"brand.500"}>Dann erstelle einen!</Text>
                  </Pressable>
                </Text>
              </VStack>
            </>
          ) : (
            <>
              <Heading color={"brand.500"} size={"lg"} fontWeight={900}>
                Registrieren
              </Heading>
              <VStack space={4}>
                <FormField
                  value={registerUsername}
                  onChangeText={setRegisterUsername}
                  helperText={"Bitte gib deinen Benutzernamen ein."}
                  label={"Benutzername"}
                  placeholder={"Benutzername"}
                  type={"text"}
                />
                <FormField
                  value={registerFirstname}
                  onChangeText={setRegisterFirstname}
                  helperText={"Bitte gib deinen Vornamen ein."}
                  label={"Vorname"}
                  placeholder={"Vorname"}
                  type={"text"}
                />
                <FormField
                  value={registerLastname}
                  onChangeText={setRegisterLastname}
                  helperText={"Bitte gib deinen Nachnamen ein."}
                  label={"Nachname"}
                  placeholder={"Nachname"}
                  type={"text"}
                />
                <FormField
                  value={registerEmail}
                  onChangeText={setRegisterEmail}
                  helperText={"Bitte gib deine E-Mail Adresse ein."}
                  label={"E-Mail Adresse"}
                  placeholder={"E-Mail Adresse"}
                  type={"text"}
                />
                <FormField
                  value={registerPassword}
                  onChangeText={setRegisterPassword}
                  helperText={"Bitte gib dein Passwort ein."}
                  label={"Passwort"}
                  placeholder={"Passwort"}
                  type={"password"}
                />
                <FormField
                  value={registerPasswordRepeat}
                  onChangeText={setRegisterPasswordRepeat}
                  helperText={"Bitte wiederhole dein Passwort."}
                  label={"Passwort wiederholen"}
                  placeholder={"Passwort wiederholen"}
                  type={"password"}
                />
                <Button
                  colorScheme={"brand"}
                  size={"md"}
                  onPress={async () => {}}
                >
                  Registrieren
                </Button>
                <Text>
                  Du hast schon einen Account?{" "}
                  <Pressable
                    onPress={() => {
                      setAction("login");
                    }}
                  >
                    <Text color={"brand.500"}>Dann melde dich an!</Text>
                  </Pressable>
                </Text>
              </VStack>
            </>
          )}
        </Box>
        <Box pb={16}></Box>
      </ScrollView>
    </>
  );
}
