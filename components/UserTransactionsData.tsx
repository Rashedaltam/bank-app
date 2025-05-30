import { useUserProfileData } from "@/hooks/useUserProfileData";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserTransactionsData = () => {
  //
  const { data, isLoading, isError, error } = useUserProfileData();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error?.message}</Text>;
  if (!data) return <Text>No data found</Text>;

  // pass  data down
  return <View></View>;
};

export default UserTransactionsData;

const styles = StyleSheet.create({});
