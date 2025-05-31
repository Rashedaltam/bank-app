import { logout } from "@/api/auth";
import UserProfile from "@/components/UserProfile";
import UserTransactionsList from "@/components/UserTransactionsList";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const router = useRouter();

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

  ////// new user transactions handeler

  const userTransactionsHandle = () => {
    router.push("/(protected)/(tabs)/home/ownTransactions");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>Home</Text>
      <UserProfile />
      <UserTransactionsList />
      <TouchableOpacity
        onPress={userTransactionsHandle}
        style={styles.glowButton}
      >
        <Text>new</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#d1d1d1",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 5,
  },
  glowButton: {
    marginTop: 5,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#3a86ff",
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    alignItems: "center",
  },
});
