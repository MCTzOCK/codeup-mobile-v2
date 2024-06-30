import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import {
  Box,
  extendTheme,
  Heading,
  KeyboardAvoidingView,
  NativeBaseProvider,
  Pressable,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { theme } from "../constants/theme";
import { RESTAPI } from "@codeupspace/rest/src/makeRequest";
import { SafeAreaView, StatusBar } from "react-native";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountManager } from "@/src/util/AccountManager";
import LoginComponent from "@/src/components/LoginComponent";
import PopupManager from "@/src/util/PopupManager";
import { useLoggedIn } from "@/src/hooks/useLoggedIn";
import Loader from "@/src/components/Loader";

RESTAPI.setPathPrefix("https://codeup.space");

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { loggedIn, loaded, userInfo } = useLoggedIn();

  return (
    <ThemeProvider value={DarkTheme}>
      <NativeBaseProvider
        theme={theme}
        config={{
          dependencies: {
            "linear-gradient": require("expo-linear-gradient").LinearGradient,
          },
        }}
      >
        <PopupManager />

        {!loaded ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {loggedIn ? (
              <>
                <Nav />
              </>
            ) : (
              <>
                <LoginComponent />
              </>
            )}
          </>
        )}
      </NativeBaseProvider>
    </ThemeProvider>
  );
}

const Nav = () => {
  return (
    <Stack
      screenOptions={{
        //animation: "slide_from_bottom",
        contentStyle: {
          backgroundColor: "#121212",
        },
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerShadowVisible: false,
        ...headerStyle,
        headerRight: () => (
          <Box mr={2}>
            <Pressable
              onPress={async () => {
                router.push("settings");
              }}
            >
              <FontAwesome6 name="gear" size={24} color="#F7DE1F" />
            </Pressable>
          </Box>
        ),
      }}
    >
      {[
        "index",
        "settings",
        "offers",
        "offers/courses",
        "offers/courses/[name]",
        "offers/ideas",
        "offers/courses/[name]/[id]",
        "offers/discovery",
        "offers/flows",
        "offers/flows/[id]",
        "offers/forum",
        "offers/codeup-kids",
        "offers/editor-selection",
        "codeup/imprint",
        "codeup/privacy",
        "codeup/blog",
        "codeup/blog/[id]",
        "codeup/contact",
      ].map((p) => {
        return <Stack.Screen name={p} />;
      })}
    </Stack>
  );
};

const headerStyle: any = {
  headerTintColor: "#F7DE1F",
  headerTitleStyle: {
    color: "#F7DE1F",
    fontWeight: "900",
    fontSize: 28,
  },
};
