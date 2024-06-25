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

  const initStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        AccountManager.setToken(token);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <NativeBaseProvider theme={theme}>
        <PopupManager />

        {!loaded ? (
          <>
            <View
              flex={1}
              bg={"#121212"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <VStack space={4} justifyContent={"center"} alignItems={"center"}>
                <Spinner
                  accessibilityLabel={"Loading"}
                  color={"brand.500"}
                  size={"lg"}
                />
              </VStack>
            </View>
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
                //                router.push("/settings");
                await AsyncStorage.removeItem("token");
              }}
            >
              <FontAwesome6 name="gear" size={24} color="#F7DE1F" />
            </Pressable>
          </Box>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "CodeUp",
        }}
      />
      <Stack.Screen
        name="test/index"
        options={{
          headerTitle: "Test Page",
        }}
      />
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
