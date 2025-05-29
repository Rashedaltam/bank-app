// UserProfile.tsx
import { GetProfile } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";

const UserProfileBalanceData: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: GetProfile,
  });

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
