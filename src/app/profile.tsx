import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { View, Text, StyleSheet } from "react-native";

const profileScreen = () => {
  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <Button
        text="Sign Out"
        onPress={() => {
          supabase.auth.signOut();
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
