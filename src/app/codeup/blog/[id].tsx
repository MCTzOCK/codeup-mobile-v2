/**
 * src/app/codeup/blog/[id].tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import { Blog } from "@/src/util/productTypes";
import REST from "@codeupspace/rest";
import Loader from "@/src/components/Loader";
import { Box, ScrollView } from "native-base";
import Markdown from "react-native-markdown-display";

export default function BlogViewer() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const n = useNavigation();

  const [blog, setBlog] = useState<Blog | null>(null);

  React.useEffect(() => {
    if (!id) return;
    reloadBlog();
  }, [id]);

  const reloadBlog = async () => {
    const res = await REST.Blog.getBlog(id as string);

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Der Blog konnte nicht geladen werden: " + res.payload.error,
      });
    }
    n.setOptions({
      headerTitle: res.payload.blog.title,
    });

    setBlog(res.payload.blog);
  };

  if (!blog) return <Loader />;

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Box p={6}>
          <Markdown
            style={{
              fence: {
                backgroundColor: "#333",
                borderWidth: 0,
              },
              body: {
                color: "#FFFFFF",
              },
              link: {
                color: "#F7DE1F",
              },
              code_inline: {
                backgroundColor: "#333",
              },
              heading1: {
                fontWeight: 900,
                color: "#F7DE1F",
              },
              heading2: {
                fontWeight: 700,
                color: "#F7DE1F",
              },
              heading3: {
                fontWeight: 500,
                color: "#F7DE1F",
              },
            }}
          >
            {blog.content.replace(/`/g, "`")}
          </Markdown>
        </Box>
      </ScrollView>
    </>
  );
}
