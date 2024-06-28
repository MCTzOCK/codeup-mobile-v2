/**
 * src/hooks/useLoggedIn.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

import REST from "@codeupspace/rest";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountManager } from "@/src/util/AccountManager";

export function useLoggedIn(): {
  loggedIn: boolean;
  loaded: boolean;
  userInfo: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    _2fa: boolean;
    username: string;
    sso?: string | boolean;
    role: string;
    subscription?: string;
  };
} {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    _2fa: false,
    username: "",
    role: "user",
  });

  useEffect(() => {
    let token: string | null = null;
    const interval = setInterval(async () => {
      const newToken = await AsyncStorage.getItem("token");
      if (newToken !== null) {
        if (newToken !== token) {
          REST.Account.verify(newToken).then(async (res) => {
            if (res.status === 200) {
              if (res.payload.token) {
                await AsyncStorage.setItem("token", res.payload.token);
                window.authToken = res.payload.token;
                AccountManager.setToken(res.payload.token);

                const r = await REST.Account.verify(res.payload.token);

                if (r.status === 200) {
                  setLoggedIn(true);
                  setUserInfo(r.payload.data);
                } else {
                  setLoggedIn(false);
                }
                return;
              }

              token = newToken;
              window.authToken = token;
              setLoggedIn(true);
              setUserInfo(res.payload.data);
            } else {
              token = null;
              setLoggedIn(false);
              await AsyncStorage.removeItem("token");
            }
            setLoaded(true);
          });
        }
      } else {
        token = null;
        setLoggedIn(false);
        setLoaded(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    loggedIn,
    loaded,
    userInfo,
  };
}
