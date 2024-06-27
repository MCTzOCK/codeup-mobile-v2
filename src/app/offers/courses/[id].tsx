/**
 * src/app/offers/courses/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 27.06.2024
 *
 */

import * as React from "react";
import REST from "@codeupspace/rest";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Course } from "@/src/util/productTypes";
import { useEffect } from "react";
import { AccountManager } from "@/src/util/AccountManager";
import { Button } from "native-base";

export default function ID() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [course, setCourse] = React.useState<Course | null>(null);

  useEffect(() => {
    if (!id) return;
    reloadCourse();
  }, [id]);

  const reloadCourse = async () => {
    const res = await REST.Course.getCourse({
      token: AccountManager.getToken() as string,
      course: id as string,
    });

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Der Kurs konnte nicht geladen werden: " + res.payload.error,
      });
    } else {
      setCourse(res.payload.course);

      navigation.setOptions({
        headerTitle: (res.payload.course as Course).name,
      });
    }
  };

  return <></>;
}
