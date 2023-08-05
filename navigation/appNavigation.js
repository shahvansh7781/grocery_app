import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useEffect, useState } from "react";
import { Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import OnBoarding from "../screens/OnBoarding";
import { getItem } from "../utils/asyncStorage";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    isOnBoarded();
  }, []);

  const isOnBoarded = async () => {
    let onboarded = await getItem("onboarded");

    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };
  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen
            name="OnBoarding"
            options={{ headerShown: false }}
            component={OnBoarding}
          ></Stack.Screen>
          {/* <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          ></Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="OnBoarding"
            options={{ headerShown: false }}
            component={OnBoarding}
          ></Stack.Screen>
          {/* <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          ></Stack.Screen> */}
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          ></Stack.Screen>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
