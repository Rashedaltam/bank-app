import { logout } from "@/api/auth";
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>Home</Text>
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
    marginTop: 10,
  },
});
