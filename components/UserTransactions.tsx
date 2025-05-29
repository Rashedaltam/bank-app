import { GetProfile, GetTransactions } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const UserTransactions : React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: GetTransactions,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.error("Error fetching profile:", error?.message);
    return <Text>Error loading Transactions.</Text>;  // <-- valid ReactNode
  }

  if (!data) {
    return <Text>No data found</Text>;
  }
 console.log("transactions", data)
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

export default UserTransactions;


const styles = StyleSheet.create({});

