// input for amount to be transacted
// refactured after being built cause I felt code was getting messy
import { useDepositOrWithdraw } from "@/hooks/useDepositOrWithdraw";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  transactionType: "DEPOSIT" | "WITHDRAW";
};

const TransactionAmountInput = ({ transactionType }: Props) => {
  const [amountText, setAmountText] = useState("");
  const { mutate, isPending, error } = useDepositOrWithdraw();

  //to protect against pasting invalid values into "Enter Amount Box"
  const handleSubmit = () => {
    const trimmed = amountText.trim();
    const parsedAmount = Number(trimmed);

    //for debugging text to number conversion, may be removed later
    console.log("amountText:", amountText);
    console.log("trimmed:", trimmed);
    console.log("parsedAmount:", parsedAmount);

    if (!trimmed || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert(
        "Invalid amount",
        "Please enter a valid number greater than 0."
      );
      return;
    }

    mutate({ amount: parsedAmount, value: transactionType });
  };

  return (
    <View>
      <Text style={styles.confirmationText}>
        You selected: {transactionType}
      </Text>

      <TextInput
        value={amountText}
        onChangeText={(text) => setAmountText(text.replace(/[^0-9.]/g, ""))}
        keyboardType="decimal-pad" //number-only keyboard on iOS/Android
        placeholder="Enter amount"
        inputMode="decimal" //number-only for HTML
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Processing..." : transactionType}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default TransactionAmountInput;

const styles = StyleSheet.create({
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
