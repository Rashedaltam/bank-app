import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "transparent",
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Benefeciary") {
            iconName = focused ? "swap-horizontal" : "swap-horizontal-outline";
          }

          return (
            <Ionicons
              name={iconName as any}
              size={size}
              color={focused ? "#ffffff" : color}
              style={
                focused
                  ? {
                      textShadowColor: "#ffffff",
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 10,
                    }
                  : {}
              }
            />
          );
        },
      })}
    />
  );
};

export default _layout;
