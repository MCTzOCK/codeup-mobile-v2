/**
 * /index.d.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */
import * as React from "react";

declare global {
  interface Window {
    authToken: string | null;
    PopupManager: {
      alertAsync: (options: {
        title: string;
        message: string | React.ReactNode;
      }) => Promise<void>;
      removeCurrentPopup: () => void;
      promptAsync: (options: {
        title: string;
        label: string;
        helperText: string;
      }) => Promise<string>;
      confirmAsync: (options: {
        title: string;
        message: string | React.ReactNode;
      }) => Promise<boolean>;
      selectAsync: (options: {
        title: string;
        message: string | React.ReactNode;
        choices: {
          value: string;
          label: string;
        }[];
      }) => Promise<string>;
    };
  }
}

export {};
