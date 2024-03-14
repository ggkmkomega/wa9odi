import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { Redirect } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const profileScreen = () => {
  const [loading, setLoading] = useState(false);
  const handleSignOut = () => {
    setLoading(true);
    supabase.auth.signOut();
    return <Redirect href={"/"} />;
  };
  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <Button
        text={loading ? "Logging off " : "Sign Out"}
        onPress={() => {
          handleSignOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default profileScreen;
