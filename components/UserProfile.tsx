import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserProfile: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchUserProfileData();

  // for debugging and identifying data interface
  useEffect(() => {
    if (data) {
      console.log("User Profile:", data);
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.error("Error fetching profile:", error?.message);
    return <Text>Error loading profile.</Text>; // <-- valid ReactNode
  }

  if (!data) {
    return <Text>No data found</Text>;
  }

  return (
    <View>
      <Text>{data.username}</Text>
      {/* also fix your typo: iamge → image */}
      <Image source={{ uri: data.image }} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
