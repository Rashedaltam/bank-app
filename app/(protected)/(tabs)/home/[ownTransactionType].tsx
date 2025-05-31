import TransactionAmountInput from "@/components/TransactionAmountInput";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ownTransactionType = () => {
  const { ownTransactionType } = useLocalSearchParams();
  //type gaurd
  if (ownTransactionType === "DEPOSIT" || ownTransactionType === "WITHDRAW") {
    const safeTransactionType: "DEPOSIT" | "WITHDRAW" = ownTransactionType;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{ownTransactionType} Amount</Text>

        {/* Enter Amount*/}
        {ownTransactionType && (
          <TransactionAmountInput transactionType={safeTransactionType} />
        )}
      </View>
    );
  }
  //fallback in case ownTransactionType is null or invalid
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invalid Transaction Type</Text>
    </View>
  );
};

export default ownTransactionType;

const styles = StyleSheet.create({
  // container: {
  //   padding: 20,
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textTransform: "capitalize", //spent one hour dealing with type mismatch and trying to capitalize until i found out about this prop
  // },
  // errorText: {
  //   fontSize: 16,
  //   color: "red",
  // },
  container: {
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: "center",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textTransform: "capitalize",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
