// UserProfile.tsx

import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BalanceCardProps = {
  amount: number;
  currency?: string;
};

const UserProfileBalanceData: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchUserProfileData();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error?.message}</Text>;
  if (!data) return <Text>No data found</Text>;

  // pass profile data down
  return (
    <View>
      <Text style={styles.BalanceFont}>
        {data.balance.toLocaleString()} KWD
      </Text>
    </View>
  );
};

export default UserProfileBalanceData;

const styles = StyleSheet.create({
  BalanceFont: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1.2,
  },
});
