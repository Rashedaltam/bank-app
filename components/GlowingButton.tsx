import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";

const GlowingButton = ({ onPress }: { onPress: () => void }) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.9],
  });

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 14],
  });

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          shadowOpacity,
          shadowRadius,
        },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GlowingButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    shadowColor: "#3a86ff",
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  button: {
    backgroundColor: "#3a86ff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
