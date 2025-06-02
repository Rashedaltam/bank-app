import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const TransactionsSearchBar: React.FC<Props> = ({ value, onChange }) => (
  <View style={styles.wrapper}>
    <TextInput
      placeholder="Search by type or amount"
      placeholderTextColor="#aaa"
      style={styles.input}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1.3,
    borderColor: "#3a86ff",
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default TransactionsSearchBar;
