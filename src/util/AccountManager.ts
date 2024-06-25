/**
 * src/util/AccountManager.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 25.06.2024
 *
 */

export class AccountManager {
  public static token: string | null;

  public static setToken(token: string) {
    AccountManager.token = token;
  }

  public static getToken() {
    return AccountManager.token;
  }

  public static isLoggedIn() {
    return AccountManager.token !== null;
  }
}
