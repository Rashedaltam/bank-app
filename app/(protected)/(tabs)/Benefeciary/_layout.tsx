import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BenLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      {/* Ensures light text/icons on dark background */}
      <StatusBar style="light" backgroundColor="#121212" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default BenLayout;
const styles = StyleSheet.create({});
