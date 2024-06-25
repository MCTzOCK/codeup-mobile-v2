/**
 * src/components/popups/ConfirmPopupComponent.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

import * as React from "react";
import { Button, HStack, Text } from "native-base";

export default function ConfirmPopupComponent(props: {
  onClose: () => void;
  onConfirm: () => void;
  content: string | React.ReactNode;
}) {
  return (
    <>
      {typeof props.content === "string" ? (
        <>
          <Text>{props.content}</Text>
        </>
      ) : (
        <>{props.content}</>
      )}
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
              props.onConfirm();
            }}
          >
            Bestätigen
          </Button>
        </Button.Group>
      </HStack>
    </>
  );
}
