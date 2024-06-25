/**
 * src/components/FormField.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

import * as React from "react";
import { FormControl, Input, Stack } from "native-base";

export default function FormField(props: {
  label: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  helperText: string;
}) {
  return (
    <>
      <FormControl isRequired>
        <Stack>
          <FormControl.Label>{props.label}</FormControl.Label>
          <Input
            type={props.type}
            placeholder={props.placeholder}
            colorScheme={"brand"}
            _focus={{
              borderColor: "brand.500",
              backgroundColor: "transparent",
            }}
            value={props.value}
            onChangeText={props.onChangeText}
            size={"lg"}
          />
          <FormControl.HelperText>{props.helperText}</FormControl.HelperText>
        </Stack>
      </FormControl>
    </>
  );
}
