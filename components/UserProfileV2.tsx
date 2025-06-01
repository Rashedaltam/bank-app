import { logout } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserProfileV2: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchUserProfileData();

  useEffect(() => {
    if (data) {
      console.log("User Profile:", data);
    }
  }, [data]);

  // TO HANDLE LOGOUT
  const { setIsAuthenticated } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setIsAuthenticated(false);
      router.replace("/(auth)/Login");
    },
    onError: (error) => {
      console.log("Logout failed:", error.message);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  //handle default avatar if image doesn't exist
  let imageUri: string;

  if (data?.image && data.image.length > 0) {
    imageUri = data.image;
  } else {
    imageUri =
      "https://cdn.vectorstock.com/i/1000v/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg";
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.avatar} />
      <Text style={styles.username}>{data?.username}</Text>
      <TouchableOpacity style={styles.exitButton} onPress={handleLogout}>
        <Text style={styles.exitText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 0,
    width: "100%",
    justifyContent: "space-between",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  username: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 16,
  },
  exitButton: {
    backgroundColor: "#2a2a2a",
    width: 90,
    height: 40,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  exitText: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 15,
    textAlignVertical: "center",
    letterSpacing: 0.5,
  },
});

export default UserProfileV2;
