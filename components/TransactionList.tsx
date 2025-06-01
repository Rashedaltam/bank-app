// Displays a scrollable list of formatted transaction cards

import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

type Transaction = {
  _id: string;
  amount: number;
  createdAt: string;
  type: string;
  from?: string;
  to?: string;
};

type Props = {
  transactions: Transaction[];
};

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(transaction) => transaction._id}
      renderItem={({ item: transaction }) => {
        const isDeposit = transaction.type.toLowerCase() === "deposit";
        const normalizedAmount = isDeposit
          ? Math.abs(transaction.amount)
          : -Math.abs(transaction.amount);

        const formattedAmount = `${
          normalizedAmount >= 0 ? "+" : "-"
        } ${Math.abs(normalizedAmount).toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`;

        const displayDate = transaction.createdAt
          ? new Date(transaction.createdAt).toDateString()
          : null;

        return (
          <View style={styles.item}>
            {/* Left side: type and date */}
            <View>
              <Text style={styles.type}>
                {transaction.type.charAt(0).toUpperCase() +
                  transaction.type.slice(1)}
              </Text>
              {displayDate && <Text style={styles.date}>{displayDate}</Text>}
            </View>

            {/* Right side: amount */}
            <Text
              style={[
                styles.amount,
                normalizedAmount >= 0 ? styles.positive : styles.negative,
              ]}
            >
              {formattedAmount} KWD
            </Text>
          </View>
        );
      }}
    />
  );
};

// Styles for transaction card
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    marginBottom: 19,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 80,
    marginHorizontal: 20,
  },
  type: { color: "#fff", fontSize: 16, fontWeight: "500" },
  date: { color: "#999", fontSize: 12, marginTop: 4 },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    fontFamily: Platform.select({
      ios: "SF Pro",
      android: "Roboto Mono",
      default: "Roboto Mono",
    }),
  },
  positive: { color: "#4caf50" },
  negative: { color: "#f44336" },
});

export default TransactionList;
