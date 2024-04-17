import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Image } from "react-native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={require("../../../assets/images/logo.png")}
        />
        <View>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Wakoudi</Text>
          <Text style={{ color: Colors.light.grey, fontWeight: "400" }}>
            The First Fuel delivery App in Algeria
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="jon@gmail.com"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <Button
          onPress={signUpWithEmail}
          disabled={loading}
          text={loading ? "Creating account..." : "Create account"}
        />
        <Link href="/sign-in" style={styles.textButton}>
          Sign in
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    gap: 40,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  logoContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SignUpScreen;
