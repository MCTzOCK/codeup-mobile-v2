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
  KeyboardAvoidingView,
} from "native-base";
import FormField from "@/src/components/FormField";
import REST from "@codeupspace/rest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountManager } from "@/src/util/AccountManager";
import { router } from "expo-router";

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

  const [loading, setLoading] = React.useState(false);

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
                  isLoading={loading}
                  onPress={async () => {
                    setLoading(true);
                    if (!loginUsername || !loginPassword) {
                      window.PopupManager.alertAsync({
                        message: "Bitte fülle alle Felder aus!",
                        title: "Fehler",
                      });
                      return;
                    }

                    const res = await REST.Account.loginWithUsername({
                      username: loginUsername,
                      password: loginPassword,
                    });

                    if (res.status === 200) {
                      if (res.payload._2fa === true) {
                        const code = await window.PopupManager.promptAsync({
                          label: "2FA Code",
                          helperText: "Bitte gib deinen 2FA Code ein.",
                          title: "2FA",
                        });

                        if (!code) return;

                        const res2 = await REST.Account.loginWithUsername({
                          username: loginUsername,
                          password: loginPassword,
                          code,
                        });

                        if (res2.status !== 200) {
                          window.PopupManager.alertAsync({
                            message:
                              "Ein Fehler ist aufgetreten: " +
                              res2.payload.error,
                            title: "Fehler",
                          });
                          setLoading(false);
                        } else {
                          const token = res2.payload.token;
                          await AsyncStorage.setItem("token", token);
                          AccountManager.setToken(token);
                          setLoading(false);
                        }
                      } else {
                        const token = res.payload.token;
                        await AsyncStorage.setItem("token", token);
                        AccountManager.setToken(token);
                        setLoading(false);
                      }
                    } else {
                      window.PopupManager.alertAsync({
                        message:
                          "Ein Fehler ist aufgetreten: " + res.payload.error,
                        title: "Fehler",
                      });
                      setLoading(false);
                    }
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
                  isLoading={loading}
                  onPress={async () => {
                    setLoading(true);
                    if (
                      !registerUsername ||
                      !registerFirstname ||
                      !registerLastname ||
                      !registerEmail ||
                      !registerPassword ||
                      !registerPasswordRepeat
                    ) {
                      window.PopupManager.alertAsync({
                        message: "Bitte fülle alle Felder aus!",
                        title: "Fehler",
                      });
                      setLoading(false);
                      return;
                    }

                    if (
                      !registerEmail.match(
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
                      )
                    ) {
                      window.PopupManager.alertAsync({
                        message: "Bitte gib eine gültige E-Mail Adresse ein!",
                        title: "Fehler",
                      });
                      setLoading(false);
                      return;
                    }

                    if (registerPassword !== registerPasswordRepeat) {
                      window.PopupManager.alertAsync({
                        message: "Die Passwörter stimmen nicht überein!",
                        title: "Fehler",
                      });
                      setLoading(false);
                      return;
                    }

                    const res = await REST.Account.register({
                      username: registerUsername,
                      firstName: registerFirstname,
                      lastName: registerLastname,
                      email: registerEmail,
                      password: registerPassword,
                    });

                    if (res.status !== 200) {
                      window.PopupManager.alertAsync({
                        message:
                          "Ein Fehler ist aufgetreten: " + res.payload.error,
                        title: "Fehler",
                      });
                      setLoading(false);
                      return;
                    }

                    window.PopupManager.alertAsync({
                      message:
                        "Du hast dich erfolgreich registriert! Bitte bestätige deine E-Mail Adresse!",
                      title: "Erfolg",
                    });

                    setLoading(false);
                    setAction("login");
                  }}
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
        <Box pb={"300px"}></Box>
      </ScrollView>
    </>
  );
}
