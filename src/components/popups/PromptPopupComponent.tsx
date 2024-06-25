/**
 * src/components/popups/PromptPopupComponent.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

import * as React from "react";
import { Button, HStack, Stack, Text } from "native-base";
import FormField from "@/src/components/FormField";

export default function PromptPopupComponent(props: {
  onClose: () => void;
  callback: (v: string) => void;
  label: string;
  helperText: string;
}) {
  const [input, setInput] = React.useState<string>("");

  return (
    <>
      <FormField
        label={props.label}
        type={"text"}
        placeholder={props.label}
        value={input}
        onChangeText={(v) => {
          setInput(v);
        }}
        helperText={props.helperText}
      />
      <HStack alignItems={"center"} justifyContent={"flex-end"}>
        <Button.Group>
          <Button
            colorScheme={"red"}
            variant={"ghost"}
            size={"md"}
            _text={{
              color: "red.500",
            }}
            onPress={() => {
              props.onClose();
            }}
          >
            Abbrechen
          </Button>
          <Button
            colorScheme={"brand"}
            size={"md"}
            onPress={() => {
              props.onClose();
              if (input !== "") {
                props.callback(input);
              }
            }}
          >
            OK
          </Button>
        </Button.Group>
      </HStack>
    </>
  );
}
