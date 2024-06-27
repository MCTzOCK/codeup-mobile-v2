/**
 * src/util/productTypes.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.06.2024
 *
 */
export interface Course {
  __v: number;
  _id: string;
  available: string;
  contentPositions: string[];
  createdAt: string;
  creator: string;
  description: string;
  friendlyName: string;
  name: string;
  splashImage: string;
}
