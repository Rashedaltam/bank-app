import React from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <TextInput
    placeholder="Search by transaction type or amount"
    placeholderTextColor="#888"
    style={styles.input}
    value={value}
    onChangeText={onChange}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#3a86ff",
    marginTop: 15,
    flexGrow: 1,
  },
});

export default SearchBar;
