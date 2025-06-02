import React from "react";
import { StyleSheet, View } from "react-native";
import TransactionTypeFilterButton from "./TransactionTypeFilterButton";

type Props = {
  types: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
};

const TransactionsTypeFilter: React.FC<Props> = ({
  types,
  selectedType,
  onSelectType,
}) => (
  <View style={styles.container}>
    {types.map((type) => (
      <TransactionTypeFilterButton
        key={type}
        type={type}
        isSelected={selectedType === type}
        onPress={() => onSelectType(type)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 2,
    padding: 16,
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
});

export default TransactionsTypeFilter;
