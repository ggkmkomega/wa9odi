import { View } from "react-native";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { UseAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { ActivityIndicator } from "react-native";

const index = () => {
  const { session, loading, isAdmin } = UseAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;
