/**
 * constants/theme.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 24.06.2024
 *
 */
import { extendTheme } from "native-base";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      "100": "#FEFCD7",
      "200": "#F7F4B0",
      "300": "#F0EC89",
      "400": "#E9E462",
      "500": "#F7DE1F",
      "600": "#D8C31A",
      "700": "#B9A916",
      "800": "#9B8B11",
      "900": "#7C6E0C",
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "lg",
        _text: {
          fontWeight: 800,
        },
      },
      defaultProps: {
        size: "lg",
      },
      sizes: {
        lg: {
          _text: {
            fontSize: "lg",
          },
        },
      },
    },
  },
});
