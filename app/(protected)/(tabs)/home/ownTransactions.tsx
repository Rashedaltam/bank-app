import TransactionTypePicker from "@/components/TransactionTypePicker";
import UserProfileBalanceData from "@/components/UserProfileBalanceData";
import { TransactionType } from "@/types/TransactionType";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>New Transactions</Text>
      </View>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Your Balance</Text>
        <View style={styles.balanceCard}>
          <View style={styles.contentWrapper}>
            <UserProfileBalanceData />
          </View>
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.contentWrapper}>
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
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center", // ✅ Center everything horizontally
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 500, // ✅ Limits horizontal stretch on tablets or web
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 16,
    letterSpacing: 1,
  },
  pickerContainer: {
    width: screenWidth * 0.9,
    alignSelf: "center",
    marginVertical: 24,
  },
  button: {
    backgroundColor: "#3a86ff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 12,
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  balanceSection: {
    width: "100%",
    marginTop: 12,
  },

  balanceTitle: {
    color: "#bbbbbb",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingLeft: 4,
  },

  balanceCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#2c2c2c",
  },
});
