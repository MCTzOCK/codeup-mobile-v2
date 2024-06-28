/**
 * src/app/codeup/contact.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { useNavigation } from "expo-router";
import { Box, Button, FormControl, Radio } from "native-base";
import FormField from "@/src/components/FormField";
import REST from "@codeupspace/rest";

export default function Contact() {
  useNavigation().setOptions({
    headerTitle: "Kontakt",
  });

  const [category, setCategory] = React.useState<
    "sonstiges" | "fehler" | "feature" | "creator"
  >("sonstiges");
  const [title, setTitle] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  return (
    <Box p={6}>
      <FormControl isRequired>
        <FormControl.Label>Kategorie</FormControl.Label>
        <Radio.Group
          colorScheme={"brand"}
          name={"category"}
          value={category}
          onChange={(c) => {
            setCategory(c as any);
          }}
        >
          <Radio value="sonstiges" my={2}>
            Sonstiges
          </Radio>
          <Radio value="fehler" my={2}>
            Fehler
          </Radio>
          <Radio value="feature" my={2}>
            Feature
          </Radio>
          <Radio value="creator" my={2}>
            Creator
          </Radio>
        </Radio.Group>
      </FormControl>
      <FormField
        label={"Titel"}
        type={"text"}
        placeholder={"Titel"}
        value={title}
        onChangeText={setTitle}
        helperText={"Gib den Titel für deine Kontaktanfrage ein!"}
      />
      <FormField
        label={"Nachricht"}
        type={"text"}
        placeholder={"Nachricht"}
        value={message}
        onChangeText={setMessage}
        helperText={"Gib deine Nachricht ein!"}
      />
      <Button
        onPress={async () => {
          if (!title || !message) {
            await window.PopupManager.alertAsync({
              title: "Fehler",
              message: "Bitte fülle alle Felder aus!",
            });
            return;
          }

          const res = await REST.Util.makeRequest({
            token: window.authToken as string,
            method: "POST",
            path: "/api/contact",
            body: {
              category,
              title,
              message,
            },
          });

          if (res.status !== 200) {
            await window.PopupManager.alertAsync({
              title: "Fehler",
              message:
                "Deine Nachricht konnte nicht gesendet werden: " +
                res.payload.error,
            });
            return;
          }

          setTitle("");
          setMessage("");
          await window.PopupManager.alertAsync({
            title: "Erfolg",
            message: "Deine Nachricht wurde erfolgreich gesendet!",
          });
        }}
        colorScheme={"brand"}
        mt={4}
      >
        Absenden
      </Button>
    </Box>
  );
}
