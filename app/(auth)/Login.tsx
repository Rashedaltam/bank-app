import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      router.replace("/(protected)/(tabs)/Home");
      console.log(`Logged in successfully as: ${username}`);
    },
    onError: (error) => {
      alert(`${error.message} \n\nCould be invalid username or password`);
      console.log(`Login failed: ${error.message}`);
    },
  });

  const handleLogin = async () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.register}>
        Don't have an account?{" "}
        <Link style={styles.link} href="/(auth)/Register">
          Register
        </Link>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#d1d1d1",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  register: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
