import { DepositToAccount, GetProfile, GetTransactions, WithdrawFromoAccount } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const xyz: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: GetProfile,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.error("Error fetching profile:", error?.message);
    return <Text>Error loading profile.</Text>;  // <-- valid ReactNode
  }

  if (!data) {
    return <Text>No data found</Text>;
  }

  return (
    <View>
      <Text>hellooooo</Text>
    </View>
  );

//  const UserProfileData: React.FC = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["userProfile"],
//     queryFn: GetProfile,
//   });

//   if (isLoading) {
//     return "Loading..."
//   }

//   if (isError) {
//     console.error("Error fetching profile:", error?.message);
//     return 
//   }

//   if (!data) {
//     return ""
//   }

};

export default xyz;


const styles = StyleSheet.create({});

