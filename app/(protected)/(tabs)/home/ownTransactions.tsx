import TransactionTypePicker from "@/components/TransactionTypePicker";
import UserProfileBalanceV2 from "@/components/UserProfileBalanceV2";
import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import { TransactionType } from "@/types/TransactionType";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const OwnTransactions = () => {
  // DropDownPicker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TransactionType | null>(null);
  //originally didn't need a promise but after refacturing
  // explicit promise had to be provided to avoid type mismatch
  const [items, setItems] = useState<
    { label: string; value: TransactionType }[]
  >([
    { label: "Deposit", value: "DEPOSIT" },
    { label: "Withdraw", value: "WITHDRAW" },
    { label: "Transfer", value: "TRANSFER" },
  ]);

  // // Navigate if 'TRANSFER' is selected
  useEffect(() => {
    if (value === "TRANSFER") {
      router.push("/(protected)/(tabs)/Benefeciary/benefieciary");
    }
  }, [value]);

  const handleContinue = () => {
    if (!value) {
      Alert.alert("Please select a transaction type");
      return;
    }
    router.push(`/(protected)/(tabs)/home/${value}`);
  };

  //get user balance
  const { data, isLoading, isError, error, refetch } =
    useFetchUserProfileData();

  //refetch upon screen focus
  useFocusEffect(
    useCallback(() => {
      refetch(); // ensures fresh data on screen focus
    }, [])
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error?.message}</Text>;
  if (!data) return <Text>No data found</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>New Transactions</Text>
      </View>

      <View style={styles.BalanceContainer}>
        <UserProfileBalanceV2 balance={data.balance} />
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.dropdownContainer}>
          <TransactionTypePicker
            value={value}
            setValue={setValue}
            setOpen={setOpen}
            open={open}
            items={items}
            setItems={setItems}
          />
        </View>
      </View>
      <View style={styles.contentWrapper}>
        {value && (
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>
              Continue to {value.toLowerCase()}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OwnTransactions;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "#121212",
  //   flex: 1,
  //   padding: 24,
  //   borderRadius: 16,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // title: {
  //   fontSize: 26,
  //   fontWeight: "700",
  //   color: "#ffffff",
  //   marginBottom: 20,
  //   textAlign: "center",
  // },
  // button: {
  //   backgroundColor: "#3a86ff",
  //   borderRadius: 8,
  //   paddingVertical: 14,
  //   paddingHorizontal: 24,
  //   marginTop: 20,
  //   shadowColor: "#3a86ff",
  //   shadowOffset: { width: 0, height: 0 },
  //   shadowOpacity: 0.9,
  //   shadowRadius: 10,
  //   alignItems: "center",
  // },
  // buttonText: {
  //   color: "#ffffff",
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  balanceSection: {
    marginBottom: 24,
  },
  balanceTitle: {
    color: "#888888",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingLeft: 4,
  },
  balanceCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#2c2c2c",
  },
  pickerContainer: {
    marginBottom: 32,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "#3a86ff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 10,
    marginHorizontal: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  BalanceContainer: {
    marginBottom: 24,
  },
  dropdownContainer: {
    marginHorizontal: 30,
  },
});
