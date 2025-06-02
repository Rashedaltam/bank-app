import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TransactionTypeFilterButton = ({
  type,
  isSelected,
  onPress,
}: {
  type: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
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
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.button, isSelected && styles.buttonSelected]}
        onPress={onPress}
      >
        <Text style={[styles.text, isSelected && styles.textSelected]}>
          {type}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionTypeFilterButton;

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
    backgroundColor: "#2a2a2a", // dark gray background
    paddingVertical: 10, // vertical padding
    paddingHorizontal: 14, // horizontal padding
    borderRadius: 8, // rounded corners
    marginRight: 10, // spacing between buttons
  },
  buttonSelected: {
    backgroundColor: "#3a86ff", // blue background when selected
  },
  text: {
    color: "#ccc", // light gray text
    fontSize: 14,
  },
  textSelected: {
    color: "#fff", // white text when selected
    fontWeight: "bold",
  },
});
