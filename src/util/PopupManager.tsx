/**
 * src/util/PopupManager.tsx
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
  Button,
  Heading,
  HStack,
  KeyboardAvoidingView,
  Stack,
  Text,
  View,
  ZStack,
} from "native-base";
import AlertPopupComponent from "@/src/components/popups/AlertPopupComponent";
import PromptPopupComponent from "@/src/components/popups/PromptPopupComponent";
import ConfirmPopupComponent from "@/src/components/popups/ConfirmPopupComponent";
import SelectPopupComponent from "@/src/components/popups/SelectPopupComponent";

export default function PopupManager() {
  const [visible, setVisible] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState<string>("Alert");

  const [popupComponent, setPopupComponent] = React.useState<React.ReactNode>(
    <></>,
  );

  const alertAsync = async (options: {
    title: string;
    message: string | React.ReactNode;
  }): Promise<void> => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      setPopupTitle(options.title);
      setPopupComponent(
        <>
          <AlertPopupComponent
            onClose={() => {
              setVisible(false);
              setPopupComponent(<></>);
              setPopupTitle("Alert");
            }}
            callback={() => {
              resolve();
            }}
            content={options.message}
          />
        </>,
      );
    });
  };

  const promptAsync = async (options: {
    title: string;
    label: string;
    helperText: string;
  }): Promise<string> => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      setPopupTitle(options.title);
      setPopupComponent(
        <>
          <PromptPopupComponent
            onClose={() => {
              setVisible(false);
              setPopupComponent(<></>);
              setPopupTitle("Alert");
            }}
            callback={(v: string) => {
              resolve(v);
            }}
            label={options.label}
            helperText={options.helperText}
          />
        </>,
      );
    });
  };

  const confirmAsync = async (options: {
    title: string;
    message: string | React.ReactNode;
  }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      setPopupTitle(options.title);
      setPopupComponent(
        <>
          <ConfirmPopupComponent
            onClose={() => {
              setVisible(false);
              setPopupComponent(<></>);
              setPopupTitle("Alert");
            }}
            onConfirm={() => {
              resolve(true);
            }}
            content={options.message}
          />
        </>,
      );
    });
  };

  const selectAsync = async (options: {
    title: string;
    message: string | React.ReactNode;
    choices: {
      value: string;
      label: string;
    }[];
  }): Promise<string> => {
    return new Promise((resolve, reject) => {
      setVisible(true);
      setPopupTitle(options.title);
      setPopupComponent(
        <>
          <SelectPopupComponent
            onClose={() => {
              setVisible(false);
              setPopupComponent(<></>);
              setPopupTitle("Alert");
            }}
            callback={(v: string) => {
              resolve(v);
            }}
            choices={options.choices}
            content={options.message}
          />
        </>,
      );
    });
  };

  const removeCurrentPopup = () => {
    setVisible(false);
    setPopupComponent(<></>);
    setPopupTitle("Alert");
  };

  window.PopupManager = {
    alertAsync,
    removeCurrentPopup,
    promptAsync,
    confirmAsync,
    selectAsync,
  };

  return (
    <>
      <View
        zIndex={889}
        position={"absolute"}
        w={"100%"}
        h={"100%"}
        display={visible ? "flex" : "none"}
      >
        <ZStack
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box w={"100%"} h={"100%"} backgroundColor={"rgba(0,0,0,0.5)"}></Box>
          <KeyboardAvoidingView behavior={"padding"} w={"100%"}>
            <Box
              w={"100%"}
              h={"90%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box rounded={"md"} bg={"gray.800"} p={4} minW={"2/6"}>
                <Stack space={4}>
                  <Heading color={"brand.500"} size={"md"}>
                    {popupTitle}
                  </Heading>
                  {popupComponent}
                </Stack>
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </ZStack>
      </View>
    </>
  );
}
