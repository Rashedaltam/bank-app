import UserProfileBalanceData from "@/components/UserProfileBalanceData";
import { useDepositOrWithdraw } from "@/hooks/useDepositOrWithdraw";

import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type TransactionType = "DEPOSIT" | "WITHDRAW" | "TRANSFER";

const OwnTransactions = () => {
  // DropDownPicker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TransactionType | null>(null);
  const [items, setItems] = useState([
    { label: "Deposit", value: "DEPOSIT" },
    { label: "Withdraw", value: "WITHDRAW" },
    { label: "Transfer", value: "TRANSFER" },
  ]);

  // Amount input state
  const [amountText, setAmountText] = useState("");

  // Mutation hook for deposit or withdrawal
  const { mutate, isPending, error } = useDepositOrWithdraw();

  // Navigate if 'TRANSFER' is selected
  useEffect(() => {
    if (value === "TRANSFER") {
      router.push("/(protected)/(tabs)/Benefeciary/benefieciary");
    }
  }, [value]);

  // Handle submit button press
  const handleSubmit = () => {
    const parsedAmount = Number(amountText);
    const trimmed = amountText.trim();

    //debugging text to nubmer conversion
    console.log("amountText:", amountText);
    console.log("trimmed:", trimmed);
    console.log("parsedAmount:", parsedAmount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid number greater than 0."
      );
      return;
    }

    if (value === "DEPOSIT" || value === "WITHDRAW") {
      mutate({ amount: parsedAmount, value });
    }
  };

  return (
    <View>
      {/* Page title */}
      <Text style={styles.title}>Own Transactions</Text>

      {/* User balance display */}
      <View>
        <UserProfileBalanceData />
      </View>

      {/* Transaction form section */}
      <View style={styles.formContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select transaction type"
        />

        {/* Show input and button if DEPOSIT or WITHDRAW */}
        {value && value !== "TRANSFER" && (
          <>
            {/* Confirm selected action */}
            <Text style={styles.confirmationText}>You selected: {value}</Text>

            {/* Amount input */}
            <TextInput
              value={amountText}
              onChangeText={(text) =>
                setAmountText(text.replace(/[^0-9]/g, ""))
              }
              keyboardType="numeric"
              placeholder="Enter amount"
              style={styles.input}
            />

            {/* Submit button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isPending}
            >
              <Text style={styles.buttonText}>
                {isPending ? "Processing..." : value}
              </Text>
            </TouchableOpacity>

            {/* Show error if mutation fails */}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      </View>
    </View>
  );
};

export default OwnTransactions;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  formContainer: {
    padding: 20,
  },
  confirmationText: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
