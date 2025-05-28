import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    image: "",
  });

  const { mutate } = useMutation({
    mutationFn: () => register(formData),
    onSuccess: () => {
      router.replace("/(protected)/(tabs)/Home");
    },
  });

  const handleRegister = async () => {
    mutate();
  };

  const pickImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            formData.image
              ? { uri: formData.image }
              : require("@/assets/images/noAvatar.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.login}>
        Already have an account?{" "}
        <Link style={styles.link} href="/(auth)/Login">
          Login
        </Link>
      </Text>
    </View>
  );
};

export default Register;

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
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "gray",
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
  login: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
