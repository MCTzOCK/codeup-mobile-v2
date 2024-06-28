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

export interface CourseSection {
  _id: string;
  displayName: string;
  course: string;
  url: string;
  type: string;
  contentType: string;
  textContent: string;
  videoUrl: string;
  creator: string;
  createdAt: string;
  quiz: {
    question: string;
    answers: {
      answer: string;
      correct: boolean;
      _id: string;
    }[];
    _id: string;
  }[];
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  authorUsername: string;
  published_at: string;
  tags: string[];
  __v: number;
}
