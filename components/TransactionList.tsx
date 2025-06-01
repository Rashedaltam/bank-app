import { TransactionDataType } from "@/types/TransactionDataType";
import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  transactions: TransactionDataType[];
};

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        const isPositive = item.type === "deposit";
        const label = isPositive ? `From: ${item.from}` : `To: ${item.to}`;
        const formattedDate = new Date(item.createdAt).toLocaleDateString();

        return (
          <View style={styles.item}>
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <Text
              style={[
                styles.amount,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {isPositive ? "+" : "-"} {Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        );
      }}
    />
  );
};

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
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "Courier",
    }),
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});

export default TransactionList;
