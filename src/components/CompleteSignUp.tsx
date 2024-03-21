import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SignUpBanner = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Please complete your sign-up to start using the app!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.replace("/profile");
        }}
      >
        <Text style={styles.buttonText}>Complete Sign-Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffb6c1",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SignUpBanner;
