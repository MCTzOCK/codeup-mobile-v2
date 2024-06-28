/**
 * src/app/codeup/blog.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2024 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 28.06.2024
 *
 */

import * as React from "react";
import { router, useNavigation } from "expo-router";
import { Blog, Course } from "@/src/util/productTypes";
import REST from "@codeupspace/rest";
import Loader from "@/src/components/Loader";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { defined_colors } from "@/src/constants/colors";
import { Image } from "expo-image";

export default function Blogs() {
  useNavigation().setOptions({
    headerTitle: "Blog",
  });

  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [query, setQuery] = React.useState<string>("");

  React.useEffect(() => {
    reloadBlogs();
  }, []);

  const reloadBlogs = async () => {
    const res = await REST.Blog.getBlogsB();

    if (res.status !== 200) {
      await window.PopupManager.alertAsync({
        title: "Fehler",
        message: "Die Blogs konnten nicht geladen werden: " + res.payload.error,
      });
      return;
    }

    setBlogs(res.payload.blogs);
  };

  if (!blogs || blogs.length === 0) return <Loader />;

  return (
    <>
      <Box p={6} flex={1}>
        <HStack justifyContent={"space-between"} p={2.5}>
          <Input
            placeholder={"Suche..."}
            flex={1}
            size={"lg"}
            onChangeText={(t) => setQuery(t)}
            value={query}
            colorScheme={"brand"}
            _focus={{
              borderColor: "brand.500",
              backgroundColor: "transparent",
            }}
          />
        </HStack>
        <FlatList
          data={
            query.length > 0
              ? blogs.filter((c) =>
                  c.title.toLowerCase().includes(query.toLowerCase()),
                )
              : blogs
          }
          numColumns={Dimensions.get("window").width > 600 ? 2 : 1}
          style={{
            gap: 10,
          }}
          renderItem={(i) => {
            return (
              <>
                <Card blog={i.item} />
              </>
            );
          }}
        />
      </Box>
    </>
  );
}

const Card = (props: { blog: Blog }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        minHeight: 350,
        flex: 1,
        minWidth: 300,
        margin: 10,
      }}
      onPress={() => {
        router.push(`/codeup/blog/${props.blog._id}`);
      }}
    >
      <Box rounded={"md"} h={250} bg={defined_colors.card}>
        <VStack
          flex={1}
          alignItems={"center"}
          justifyContent={"space-around"}
          p={2}
        >
          <Heading
            size={"xl"}
            fontWeight={900}
            letterSpacing={1.5}
            color={"brand.500"}
            textAlign={"center"}
          >
            {props.blog.title}
          </Heading>
          <Text textAlign={"center"}>
            {props.blog.content.substring(0, 100)}...
          </Text>
          <Text textAlign={"center"}>
            von <Text color={"brand.500"}>@{props.blog.authorUsername}</Text>
          </Text>
          <Text textAlign={"center"}>
            {new Date(props.blog.published_at).toLocaleDateString()}
          </Text>
          <HStack space={4}>
            {props.blog.tags.map((t) => {
              return (
                <Text
                  color={"brand.500"}
                  borderWidth={1}
                  borderColor={"brand.500"}
                  p={1.5}
                  rounded={"lg"}
                >
                  {t}
                </Text>
              );
            })}
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};
