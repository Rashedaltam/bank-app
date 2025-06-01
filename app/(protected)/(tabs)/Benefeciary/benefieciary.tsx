import AllUsersList from "@/components/AllUsersList";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const benefieciary = () => {
  return (
    <View>
      <Text style={styles.title}>Benefieciary List</Text>
      <AllUsersList />
    </View>
  );
};

export default benefieciary;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
    backgroundColor: "#121212",
    paddingVertical: 10,
  },
});
