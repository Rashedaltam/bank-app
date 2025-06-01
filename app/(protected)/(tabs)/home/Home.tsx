import { logout } from "@/api/auth";
import SearchableTransactions from "@/components/SearchableTransactions";
import UserProfileV2 from "@/components/UserProfileV2";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

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

  ////// new transfer amount handeler

  const userTransactionsHandle = () => {
    router.push("/(protected)/(tabs)/home/ownTransactions");
  };
  // ✅ Correct placement inside component
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // Handler to update date filters
  const handleDateChange = (type: "from" | "to", date: Date) => {
    if (type === "from") setFromDate(date);
    else setToDate(date);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      {/* <Text>Home</Text> */}
      {/* <UserProfile /> */}
      <UserProfileV2 />
      {/* <UserTransactionsList /> */}

      <SearchableTransactions
        fromDate={fromDate}
        toDate={toDate}
        onChangeDate={handleDateChange}
      />

      <TouchableOpacity
        onPress={userTransactionsHandle}
        style={styles.glowButton}
      >
        <Text>new</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#121212", // dark background for entire screen
  },
});
