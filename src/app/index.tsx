import { View, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";

import { supabase } from "@/lib/supabase";
import { UseAuth } from "@/providers/AuthProvider";

const index = () => {
  const { loading, session, isAdmin, error } = UseAuth();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <text>{JSON.stringify(error)}</text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (isAdmin) {
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
