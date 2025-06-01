import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type TransactionType = "deposit" | "withdraw";

type TransactionsTypeFilterProps = {
  type: TransactionType[];
  selectedType: TransactionType;
  onSelectType: (type: TransactionType) => void;
};

const TransactionsTypeFilter: React.FC<TransactionsTypeFilterProps> = ({
  type,
  selectedType,
  onSelectType,
}) => (
  <View style={styles.container}>
    {type.map((type) => {
      const isSelected = selectedType === type;

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [
          {
            scale: withTiming(isSelected ? 1.3 : 1, {
              duration: 150,
            }),
          },
        ],
      }));

      return (
        <Animated.View key={type} style={[animatedStyle]}>
          <TouchableOpacity
            style={[styles.button, isSelected && styles.buttonSelected]}
            onPress={() => onSelectType(type)}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {type}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 28,
    padding: 16,
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonSelected: {
    backgroundColor: "#3a86ff",
  },
  text: {
    color: "#ccc",
    fontSize: 14,
  },
  textSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TransactionsTypeFilter;
