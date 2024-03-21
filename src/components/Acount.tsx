import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import { Redirect, useRouter } from "expo-router";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setfirstName(data.first_name);
        setlastName(data.last_name);
        setphone(data.phone);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    firstName,
    lastName,
    phone,
  }: {
    firstName: string;
    lastName: string;
    phone: number;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="firstName"
          value={firstName || ""}
          onChangeText={(text) => setfirstName(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="last Name"
          value={lastName || ""}
          onChangeText={(text) => setlastName(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="phone number"
          value={"0" + phone?.toString()}
          onChangeText={(text) => {
            if (!Number.isNaN(parseInt(text))) {
              setphone(parseInt(text));
            }
          }}
          keyboardType="phone-pad"
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => {
            if (!phone) return;
            updateProfile({ firstName, lastName, phone });
            router.replace("/");
          }}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={async () => await supabase.auth.signOut()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
