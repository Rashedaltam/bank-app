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
    flex: 1,
    backgroundColor: "#0d0d0d", // Match base theme
    paddingHorizontal: 24,
    paddingTop: 60,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 35,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    borderColor: "#333",
    borderWidth: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: "100%",
    marginVertical: 50,
  },
  button: {
    backgroundColor: "#3a86ff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
