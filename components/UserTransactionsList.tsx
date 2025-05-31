import { useFetchUserTransactionData } from "@/hooks/useFetchUserTransactionData";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const UserTransactionsList = () => {
  const { data, isLoading, error } = useFetchUserTransactionData();

  // for debugging and identifying data interface
  useEffect(() => {
    if (data) {
      console.log("Transactions:", data);
    }
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.amount}>${item.amount}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

export default UserTransactionsList;

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  type: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "green",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  error: {
    color: "red",
    padding: 16,
    textAlign: "center",
  },
});
