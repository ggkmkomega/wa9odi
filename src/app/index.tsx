import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { UseAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { loading, session, profile } = UseAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (profile?.groupe === "ADMIN") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
        <Button
          text="Sign Out"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
      </View>
    );
  }

  return <Redirect href="/(user)" />;
};

export default index;
