import { DepositToAccount, GetProfile, GetTransactions, WithdrawFromoAccount } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const UserDeposits: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: DepositToAccount 
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.error("Error in Deposits:", error?.message);
    return <Text>Error depositing</Text>;  // <-- valid ReactNode
  }

  if (!data) {
    return <Text>No data found</Text>;
  }
 console.log("Deposits", data)
  return (
    <View>
      <Text>hellooooo</Text>
    </View>
  );
};

export default UserDeposits;


const styles = StyleSheet.create({});

