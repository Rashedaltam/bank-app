// UserProfile.tsx

import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import React from "react";
import { Text, View } from "react-native";

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
      <Text>Balance: {data.balance}</Text>
    </View>
  );
};

export default UserProfileBalanceData;
