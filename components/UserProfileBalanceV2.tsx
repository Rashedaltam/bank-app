import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  balance: number;
};

const UserProfileBalanceV2: React.FC<Props> = ({ balance }) => {
  const formattedBalance = `${balance.toLocaleString("en-KW", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })} KWD`;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your Balance</Text>
      <Text style={styles.amount}>{formattedBalance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1,
    fontWeight: "light",
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "light",
    letterSpacing: 2,
    fontFamily: Platform.select({
      ios: "SF Pro",
      android: "Roboto Mono",
      default: "Roboto Mono",
    }),
  },
});

export default UserProfileBalanceV2;
