import { useAllUsersData } from "@/hooks/useAllUsersData";
import { UserProfileDataType } from "@/types/UserProfileDataType";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AllUsersList = () => {
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
      <Image source={{ uri: item.image }} style={styles.image} />
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
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    padding: 20,
  },
  message: {
    padding: 20,
    textAlign: "center",
  },
});
