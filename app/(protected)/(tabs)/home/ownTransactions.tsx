import TransactionAmountInput from "@/components/TransactionAmountInput";
import TransactionTypePicker from "@/components/TransactionTypePicker";
import UserProfileBalanceData from "@/components/UserProfileBalanceData";
import { TransactionType } from "@/types/TransactionType";

import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

  return (
    <View>
      <Text style={styles.title}>New Transactions</Text>

      <UserProfileBalanceData />

      <TransactionTypePicker
        value={value}
        setValue={setValue}
        setOpen={setOpen}
        open={open}
        items={items}
        setItems={setItems}
      />

      {value && value !== "TRANSFER" && (
        <TransactionAmountInput transactionType={value} />
      )}
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
});
