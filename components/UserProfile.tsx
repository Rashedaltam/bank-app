import { GetProfile } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserProfile = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: GetProfile,
  });

  if (isLoading) return <Text>loading...</Text>;
  if (isError) return console.log("Error", error?.message);

  console.log("Fetching data: ", data);

  return (
    <View>
      <Text>{data.username}</Text>
      {data ? (
        data?.image ? (
          <Image source={{ uri: data?.iamge }} />
        ) : (
          <Text>No image exist.</Text>
        )
      ) : (
        <Text>NO DATA</Text>
      )}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
