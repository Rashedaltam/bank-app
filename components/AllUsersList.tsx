import { useAllUsersData } from "@/hooks/useAllUsersData";
import { UserProfileDataType } from "@/types/UserProfileDataType";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AllUsersList = () => {
  //scroll to top
  const flatListRef = useRef<FlatList>(null);

  const { data, isLoading, error } = useAllUsersData();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;
  if (error)
    return (
      <Text style={styles.error}>Failed to load users: {error.message}</Text>
    );
  if (!data || data.length === 0)
    return <Text style={styles.message}>No users found.</Text>;

  const renderItem = ({ item }: { item: UserProfileDataType }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
    </View>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

export default AllUsersList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0d0d0d", // dark background
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a", // dark card background
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2c2c2c", // subtle border
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff", // white text
  },
  error: {
    color: "red",
    padding: 20,
    backgroundColor: "#0d0d0d",
    textAlign: "center",
  },
  message: {
    padding: 20,
    color: "#aaa", // light text
    textAlign: "center",
    backgroundColor: "#0d0d0d",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
});
