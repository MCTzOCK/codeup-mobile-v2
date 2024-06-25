/**
 * src/components/popups/SelectPopupComponent.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */
import * as React from "react";
import { Button, HStack, Radio, Select, Text } from "native-base";

export default function SelectPopupComponent(props: {
  onClose: () => void;
  callback: (v: string) => void;
  choices: {
    value: string;
    label: string;
  }[];
  content: string | React.ReactNode;
}) {
  const [selected, setSelected] = React.useState<string>("");

  return (
    <>
      {typeof props.content === "string" ? (
        <>
          <Text>{props.content}</Text>
        </>
      ) : (
        <>{props.content}</>
      )}
      <Radio.Group
        name={"selectPopupRadioGroup"}
        accessibilityLabel={"Select something"}
        value={selected}
        onChange={(v) => {
          setSelected(v);
        }}
        colorScheme={"brand"}
      >
        {props.choices.map((c) => {
          return (
            <Radio value={c.value} my={2} colorScheme={"brand"}>
              {c.label}
            </Radio>
          );
        })}
      </Radio.Group>
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
              props.callback(selected || "");
            }}
          >
            OK
          </Button>
        </Button.Group>
      </HStack>
    </>
  );
}
